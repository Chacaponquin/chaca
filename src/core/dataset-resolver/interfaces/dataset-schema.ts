import { DatasetStore } from "../../dataset-store/dataset-store";
import { Schema } from "../../schema/schema";

export type DatasetSchemaCountFunctionProps = {
  /** Store to interact with all dataset schemas */
  store: DatasetStore;
};

export type DatasetSchemaCountFunction = (
  props: DatasetSchemaCountFunctionProps,
) => number | Promise<number>;

export type DatasetSchemaCount = number | DatasetSchemaCountFunction;

export interface DatasetSchema {
  /**
   * Schema name
   */
  name: string;
  /**
   * Defined schema
   */
  schema: Schema;
  /**
   * Count documents to generate
   */
  documents: DatasetSchemaCount;
}
