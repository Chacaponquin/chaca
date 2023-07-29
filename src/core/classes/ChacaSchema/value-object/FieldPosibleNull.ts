import { InputPosibleNull } from "../../../interfaces/schema.interface.js";

export class FieldPosibleNull {
  private _value: number;

  constructor(posible?: InputPosibleNull) {
    this._value = this.validate(posible);
  }

  public value() {
    return this._value;
  }

  private validate(pos?: InputPosibleNull): number {
    let value: number;

    if (typeof pos === "number") {
      value = pos <= 100 && pos >= 0 ? pos : 50;
    } else {
      value = pos ? 50 : 0;
    }

    return value;
  }
}
