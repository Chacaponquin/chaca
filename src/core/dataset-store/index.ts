import { SchemaStore } from "../schema-store/store";
import { DocumentTree } from "../result-tree/classes/DocumentTree/DocumentTree";
import {
  GetStoreValueConfig,
  GetStoreValueInput,
} from "../schema-store/interfaces/store";
import { FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";

interface Props {
  schemasStore: SchemaStore;
  omitCurrentDocument: DocumentTree<any>;
  omitResolver: SchemaResolver;
}

/** Store to interact with all datasets */
export class DatasetStore {
  private readonly schemasStore: SchemaStore;
  private readonly omitCurrentDocument: DocumentTree<any>;
  private readonly omitResolver: SchemaResolver;

  constructor({ omitCurrentDocument, omitResolver, schemasStore }: Props) {
    this.omitResolver = omitResolver;
    this.omitCurrentDocument = omitCurrentDocument;
    this.schemasStore = schemasStore;
  }

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

  value<R = any>(fieldToGet: string, config?: GetStoreValueInput<R>): R[] {
    const foundNodes = this.schemasStore.value(
      fieldToGet,
      this.validateGetValueConfig(config),
    );

    const returnValues = [] as R[];

    for (const node of foundNodes) {
      if (node instanceof FieldNode) {
        returnValues.push(node.getRealValue() as R);
      } else {
        returnValues.push(node.getDocumentObject());
      }
    }

    return returnValues;
  }

  getSchemaDocuments<R = any>(): R[] {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
}
