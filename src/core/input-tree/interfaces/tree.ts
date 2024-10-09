import { FieldIsArray } from "../../schema/value-object";
import { PossibleNull } from "../core/possible-null";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: string[];
  isArray: FieldIsArray;
  possibleNull: PossibleNull;
}
