import { ChacaError, CyclicAccessDataError } from "../../errors/ChacaError.js";
import { ChacaUtils } from "../ChacaUtils/ChacaUtils.js";
import { SchemaToResolve } from "../ChacaSchema/interfaces/schema.interface.js";
import { ChacaInputTree } from "../ChacaInputTree/ChacaInputTree.js";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  KeyValueNode,
  SequentialValueNode,
  SequenceValueNode,
} from "../ChacaInputTree/classes/index.js";
import { ChacaResultTree } from "../ChacaResultTree/ChacaResultTree.js";
import {
  DocumentTree,
  FieldNode,
  ArrayResultNode,
  MixedFieldNode,
  SingleResultNode,
} from "../ChacaResultTree/classes/index.js";
import { SchemaStore } from "../SchemasStore/SchemaStore.js";
import { GetStoreValueConfig } from "../SchemasStore/interfaces/store.interface.js";
import { DatasetStore } from "../DatasetStore/DatasetStore.js";
import { SearchedRefValue } from "../ChacaInputTree/classes/RefValueNode/interfaces/refNode.interface.js";
import { DataTypeSchema } from "../../schemas/dataType/DataTypeSchema.js";
import { CountDoc, SchemaName } from "./value-object/index.js";

interface SchemaResolverProps {
  schemaName: string;
  schemaObject: SchemaToResolve;
  countDoc: number;
  schemaIndex: number;
  consoleVerbose: boolean;
}

export class SchemaResolver<K = any> {
  private dataTypeSchema = new DataTypeSchema();
  private utils = new ChacaUtils();

  private inputTree: ChacaInputTree | null = null;
  private resultTree: ChacaResultTree<K>;
  private schemaName: string;
  private countDoc: number;
  private schemaObject: SchemaToResolve;
  private schemaIndex: number;

  private isBuilding = false;
  private finishBuilding = false;

  private schemasStore: SchemaStore = new SchemaStore([]);

  private consoleVerbose = false;

  constructor({
    consoleVerbose,
    countDoc,
    schemaIndex,
    schemaName,
    schemaObject,
  }: SchemaResolverProps) {
    this.schemaName = new SchemaName(schemaName).value();
    this.schemaObject = schemaObject;
    this.resultTree = new ChacaResultTree<K>(this.schemaName);
    this.countDoc = new CountDoc(countDoc).value();
    this.schemaIndex = schemaIndex;
    this.consoleVerbose = consoleVerbose;
  }

  public getKeyNodes(): Array<KeyValueNode> {
    let keys = [] as Array<KeyValueNode>;

    if (this.inputTree) {
      keys = this.inputTree.getKeyFields();
    }

    return keys;
  }

  public getpossibleNullNodes(): Array<ChacaTreeNode> {
    let nodes = [] as Array<ChacaTreeNode>;

    if (this.inputTree) {
      nodes = this.inputTree.getpossibleNullNodes();
    }

    return nodes;
  }

  public getRefNodes(): Array<RefValueNode> {
    if (this.inputTree) {
      return this.inputTree.getRefNodes();
    } else {
      return [];
    }
  }

  public getSchemaToResolve() {
    return this.schemaObject;
  }

  public buildInputTree(): void {
    if (this.inputTree === null) {
      this.inputTree = new ChacaInputTree(
        this.schemaName,
        this.schemaObject,
        this.schemasStore,
      );
    }
  }

  public getSchemaName(): string {
    return this.schemaName;
  }

  public isFinishBuilding() {
    return this.finishBuilding;
  }

  public isBuildingTrees(): boolean {
    return this.isBuilding;
  }

  public setInjectedSchemas(array: Array<SchemaResolver>): void {
    this.schemasStore.setInjectedSchemas(array);
  }

  public getInputTree() {
    return this.inputTree;
  }

  public getResultTree() {
    return this.resultTree;
  }

  public getAllValuesByRoute(
    fieldToGet: Array<string>,
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

  public getAllRefValuesByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): Array<SearchedRefValue> {
    const allValues =
      this.resultTree.getAllRefValuesByNodeRoute(fieldTreeRoute);
    return allValues;
  }

  public searchRefNodes() {
    if (this.inputTree) {
      this.inputTree.searchRefNodes();
    }
  }

  public dangerCyclic(): boolean {
    if (!this.finishBuilding && this.isBuilding) {
      return true;
    } else {
      return false;
    }
  }

  public buildTrees(): void {
    if (!this.finishBuilding) {
      if (!this.isBuilding) {
        if (this.inputTree) {
          if (this.consoleVerbose) {
            // eslint-disable-next-line no-console
            console.log(`Creating ${this.schemaName} data...`);
          }

          // cambiar isBuilding a true
          this.isBuilding = true;

          for (let indexDoc = 0; indexDoc < this.countDoc; indexDoc++) {
            const newDoc = new DocumentTree<K>();

            // insert new document
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
            `It's imposible create the result trees for the schema ${this.schemaName}, because the input tree was not created yet.`,
          );
        }
      } else {
        throw new CyclicAccessDataError(
          `You are trying to access ${this.schemaName} when this one is being created`,
        );
      }
    }
  }

  public resolve(): Array<K> {
    this.buildInputTree();
    this.buildTrees();
    return this.getDocumentsArray();
  }

  public getDocumentsArray(omitDocument?: DocumentTree<K>): Array<K> {
    return this.getResultTree()
      .getDocuments()
      .filter((d) => d !== omitDocument)
      .map((d) => d.getDocumentObject());
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
    const fieldIsArray = field.getNodeConfig().isArray;
    if (fieldIsArray !== null) {
      // limite del arreglo de valores
      const limit = this.dataTypeSchema.int().getValue({
        min: fieldIsArray.min,
        max: fieldIsArray.max,
      });

      // resolver el field hasta llegar al limite del array
      for (let arrayIndex = 0; arrayIndex < limit; arrayIndex++) {
        // resolver el field y guardarlo en un nodo
        const fieldSolutionNode = this.createSolutionNodeByType(
          field.getNoArrayNode(),
          indexDoc,
        );

        // insertar el field en el array de soluciones
        solutionArrayNode.insertNode(fieldSolutionNode);

        // resolver el field en caso de ser un mixed field
        this.resolveArrayAndMixedFields(field, fieldSolutionNode, indexDoc);
      }
    }
  }

  private createMixedSubFields(
    solutionMixedNode: MixedFieldNode,
    mixedField: MixedValueNode,
    indexDoc: number,
  ): void {
    const subFields = mixedField.getFields();
    for (const f of subFields) {
      // filtrar el subField segun su tipo
      const subFieldSolutionNode = this.createSolutionNodeByType(f, indexDoc);

      // insertar la solucion del field en la solucion del mixed field pasado por parametro
      solutionMixedNode.insertNode(subFieldSolutionNode);

      // resolver el subField en caso de ser un array o un mixed field
      this.resolveArrayAndMixedFields(f, subFieldSolutionNode, indexDoc);
    }
  }

  private createSolutionNodeByType(
    field: ChacaTreeNode,
    indexDoc: number,
  ): FieldNode {
    // en caso de ser un array
    if (field.getNodeConfig().isArray) {
      return new ArrayResultNode(field.getResultNodeConfig(), field);
    }

    // en caso de no ser un array
    else {
      // en caso de ser un schema field
      if (field instanceof SchemaValueNode) {
        return new SingleResultNode(
          field.getResultNodeConfig(),
          field.getValue(),
        );
      }

      // en caso de ser un field sequential
      else if (field instanceof SequentialValueNode) {
        const value = field.getSequentialValue();
        return new SingleResultNode(field.getResultNodeConfig(), value);
      }

      // en caso de ser un custom field
      else if (field instanceof CustomValueNode) {
        const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);

        // obtener el valor de la funcion pasando como parametro el documento actual del ciclo
        const value = field.getValue(
          currentDocument.getDocumentObject(),
          new DatasetStore(this.schemasStore, currentDocument, this),
        );

        return new SingleResultNode(field.getResultNodeConfig(), value);
      }

      // en caso de ser un ref field
      else if (field instanceof RefValueNode) {
        const refValue = field.getValue(indexDoc, this.schemaIndex);
        return new SingleResultNode(field.getResultNodeConfig(), refValue);
      }

      // en caso de ser un key field
      else if (field instanceof KeyValueNode) {
        const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);
        const keyValue = field.getValue(
          indexDoc,
          new DatasetStore(this.schemasStore, currentDocument, this),
          this.schemaIndex,
        );

        return new SingleResultNode(field.getResultNodeConfig(), keyValue);
      }

      // en caso de ser un sequence
      else if (field instanceof SequenceValueNode) {
        return new SingleResultNode(
          field.getResultNodeConfig(),
          field.getNextValue(),
        );
      }

      // en caso de ser un mixed field
      else if (field instanceof MixedValueNode) {
        return new MixedFieldNode(field.getResultNodeConfig());
      }

      // en caso de ser un enum field
      else if (field instanceof EnumValueNode) {
        return new SingleResultNode(
          field.getResultNodeConfig(),
          this.utils.oneOfArray(field.enumOptions),
        );
      }

      // en caso de no ser ninguno de los anteriores
      else {
        throw new ChacaError(
          `'${field.getNodeName()}' has an invalid method of solution`,
        );
      }
    }
  }
}
