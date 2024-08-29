import {
  FieldIsArrayConfig,
  FieldPossibleNullConfig,
} from "../../schema/interfaces/schema";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: string[];
  isArray: FieldIsArrayConfig;
  possibleNull: FieldPossibleNullConfig;
}
