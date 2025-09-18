import { DocumentTree } from "../../result-tree/classes/document/document-tree";
import { SchemaResolver } from "../../schema-resolver/schema-resolver";
import {
  GetStoreConfig,
  GetStoreValueConfig,
} from "../../schema-store/interfaces/schema-store";

interface Props {
  omitCurrentDocument: DocumentTree;
  omitResolver: SchemaResolver;
  config?: GetStoreConfig;
}

export class GetConfig {
  private readonly _value: GetStoreValueConfig;

  constructor({ omitCurrentDocument, omitResolver, config }: Props) {
    const returnConfig: GetStoreValueConfig = {
      omitDocument: omitCurrentDocument,
      omitResolver: omitResolver,
    };

    if (config && typeof config === "object" && config !== null) {
      if (typeof config.where === "function") {
        const whereFunction = config.where;
        returnConfig.where = whereFunction;
      }
    }

    this._value = returnConfig;
  }

  value() {
    return this._value;
  }
}
