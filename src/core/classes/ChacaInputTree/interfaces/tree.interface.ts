import { FieldIsArrayConfig } from "../../../interfaces/schema.interface.js";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: Array<string>;
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}
