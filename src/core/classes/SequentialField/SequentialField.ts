import { ChacaError } from "../../../errors/ChacaError.js";

export class SequentialField<K = any> {
  private valuesArray: Array<K>;

  constructor(valuesArray: Array<K>) {
    if (Array.isArray(valuesArray)) {
      this.valuesArray = valuesArray;
    } else {
      throw new ChacaError("The sequential field must be an array of fields");
    }
  }

  public getValuesArray() {
    return this.valuesArray;
  }
}
