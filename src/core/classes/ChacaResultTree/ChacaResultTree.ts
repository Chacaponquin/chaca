import { RefValueNode } from "../ChacaInputTree/classes/index.js";
import { DatasetStore } from "../DatasetStore/DatasetStore.js";
import { SchemaData } from "../SchemaData/SchemaData.js";
import { SchemaStore } from "../SchemasStore/SchemaStore.js";
import { GetStoreValueConfig } from "../SchemasStore/interfaces/store.interface.js";
import { DocumentTree, FieldNode, SingleResultNode } from "./classes/index.js";

export class ChacaResultTree<D> {
  constructor(
    public readonly schemaName: string,
    private readonly schemasStore: SchemaStore,
  ) {}

  private documents: Array<DocumentTree<D>> = [];

  public getDocumentByIndex(index: number): DocumentTree<D> {
    return this.documents[index];
  }

  public insertDocument(document: DocumentTree<D>) {
    this.documents.push(document);
  }

  public getAllValuesByNodeRoute(
    fieldTreeRoute: Array<string>,
    config: GetStoreValueConfig,
  ): Array<FieldNode> {
    const whereFunction = config.where;

    const filterDocuemnts = whereFunction
      ? this.documents.filter((d) => {
          const isValid = whereFunction(d.getDocumentObject());
          return isValid;
        })
      : this.documents;

    const allNodes = [] as Array<FieldNode>;

    filterDocuemnts.forEach((d) => {
      const foundNode = d.getNodeByNodeRoute(fieldTreeRoute);
      allNodes.push(foundNode);
    });

    return allNodes;
  }

  public getAllRefValuesByNodeRoute(
    currentDocument: number,
    fieldTreeRoute: Array<string>,
    refFieldWhoCalls: RefValueNode,
    currentSchemaResolverIndex: number,
  ): Array<SingleResultNode> {
    const allValues: Array<SingleResultNode> = [];
    const currentSchemaResolver =
      this.schemasStore.getSchemasResolvers()[currentSchemaResolverIndex];
    const restSchemaDocuments =
      currentSchemaResolver.documentsWithOutCurrentDocument(currentDocument);
    const currentFields = currentSchemaResolver
      .getResultTree()
      .getDocumentByIndex(currentDocument)
      .getDocumentObject();

    this.documents.forEach((d) => {
      // quitar el primer elemento de la ruta pues pertenece al nombre del schema al que pertenece
      const foundValue = d.getRefValueByNodeRoute(fieldTreeRoute.slice(1));

      if (refFieldWhoCalls.refField.where) {
        const isAccepted = refFieldWhoCalls.refField.where({
          store: new DatasetStore(this.schemasStore, d),
          refFields: d.getDocumentObject(),
          currentFields,
          schemaRestDocuments: new SchemaData(restSchemaDocuments),
        });

        if (isAccepted) {
          allValues.push(foundValue);
        }
      } else {
        allValues.push(foundValue);
      }
    });

    return allValues;
  }

  public getDocumentsArray(): Array<D> {
    return this.documents.map((d) => d.getDocumentObject());
  }

  public getDocuments(): Array<DocumentTree<D>> {
    return this.documents;
  }
}
