import { ChacaError } from "../../../errors";

export class Location {
  private _value: string;

  constructor(location?: string) {
    if (typeof location !== "string") {
      throw new ChacaError("The file needs a location for exportation");
    }

    this._value = location;
  }

  public value() {
    return this._value;
  }
}
