import { FieldIsArrayConfig } from "../../ChacaSchema/interfaces/schema";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: Array<string>;
  isArray: FieldIsArrayConfig;
  possibleNull: number;
}
