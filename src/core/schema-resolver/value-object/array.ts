import { IsArrayConfig } from "../../schema/interfaces/schema";

export class FieldIsArray {
  private readonly _value: IsArrayConfig;
  private valid = true;

  constructor(isArray?: IsArrayConfig) {
    this._value = this.validate(isArray);
  }

  value() {
    return this._value;
  }

  can(): boolean {
    return (
      (typeof this._value === "number" && this._value > 0) ||
      typeof this._value === "function"
    );
  }

  isValid(): boolean {
    return this.valid;
  }

  private validate(isArray?: IsArrayConfig): IsArrayConfig {
    let value: IsArrayConfig;

    if (typeof isArray === "number") {
      value = isArray;
    } else if (typeof isArray === "function") {
      value = isArray;
    } else if (typeof isArray === "object" && isArray !== null) {
      const min = typeof isArray.min === "number" ? isArray.min : undefined;
      const max = typeof isArray.max === "number" ? isArray.max : undefined;

      value = { min, max };
    } else if (typeof isArray === "undefined") {
      value = undefined;
    } else {
      value = undefined;
      this.valid = false;
    }

    return value;
  }
}
