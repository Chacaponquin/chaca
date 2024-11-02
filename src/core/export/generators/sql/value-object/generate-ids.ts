export class GenerateIds {
  private readonly _value: boolean;

  constructor(v?: boolean) {
    if (v === undefined) {
      this._value = true;
    } else {
      this._value = Boolean(v);
    }
  }

  value() {
    return this._value;
  }
}
