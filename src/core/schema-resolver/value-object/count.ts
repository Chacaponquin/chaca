import { ChacaError } from "../../../errors";

export class CountDoc {
  private _value: number;

  constructor(limit: number) {
    this._value = this.validate(limit);
  }

  value(): number {
    return this._value;
  }

  private validate(count: number): number {
    if (typeof count === "number") {
      if (count >= 0) {
        return count;
      }

      throw new ChacaError(
        `You can not generate a negative number of documents`,
      );
    } else {
      throw new ChacaError(
        `You have to specify a number of documents to create`,
      );
    }
  }
}
