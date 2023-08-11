import { InputPossibleNull } from "../../../interfaces/schema.interface.js";

export class FieldPossibleNull {
  private _value: number;

  constructor(posible?: InputPossibleNull) {
    this._value = this.validate(posible);
  }

  public value() {
    return this._value;
  }

  private validate(pos?: InputPossibleNull): number {
    let value: number;

    if (typeof pos === "number") {
      value = pos <= 100 && pos >= 0 ? pos : 50;
    } else {
      value = pos ? 50 : 0;
    }

    return value;
  }
}
