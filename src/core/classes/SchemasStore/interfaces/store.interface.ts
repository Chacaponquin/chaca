import { DocumentTree } from "../../ChacaResultTree/classes/index.js";
import { SchemaResolver } from "../../SchemaResolver/SchemaResolver.js";

/**
 * Get value in dataset store config
 */
export type GetStoreValueInput<C = any> =
  | GetStoreWhere<C>
  | GetStoreWhereObject<C>;

/**
 * Function that filters the store schema fields
 */
export type GetStoreWhere<C = any> = (fields: C) => boolean;

export type GetStoreWhereObject<C> = {
  /**
   * Function that filters the store schema fields
   */
  where?: GetStoreWhere<C>;
};

export type GetStoreValueConfig<C = any> = GetStoreWhereObject<C> & {
  omitDocument: DocumentTree<C>;
  omitResolver: SchemaResolver;
};
