import { SchemaStore } from "../SchemasStore/SchemaStore";
import { DocumentTree } from "../ChacaResultTree/classes/DocumentTree/DocumentTree";
import {
  GetStoreValueConfig,
  GetStoreValueInput,
} from "../SchemasStore/interfaces/store";
import { FieldNode } from "../ChacaResultTree/classes";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver";

/** Store to interact with all datasets */
export class DatasetStore {
  constructor(
    private readonly schemasStore: SchemaStore,
    private readonly omitCurrentDocument: DocumentTree<any>,
    private readonly omitResolver: SchemaResolver,
  ) {}

  private validateGetValueConfig(
    config?: GetStoreValueInput,
  ): GetStoreValueConfig {
    const returnConfig: GetStoreValueConfig = {
      omitDocument: this.omitCurrentDocument,
      omitResolver: this.omitResolver,
    };

    if (config && typeof config === "object" && config !== null) {
      if (typeof config.where === "function") {
        const whereFunction = config.where;
        returnConfig.where = whereFunction;
      }
    } else if (typeof config === "function") {
      returnConfig.where = config;
    }

    return returnConfig;
  }

  public getValue<R = any>(
    fieldToGet: string,
    config?: GetStoreValueInput<R>,
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
        returnValues.push(node.getDocumentObject());
      }
    }

    return returnValues;
  }

  public getSchemaDocuments<R = any>(): Array<R> {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
}
