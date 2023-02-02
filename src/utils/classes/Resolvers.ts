import { SchemaToResolve } from "../interfaces/schema.interface.js";
import { ChacaInputTree } from "./ChacaInputTree/ChacaInputTree.js";
import { ChacaResultTree } from "./ChacaResultTree/ChacaResultTree.js";
import { DocumentTree } from "./ChacaResultTree/classes/index.js";

export class SchemaResolver<K, T> {
  private inputTree: ChacaInputTree<K>;

  private resultDocuments: Array<DocumentTree<K>> = [];

  constructor(schemaObject: SchemaToResolve<T>) {
    this.inputTree = new ChacaInputTree(schemaObject);
  }

  public resolve(numDocs: number): Array<K> {
    for (let i = 1; i <= numDocs; i++) {
      const newDoc = new DocumentTree<K>();

      this.resultDocuments.push(newDoc);
    }

    return this.resultDocuments.map((d) => d.getDocumentObject());
  }
}
