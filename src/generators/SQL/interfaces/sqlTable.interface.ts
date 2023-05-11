import { SQLDefinition } from "../classes/definitionTypes/index.js";

export type ColumnVariation = {
  key: string;
  newType: SQLDefinition;
  isNull: boolean;
};
