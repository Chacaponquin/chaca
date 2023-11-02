import { ChacaError } from "../../../errors";

export class FileName {
  private _value: string;

  constructor(name?: string) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new ChacaError("A file name is necesary to export the data");
    }

    this._value = name;
  }

  public value() {
    return this._value;
  }
}
