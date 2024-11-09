import { DocumentTree } from "../../result-tree/classes";
import { SchemaResolver } from "../../schema-resolver";

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
export type GetStoreWhere<T = any> = (fields: T) => boolean;

export type GetStoreValueConfig<C = any> = GetStoreConfig & {
  omitDocument: DocumentTree<C>;
  omitResolver: SchemaResolver;
};
