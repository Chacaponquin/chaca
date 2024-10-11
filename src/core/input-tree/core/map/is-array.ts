import { WrongArrayDefinitionError } from "../../../../errors";
import { DatatypeModule } from "../../../../modules/datatype";
import { FieldIsArray } from "../../../schema/value-object";
import {
  FunctionArray,
  IntegerArray,
  IsArray,
  LimitsArray,
  NotArray,
} from "../is-array";

interface Props {
  route: string;
  value: FieldIsArray;
}

export class IsArrayMapper {
  constructor(private readonly datatypeModule: DatatypeModule) {}

  execute({ value, route }: Props): IsArray {
    if (!value.isValid()) {
      throw new WrongArrayDefinitionError(
        route,
        `The isArray parameter must be an integer, a function or an object with the limits { min, max }`,
      );
    }

    const result = value.value();

    let type: IsArray;
    if (typeof result === "number") {
      type = new IntegerArray({ route: route, value: result });
    } else if (typeof result === "function") {
      type = new FunctionArray(this.datatypeModule, {
        func: result,
        route: route,
      });
    } else if (typeof result === "object" && result !== null) {
      type = new LimitsArray(this.datatypeModule, {
        limits: result,
        route: route,
      });
    } else if (typeof result === "undefined") {
      type = new NotArray();
    } else {
      throw new WrongArrayDefinitionError(
        route,
        `The parameter isArray must be an integer, a function or an object with the limits { min, max }`,
      );
    }

    return type;
  }
}
