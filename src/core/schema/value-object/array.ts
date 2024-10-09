import { FieldIsArrayConfig, IsArrayConfig } from "../interfaces/schema";

export class FieldIsArray {
  private _value: FieldIsArrayConfig = null;

  private valid = true;

  constructor(isArray?: IsArrayConfig) {
    this._value = this.validate(isArray);
  }

  value() {
    return this._value;
  }

  isValid(): boolean {
    return this.valid;
  }

  private validate(isArray?: IsArrayConfig): FieldIsArrayConfig {
    let value: FieldIsArrayConfig;

    if (typeof isArray === "number") {
      value = isArray;
    } else if (typeof isArray === "function") {
      value = isArray;
    } else if (typeof isArray === "object" && isArray !== null) {
      const min = typeof isArray.min === "number" ? isArray.min : undefined;
      const max = typeof isArray.max === "number" ? isArray.max : undefined;

      value = { min, max };
    } else if (typeof isArray === "undefined") {
      value = null;
    } else {
      value = null;
      this.valid = false;
    }

    return value;
  }
}
