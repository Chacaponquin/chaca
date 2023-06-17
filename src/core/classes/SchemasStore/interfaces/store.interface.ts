import { DocumentTree } from "../../ChacaResultTree/classes/index.js";
import { SchemaResolver } from "../../SchemaResolver.js";

export type GetStoreValueInput<C = any> =
  | GetStoreWhere<C>
  | GetStoreWhereObject<C>;

export type GetStoreWhere<C = any> = (fields: C) => boolean;

export type GetStoreWhereObject<C> = {
  where?: GetStoreWhere<C>;
};

export type GetStoreValueConfig<C = any> = GetStoreWhereObject<C> & {
  omitDocument: DocumentTree<C>;
  omitResolver: SchemaResolver;
};
