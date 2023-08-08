import { ChacaError } from "../../../../errors/ChacaError.js";

export class SchemaName {
  private _value: string;

  constructor(name: string) {
    this._value = this.validate(name);
  }

  public value(): string {
    return this._value;
  }

  private validate(name: string): string {
    if (name && typeof name === "string" && name.trim() !== "") {
      return name;
    } else {
      throw new ChacaError("You must provide a name for the schema");
    }
  }
}
