import { ChacaError } from "../../../errors/ChacaError.js";

export class CountDoc {
  private _value: number;

  constructor(limit: number) {
    this._value = this.validate(limit);
  }

  public value(): number {
    return this._value;
  }

  private validate(cantDocuments: number): number {
    let numberCant = 10;

    if (typeof cantDocuments === "number") {
      if (cantDocuments >= 0) {
        numberCant = cantDocuments;
      } else if (cantDocuments < 0) {
        throw new ChacaError(
          `You can not generate a negative number of documents`,
        );
      }
    } else {
      throw new ChacaError(
        `You have to specify a number of documents to create`,
      );
    }

    return numberCant;
  }
}
