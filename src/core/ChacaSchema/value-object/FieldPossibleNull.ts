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

  private validate(pos?: InputPossibleNull): FieldPossibleNullConfig {
    let value: FieldPossibleNullConfig;

    if (typeof pos === "number") {
      value = pos <= 100 && pos >= 0 ? pos : 50;
    } else if (typeof pos === "function") {
      value = pos;
    } else {
      value = pos ? 50 : 0;
    }

    return value;
  }
}
