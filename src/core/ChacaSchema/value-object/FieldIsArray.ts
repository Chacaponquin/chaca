import {
  FieldIsArrayConfig,
  InputIsArrayConfig,
} from "../interfaces/schema.interface.js";

export class FieldIsArray {
  private _value: FieldIsArrayConfig = null;

  constructor(isArray?: InputIsArrayConfig) {
    this._value = this.validate(isArray);
  }

  public value() {
    return this._value;
  }

  private validate(isArray?: InputIsArrayConfig): FieldIsArrayConfig {
    let value: FieldIsArrayConfig = null;

    if (typeof isArray === "number") {
      if (isArray >= 0) {
        value = {
          min: isArray,
          max: isArray,
        };
      } else {
        value = {
          min: 10,
          max: 10,
        };
      }
    } else if (typeof isArray === "boolean") {
      if (isArray) {
        value = { min: 0, max: 10 };
      } else {
        value = null;
      }
    } else if (
      typeof isArray === "object" &&
      !Array.isArray(isArray) &&
      isArray !== null
    ) {
      const min =
        typeof isArray["min"] === "number" && isArray["min"] > 0
          ? isArray["min"]
          : 1;
      const max =
        typeof isArray["max"] === "number" && isArray["max"] > min
          ? isArray["max"]
          : min + 9;

      value = { min, max };
    }

    return value;
  }
}
