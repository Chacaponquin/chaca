import { DocumentTree } from "../../result-tree/classes/document/document-tree";
import { SchemaResolver } from "../../schema-resolver/schema-resolver";

/**
 * Get value in dataset store config
 */
export type GetStoreConfig = {
  /**
   * Function that filters the store schema fields
   */
  where?: GetStoreWhere;
};

/**
 * Function that filters the store schema fields
 */
export type GetStoreWhere<T = any> = (fields: T) => boolean | Promise<boolean>;

export type GetStoreValueConfig<C = any> = GetStoreConfig & {
  omitDocument?: DocumentTree<C>;
  omitResolver: SchemaResolver;
};
