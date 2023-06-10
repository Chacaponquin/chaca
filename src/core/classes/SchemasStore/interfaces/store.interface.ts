import { DocumentTree } from "../../ChacaResultTree/classes/index.js";

export interface GetStoreValueInput<C = any> {
  where?: (fields: C) => boolean;
}

export type GetStoreValueConfig<C = any> = GetStoreValueInput<C> & {
  omitDocument: DocumentTree<C>;
};
