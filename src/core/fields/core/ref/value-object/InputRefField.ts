import { ChacaError } from "../../../../../errors";
import { FieldToRef } from "../interfaces/ref";

export class InputRefField {
  private _value: string;

  constructor(refField: FieldToRef) {
    if (typeof refField === "string" && refField.trim() !== "") {
      this._value = refField;
    } else {
      throw new ChacaError("You can't reference an empty field");
    }
  }

  public value(): string {
    return this._value;
  }
}
