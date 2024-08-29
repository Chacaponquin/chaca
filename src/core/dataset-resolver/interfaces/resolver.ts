import { ChacaSchema } from "../../schema";

export interface DatasetSchema {
  /**
   * Schema name
   */
  name: string;
  /**
   * Defined schema
   */
  schema: ChacaSchema;
  /**
   * Count documents to generate
   */
  documents: number;
}
