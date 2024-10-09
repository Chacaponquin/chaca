import { IsArray } from "../core/is-array";
import { PossibleNull } from "../core/possible-null";

export interface ChacaTreeNodeConfig {
  fieldTreeRoute: string[];
  isArray: IsArray;
  possibleNull: PossibleNull;
}
