export class InputValue {
  private _value: unknown;

  constructor(value: unknown) {
    if (value === undefined) {
      this._value = null;
    } else {
      this._value = value;
    }
  }

  public value() {
    return this._value;
  }
}
