import { DocumentTree } from "../ChacaResultTree/classes/index.js";

export class SchemaData<D> {
  constructor(private readonly schemaDocuments: Array<DocumentTree<D>>) {}

  getDocuments(): Array<D> {
    return this.schemaDocuments.map((d) => d.getDocumentObject());
  }
}
