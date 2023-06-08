export interface GetStoreValueConfig<C = any> {
  where?: (fields: C) => boolean;
}
