import { Schema } from "../../schema";

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
  documents: number;
}
