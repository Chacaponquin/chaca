export class SkipInvalid {
  private _value: boolean;

  constructor(value?: boolean) {
    this._value = Boolean(value);
  }

  value() {
    return this._value;
  }
}
