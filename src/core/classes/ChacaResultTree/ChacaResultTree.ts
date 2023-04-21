import { DocumentTree } from "./classes/index.js";

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
  ): Array<unknown> {
    const allValues: Array<unknown> = [];

    this.documents.forEach((d) => {
      // quitar el primer elemento de la ruta pues pertenece al nombre del schema al que pertenece
      const foundValue = d.getValueByNodeRoute(fieldTreeRoute.slice(1));

      allValues.push(foundValue);
    });

    return allValues;
  }

  public getDocumentsArray(): Array<D> {
    return this.documents.map((d) => d.getDocumentObject());
  }
}
