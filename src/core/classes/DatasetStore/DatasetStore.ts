import { SchemaStore } from "../SchemasStore/SchemaStore.js";
import { DocumentTree } from "../ChacaResultTree/classes/DocumentTree/DocumentTree.js";

export class DatasetStore {
  constructor(
    private readonly schemasStore: SchemaStore,
    private readonly omitCurrentDocument: DocumentTree<any>,
  ) {}
}
