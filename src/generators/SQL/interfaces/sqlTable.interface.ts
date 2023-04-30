import { SQLTypeWithDefinition } from "../classes/SQLTypeWithDefinition.js";

export type ColumnVariation = {
  key: string;
  newType: SQLTypeWithDefinition;
  isNull: boolean;
};
