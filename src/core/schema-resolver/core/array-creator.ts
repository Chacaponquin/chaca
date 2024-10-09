import { WrongArrayDefinitionError } from "../../../errors";
import { DatatypeModule } from "../../../modules/datatype";
import { ArrayLimitObject } from "../../schema/interfaces/schema";

interface Props {
  value: Limit;
  route: string;
  func(): void;
}

export type Limit = ArrayLimitObject | number;

export class ArrayCretor {
  constructor(private readonly datatypeModule: DatatypeModule) {}

  execute({ func, value, route }: Props): void {
    let limit = 10;

    if (typeof value === "number") {
      limit = value;

      if (value < 0) {
        throw new WrongArrayDefinitionError(
          `In field '${route}'. The parameter isArray cannot be less than 0`,
        );
      }
    } else if (typeof value === "object" && value !== null) {
      const min = value.min === undefined ? 0 : value.min;
      const max = value.max === undefined ? min + 9 : value.max;

      if (min < 0) {
        throw new WrongArrayDefinitionError(
          `In field '${route}'. The parameter isArray.min cannot be less than 0`,
        );
      }

      if (max < 0) {
        throw new WrongArrayDefinitionError(
          `In field '${route}'. The parameter isArray.max cannot be less than 0`,
        );
      }

      if (min > max) {
        throw new WrongArrayDefinitionError(
          `In field '${route}'. The parameter isArray.min cannot be greater than isArray.max`,
        );
      }

      limit = this.datatypeModule.int({ min: min, max: max });
    } else {
      throw new WrongArrayDefinitionError(
        `In field '${route}'. The parameter isArray must be an integer, a function or an object with the limits { min, max }`,
      );
    }

    for (let arrayIndex = 0; arrayIndex < limit; arrayIndex++) {
      func();
    }
  }
}
