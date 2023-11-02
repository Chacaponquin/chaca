import { SearchedRefValue } from "../ChacaInputTree/classes/RefValueNode/interfaces/ref";
import { GetStoreValueConfig } from "../SchemasStore/interfaces/store";
import { DocumentTree, FieldNode } from "./classes";

export class ChacaResultTree<D> {
  constructor(public readonly schemaName: string) {}

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
          const isValid =
            d !== config.omitDocument && whereFunction(d.getDocumentObject());
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
    fieldTreeRoute: Array<string>,
  ): Array<SearchedRefValue> {
    const allValues: Array<SearchedRefValue> = [];

    this.documents.forEach((d) => {
      // quitar el primer elemento de la ruta pues pertenece al nombre del schema al que pertenece
      const foundValue = d.getRefValueByNodeRoute(fieldTreeRoute.slice(1));

      allValues.push({ resultNode: foundValue, document: d });
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
