import { PossibleNullConfig } from "../../schema/interfaces/schema";

export class FieldPossibleNull {
  private _value: PossibleNullConfig;
  private valid = true;

  constructor(possible?: PossibleNullConfig) {
    this._value = this.validate(possible);
  }

  value() {
    return this._value;
  }

  isValid(): boolean {
    return this.valid;
  }

  can(): boolean {
    return (
      (typeof this._value === "number" && this._value > 0) ||
      this._value === true ||
      typeof this._value === "function"
    );
  }

  private validate(pos?: PossibleNullConfig): PossibleNullConfig {
    let value: PossibleNullConfig;

    if (typeof pos === "number") {
      value = pos;
    } else if (typeof pos === "function") {
      value = pos;
    } else if (typeof pos === "boolean") {
      value = pos;
    } else if (typeof pos === "undefined") {
      value = undefined;
    } else {
      value = 0;
      this.valid = false;
    }

    return value;
  }
}
