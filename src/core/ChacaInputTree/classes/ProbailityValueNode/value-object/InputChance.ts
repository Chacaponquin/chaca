import { ChacaError } from "../../../../../errors";
import { Chance } from "../../../../Fields/core/ProbabilityField/ProbabilityField";

interface Props {
  value: Chance;
  route: string;
}

interface ValidateProps {
  value: number;
  route: string;
}

export class InputChance {
  private _value: Chance;

  public static validateChanceNumber({ route, value }: ValidateProps): number {
    if (typeof value === "number") {
      if (value > 1) {
        return 1;
      } else if (value < 0) {
        return 0;
      } else {
        return value;
      }
    } else {
      throw new ChacaError(
        `In ${route}, the 'chance' parameter is not a number between 0 and 1`,
      );
    }
  }

  constructor({ route, value }: Props) {
    if (typeof value === "number") {
      this._value = InputChance.validateChanceNumber({ value, route });
    } else if (typeof value === "function") {
      this._value = value;
    } else {
      throw new ChacaError(
        `In ${route}, the 'chance' parameter must be a number between 0 and 1 or a function that returns a value in that range`,
      );
    }
  }

  public value(): Chance {
    return this._value;
  }
}
