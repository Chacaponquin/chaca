import { SchemaStore } from "../SchemasStore/SchemaStore.js";
import { DocumentTree } from "../ChacaResultTree/classes/DocumentTree/DocumentTree.js";
import { GetStoreValueConfig } from "../SchemasStore/interfaces/store.interface.js";
import { FieldNode } from "../ChacaResultTree/classes/index.js";

export class DatasetStore {
  constructor(
    private readonly schemasStore: SchemaStore,
    private readonly omitCurrentDocument: DocumentTree<any>,
  ) {}

  public getValue<R = any>(
    fieldToGet: string,
    config?: GetStoreValueConfig,
  ): Array<R> {
    const foundNodes = this.schemasStore.getValue(fieldToGet, config);
    const returnValues = [] as Array<R>;

    for (const node of foundNodes) {
      if (node instanceof FieldNode) {
        returnValues.push(node.getRealValue() as R);
      } else {
        if (node !== this.omitCurrentDocument) {
          returnValues.push(node.getDocumentObject());
        }
      }
    }

    return returnValues;
  }
}
