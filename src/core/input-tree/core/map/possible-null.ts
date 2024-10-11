import { WrongPossibleNullDefinitionError } from "../../../../errors";
import { FieldPossibleNull } from "../../../schema/value-object";
import { ChacaUtils } from "../../../utils";
import {
  AbsoluteNullCount,
  BooleanNull,
  FunctionNull,
  NotNull,
  PossibleNull,
  ProbabilityNull,
} from "../possible-null";

interface Props {
  value: FieldPossibleNull;
  route: string;
  countDocs: number;
}

export class PossibleNullMapper {
  constructor(private readonly utils: ChacaUtils) {}

  execute({ value: ivalue, countDocs, route }: Props): PossibleNull {
    if (!ivalue.isValid()) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter can be an integer, a float, or a function that returns the probability that the field has a null value.`,
      );
    }

    let result: PossibleNull;
    const value = ivalue.value();

    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        result = new AbsoluteNullCount(this.utils, {
          total: countDocs,
          value: value,
          route: route,
        });
      } else {
        result = new ProbabilityNull({ route: route, value: value });
      }
    } else if (typeof value === "boolean") {
      result = new BooleanNull({ value: value, route: route });
    } else if (typeof value === "function") {
      result = new FunctionNull({ route: route, func: value });
    } else if (typeof value === "undefined") {
      result = new NotNull();
    } else {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter can be an integer, a float, or a function that returns the probability that the field has a null value.`,
      );
    }

    return result;
  }
}
