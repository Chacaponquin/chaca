import { ChacaSchema } from "../../../classes/ChacaSchema/ChacaSchema.js";

export interface MultiGenerateSchema {
  name: string;
  schema: ChacaSchema;
  documents: number;
}
