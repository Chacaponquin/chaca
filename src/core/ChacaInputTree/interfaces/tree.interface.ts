import {
  FieldIsArrayConfig,
  FieldPossibleNullConfig,
} from "../../ChacaSchema/interfaces/schema";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: Array<string>;
  isArray: FieldIsArrayConfig;
  possibleNull: FieldPossibleNullConfig;
}
