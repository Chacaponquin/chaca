import { ChacaError } from "../../../errors";

export class SchemaName {
  private _value: string;

  constructor(name: string, private readonly index: number) {
    this._value = this.validate(name);
  }

  value(): string {
    return this._value;
  }

  private validate(name: string): string {
    if (typeof name === "string" && name.trim() !== "") {
      return name;
    } else {
      throw new ChacaError(
        `You must provide a name for the schema on index ${this.index}`,
      );
    }
  }
}
