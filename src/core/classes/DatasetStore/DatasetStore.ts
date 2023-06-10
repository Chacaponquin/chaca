import { SchemaStore } from "../SchemasStore/SchemaStore.js";
import { DocumentTree } from "../ChacaResultTree/classes/DocumentTree/DocumentTree.js";
import {
  GetStoreValueConfig,
  GetStoreValueInput,
} from "../SchemasStore/interfaces/store.interface.js";
import { FieldNode } from "../ChacaResultTree/classes/index.js";

export class DatasetStore {
  constructor(
    private readonly schemasStore: SchemaStore,
    private readonly omitCurrentDocument: DocumentTree<any>,
  ) {}

  private validateGetValueConfig(
    config?: GetStoreValueInput,
  ): GetStoreValueConfig {
    const returnConfig: GetStoreValueConfig = {
      omitDocument: this.omitCurrentDocument,
    };

    if (config && typeof config === "object" && config !== null) {
      if (typeof config.where === "function") {
        const whereFunction = config.where;
        returnConfig.where = whereFunction;
      }
    }

    return returnConfig;
  }

  public getValue<R = any>(
    fieldToGet: string,
    config?: GetStoreValueInput,
  ): Array<R> {
    const foundNodes = this.schemasStore.getValue(
      fieldToGet,
      this.validateGetValueConfig(config),
    );
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
