export class ChanceValue {
  private _value: unknown;

  constructor(value: unknown) {
    this._value = value;
  }

  value() {
    return this._value;
  }
}
