import { ChacaError, CyclicAccessDataError } from "../../errors";
import { ChacaUtils } from "../utils";
import { SchemaToResolve } from "../schema/interfaces/schema";
import { ChacaInputTree } from "../input-tree";
import {
  InputTreeNode,
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
import { DatatypeModule } from "../../modules/datatype";

interface SchemaResolverProps {
  name: string;
  schemaObject: SchemaToResolve;
  countDoc: number;
  schemaIndex: number;
  consoleVerbose: boolean;
}

interface CreateSolutionNodeProps {
  field: InputTreeNode;
  indexDoc: number;
}

export class SchemaResolver<K = any> {
  private readonly utils = new ChacaUtils();
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

  getPossibleNullNodes(): InputTreeNode[] {
    let nodes = [] as InputTreeNode[];

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
      this.inputTree = new ChacaInputTree(this.utils, this.datatypeModule, {
        schemaName: this.name,
        schemaToResolve: this.schemaObject,
        schemasStore: this.schemasStore,
        count: this.countDoc,
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
              const solution = this.createSolutionNode({
                field: datField,
                indexDoc: indexDoc,
              });

              if (datField instanceof KeyValueNode) {
                newDoc.insertKeyField(solution);
              } else {
                // insertar la solucion del field en el documento
                newDoc.insertField(solution);
              }
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

  private createSolutionNode({
    field,
    indexDoc,
  }: CreateSolutionNodeProps): FieldNode {
    const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);
    const store = new DatasetStore({
      schemasStore: this.schemasStore,
      omitCurrentDocument: currentDocument,
      omitResolver: this,
      caller: field.getRouteString(),
    });

    const isNull = field.isNull({
      store: store,
      currentDocument: currentDocument,
      index: indexDoc,
    });

    if (!isNull) {
      const limit = field.getIsArray().execute({
        currentDocument: currentDocument,
        store: store,
      });

      // en caso de ser un array
      if (limit !== undefined) {
        const arrayNode = new ArrayResultNode({
          name: field.getNodeName(),
          fieldNode: field,
        });

        for (let i = 0; i < limit; i++) {
          // resolver el field y guardarlo en un nodo
          const solution = this.createSolutionNode({
            field: field.getNoArrayNode(),
            indexDoc: indexDoc,
          });

          // insertar el field en el array de soluciones
          arrayNode.insertNode(solution);
        }

        return arrayNode;
      }

      // no es un array
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
          const value = field.getValues({
            currentDocument: currentDocument,
            store: store,
          });

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
          const keyValue = field.value({
            currentDocument: indexDoc,
            store: store,
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
          const mixedNode = new MixedFieldNode(field.getNodeName());

          const subFields = field.getFields();

          for (const field of subFields) {
            // filtrar el subField segun su tipo
            const subFieldSolutionNode = this.createSolutionNode({
              field: field,
              indexDoc: indexDoc,
            });

            // insertar la solucion del field en la solucion del mixed field pasado por parametro
            mixedNode.insertNode(subFieldSolutionNode);
          }

          return mixedNode;
        }

        // en caso de ser un enum field
        else if (field instanceof EnumValueNode) {
          return new SingleResultNode({
            name: field.getNodeName(),
            value: field.value(),
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
