export class SkipInvalid {
  private _value: boolean;

  constructor(value: boolean | undefined) {
    this._value = Boolean(value);
  }

  value() {
    return this._value;
  }
}
