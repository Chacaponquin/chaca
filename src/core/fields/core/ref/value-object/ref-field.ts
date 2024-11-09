import { FieldToRef } from "..";

export class InputRefField {
  private _value: string;

  constructor(refField: FieldToRef) {
    if (typeof refField === "string") {
      this._value = refField;
    } else {
      this._value = "";
    }
  }

  value(): string {
    return this._value;
  }
}
