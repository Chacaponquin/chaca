import {
  ChacaError,
  CyclicAccessDataError,
  WrongArrayDefinitionError,
} from "../../errors";
import { ChacaUtils } from "../utils";
import { SchemaToResolve } from "../schema/interfaces/schema";
import { ChacaInputTree } from "../input-tree";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  MixedValueNode,
  RefValueNode,
  KeyValueNode,
  SequentialValueNode,
  SequenceValueNode,
  ProbabilityValueNode,
  PickValueNode,
} from "../input-tree/core";
import { ChacaResultTree } from "../result-tree";
import {
  DocumentTree,
  FieldNode,
  ArrayResultNode,
  MixedFieldNode,
  SingleResultNode,
} from "../result-tree/classes";
import { SchemaStore } from "../schema-store/store";
import { GetStoreValueConfig } from "../schema-store/interfaces/store";
import { DatasetStore } from "../dataset-store";
import { SearchedRefValue } from "../input-tree/core/ref/interfaces/ref";
import { CountDoc, SchemaName } from "./value-object";
import { ArrayCretor, Limit } from "./core/array-creator";
import { DatatypeModule } from "../../modules/datatype";

interface SchemaResolverProps {
  name: string;
  schemaObject: SchemaToResolve;
  countDoc: number;
  schemaIndex: number;
  consoleVerbose: boolean;
}

export class SchemaResolver<K = any> {
  private utils = new ChacaUtils();
  private readonly datatypeModule = new DatatypeModule();

  private inputTree: ChacaInputTree | null = null;
  private resultTree: ChacaResultTree<K>;
  private name: string;
  private countDoc: number;
  private schemaObject: SchemaToResolve;
  private schemaIndex: number;

  private isBuilding = false;
  private finishBuilding = false;

  private schemasStore = new SchemaStore([]);
  private readonly arrayCreator = new ArrayCretor(this.datatypeModule);

  private consoleVerbose = false;

  constructor({
    consoleVerbose,
    countDoc,
    schemaIndex,
    name,
    schemaObject,
  }: SchemaResolverProps) {
    this.name = new SchemaName(name).value();
    this.schemaObject = schemaObject;
    this.resultTree = new ChacaResultTree<K>(this.name);
    this.countDoc = new CountDoc(countDoc).value();
    this.schemaIndex = schemaIndex;
    this.consoleVerbose = consoleVerbose;
  }

  resolve(): K[] {
    this.buildInputTree();
    this.buildTrees();
    return this.getDocumentsArray();
  }

  getKeyNodes(): KeyValueNode[] {
    let keys = [] as KeyValueNode[];

    if (this.inputTree) {
      keys = this.inputTree.getKeyFields();
    }

    return keys;
  }

  getPossibleNullNodes(): ChacaTreeNode[] {
    let nodes = [] as ChacaTreeNode[];

    if (this.inputTree) {
      nodes = this.inputTree.getPossibleNullNodes();
    }

    return nodes;
  }

  getRefNodes(): RefValueNode[] {
    if (this.inputTree) {
      return this.inputTree.getRefNodes();
    } else {
      return [];
    }
  }

  getSchemaToResolve() {
    return this.schemaObject;
  }

  buildInputTree(): void {
    if (this.inputTree === null) {
      this.inputTree = new ChacaInputTree({
        schemaName: this.name,
        schemaToResolve: this.schemaObject,
        schemasStore: this.schemasStore,
      });
    }
  }

  getSchemaName(): string {
    return this.name;
  }

  isFinishBuilding() {
    return this.finishBuilding;
  }

  isBuildingTrees(): boolean {
    return this.isBuilding;
  }

  setInjectedSchemas(array: SchemaResolver[]): void {
    this.schemasStore.setInjectedSchemas(array);
  }

  getInputTree() {
    return this.inputTree;
  }

  getResultTree() {
    return this.resultTree;
  }

  getAllValuesByRoute(
    fieldToGet: string[],
    config: GetStoreValueConfig,
  ): Array<DocumentTree<K> | FieldNode> {
    if (fieldToGet.length === 0) {
      const whereFunction = config.where;

      if (whereFunction) {
        const filterDocuments = this.resultTree.getDocuments().filter((d) => {
          return (
            d !== config.omitDocument && whereFunction(d.getDocumentObject())
          );
        });

        return filterDocuments;
      } else {
        const filterDocuments = this.resultTree.getDocuments();
        return filterDocuments;
      }
    } else {
      const allNodes = this.resultTree.getAllValuesByNodeRoute(
        fieldToGet,
        config,
      );

      return allNodes;
    }
  }

  getAllRefValuesByNodeRoute(fieldTreeRoute: string[]): SearchedRefValue[] {
    return this.resultTree.getAllRefValuesByNodeRoute(fieldTreeRoute);
  }

  searchRefNodes() {
    if (this.inputTree) {
      this.inputTree.searchRefNodes();
    }
  }

  dangerCyclic(): boolean {
    if (!this.finishBuilding && this.isBuilding) {
      return true;
    } else {
      return false;
    }
  }

  buildTrees(): void {
    if (!this.finishBuilding) {
      if (!this.isBuilding) {
        if (this.inputTree) {
          if (this.consoleVerbose) {
            // eslint-disable-next-line no-console
            console.log(`Creating ${this.name} data...`);
          }

          // indicar que se está construyendo los datos
          this.isBuilding = true;

          for (let indexDoc = 0; indexDoc < this.countDoc; indexDoc++) {
            const newDoc = new DocumentTree<K>();

            // insertar el nuevo documento
            this.resultTree.insertDocument(newDoc);

            // recorrer los fields del dataset actual para crear cada uno en el documento que le pertenece
            for (const datField of this.inputTree.getFields()) {
              const fieldSolutionNode = this.createSolutionNodeByType(
                datField,
                indexDoc,
              );

              if (datField instanceof KeyValueNode) {
                newDoc.insertKeyField(fieldSolutionNode);
              } else {
                // insertar la solucion del field en el documento
                newDoc.insertField(fieldSolutionNode);
              }

              // resolver el field actual en caso de ser un array o un mixed
              this.resolveArrayAndMixedFields(
                datField,
                fieldSolutionNode,
                indexDoc,
              );
            }
          }

          // indicar que se acabo de construir
          this.isBuilding = false;

          // indicar que ha acabado de crear los result trees
          this.finishBuilding = true;
        } else {
          throw new ChacaError(
            `It's imposible create the result trees for the schema ${this.name}, because the input tree was not created yet.`,
          );
        }
      } else {
        throw new CyclicAccessDataError(
          `You are trying to access ${this.name} when this one is being created`,
        );
      }
    }
  }

  getDocumentsArray(omitDocument?: DocumentTree<K>): K[] {
    const result: K[] = [];

    for (const d of this.getResultTree().getDocuments()) {
      if (d !== omitDocument) {
        result.push(d.getDocumentObject());
      }
    }

    return result;
  }

  private resolveArrayAndMixedFields(
    field: ChacaTreeNode,
    fieldSolution: FieldNode,
    indexDoc: number,
  ) {
    // en caso de que sea un mixed field
    if (
      field instanceof MixedValueNode &&
      fieldSolution instanceof MixedFieldNode
    ) {
      this.createMixedSubFields(fieldSolution, field, indexDoc);
    }

    // en caso de que sea un array field
    else if (fieldSolution instanceof ArrayResultNode) {
      this.createArrayFieldSolution(fieldSolution, field, indexDoc);
    }
  }

  private createArrayFieldSolution(
    solutionArrayNode: ArrayResultNode,
    field: ChacaTreeNode,
    indexDoc: number,
  ) {
    if (field.getIsArray().isValid()) {
      const value = field.getIsArray().value();

      if (value !== null) {
        const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);

        const store = new DatasetStore({
          schemasStore: this.schemasStore,
          omitCurrentDocument: currentDocument,
          omitResolver: this,
        });

        let limit: Limit;
        if (typeof value === "number") {
          limit = value;
        } else if (typeof value === "function") {
          const result = value({
            store: store,
            currentFields: currentDocument.getDocumentObject(),
          });

          limit = result;
        } else {
          limit = value;
        }

        this.arrayCreator.execute({
          value: limit,
          route: field.getRouteString(),
          func: () => {
            // resolver el field y guardarlo en un nodo
            const fieldSolutionNode = this.createSolutionNodeByType(
              field.getNoArrayNode(),
              indexDoc,
            );

            // insertar el field en el array de soluciones
            solutionArrayNode.insertNode(fieldSolutionNode);

            // resolver el field en caso de ser un mixed field
            this.resolveArrayAndMixedFields(field, fieldSolutionNode, indexDoc);
          },
        });
      }
    } else {
      throw new WrongArrayDefinitionError(
        `In field '${field.getRouteString()}'. The parameter isArray must be an integer, a function or an object with the limits { min, max }`,
      );
    }
  }

  private createMixedSubFields(
    solutionMixedNode: MixedFieldNode,
    mixedField: MixedValueNode,
    indexDoc: number,
  ): void {
    const subFields = mixedField.getFields();

    for (const field of subFields) {
      // filtrar el subField segun su tipo
      const subFieldSolutionNode = this.createSolutionNodeByType(
        field,
        indexDoc,
      );

      // insertar la solucion del field en la solucion del mixed field pasado por parametro
      solutionMixedNode.insertNode(subFieldSolutionNode);

      // resolver el subField en caso de ser un array o un mixed field
      this.resolveArrayAndMixedFields(field, subFieldSolutionNode, indexDoc);
    }
  }

  private createSolutionNodeByType(
    field: ChacaTreeNode,
    indexDoc: number,
  ): FieldNode {
    const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);

    const store = new DatasetStore({
      schemasStore: this.schemasStore,
      omitCurrentDocument: currentDocument,
      omitResolver: this,
    });

    const isNull = field.isNull({
      store: store,
      currentDocument: currentDocument,
    });

    if (!isNull) {
      // en caso de ser un array
      if (field.getIsArray()) {
        return new ArrayResultNode({
          name: field.getNodeName(),
          fieldNode: field,
        });
      }

      // en caso de no ser un array
      else {
        // en caso de ser un probability field
        if (field instanceof ProbabilityValueNode) {
          const value = field.value({
            store: store,
            currentDocument: currentDocument,
          });

          return new SingleResultNode({
            name: field.getNodeName(),
            value: value,
          });
        }

        // en caso de ser un pick field
        else if (field instanceof PickValueNode) {
          const value = field.getValues();
          return new SingleResultNode({
            name: field.getNodeName(),
            value: value,
          });
        }

        // en caso de ser un field sequential
        else if (field instanceof SequentialValueNode) {
          const value = field.value();
          return new SingleResultNode({
            name: field.getNodeName(),
            value: value,
          });
        }

        // en caso de ser un custom field
        else if (field instanceof CustomValueNode) {
          // obtener el valor de la funcion pasando como parametro el documento actual del ciclo
          const value = field.value({
            fields: currentDocument.getDocumentObject(),
            datasetStore: store,
          });

          return new SingleResultNode({
            name: field.getNodeName(),
            value: value,
          });
        }

        // en caso de ser un ref field
        else if (field instanceof RefValueNode) {
          const refValue = field.value(indexDoc, this.schemaIndex);
          return new SingleResultNode({
            name: field.getNodeName(),
            value: refValue,
          });
        }

        // en caso de ser un key field
        else if (field instanceof KeyValueNode) {
          const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);
          const keyValue = field.value({
            currentDocument: indexDoc,
            store: new DatasetStore({
              schemasStore: this.schemasStore,
              omitCurrentDocument: currentDocument,
              omitResolver: this,
            }),
            currentSchemaResolver: this.schemaIndex,
          });

          return new SingleResultNode({
            name: field.getNodeName(),
            value: keyValue,
          });
        }

        // en caso de ser un sequence
        else if (field instanceof SequenceValueNode) {
          return new SingleResultNode({
            name: field.getNodeName(),
            value: field.value(),
          });
        }

        // en caso de ser un mixed field
        else if (field instanceof MixedValueNode) {
          return new MixedFieldNode(field.getNodeName());
        }

        // en caso de ser un enum field
        else if (field instanceof EnumValueNode) {
          return new SingleResultNode({
            name: field.getNodeName(),
            value: this.utils.oneOfArray(field.options),
          });
        }

        // en caso de no ser ninguno de los anteriores
        else {
          throw new ChacaError(
            `'${field.getNodeName()}' has an invalid method of solution`,
          );
        }
      }
    } else {
      return new SingleResultNode({
        value: null,
        name: field.getNodeName(),
      });
    }
  }
}
