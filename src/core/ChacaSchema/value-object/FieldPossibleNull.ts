import {
  FieldPossibleNullConfig,
  InputPossibleNull,
} from "../interfaces/schema";

export class FieldPossibleNull {
  private _value: FieldPossibleNullConfig;

  constructor(posible?: InputPossibleNull) {
    this._value = this.validate(posible);
  }

  public value() {
    return this._value;
  }

  public static validateNumber(pos: number): number {
    if (pos <= 100 && pos >= 0) {
      return pos;
    } else if (pos > 100) {
      return 100;
    } else if (pos < 0) {
      return 0;
    } else {
      return 50;
    }
  }

  public static validateBoolean(pos?: boolean): number {
    return pos ? 50 : 0;
  }

  private validate(pos?: InputPossibleNull): FieldPossibleNullConfig {
    let value: FieldPossibleNullConfig;

    if (typeof pos === "number") {
      value = FieldPossibleNull.validateNumber(pos);
    } else if (typeof pos === "function") {
      value = pos;
    } else {
      value = FieldPossibleNull.validateBoolean(pos);
    }

    return value;
  }
}
