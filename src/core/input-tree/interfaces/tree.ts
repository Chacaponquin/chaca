import { FieldPossibleNullConfig } from "../../schema/interfaces/schema";
import { FieldIsArray } from "../../schema/value-object";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: string[];
  isArray: FieldIsArray;
  possibleNull: FieldPossibleNullConfig;
}
