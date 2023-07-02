import { ChacaSchema } from "../../../classes/ChacaSchema/ChacaSchema.js";

export interface MultiGenerateSchema {
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

export type GenerateConfig = Partial<{
  /** Show log in console progretion */
  verbose: boolean;
}>;
