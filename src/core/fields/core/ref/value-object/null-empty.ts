export class NullOnEmpty {
  private readonly _value: boolean;

  constructor(value?: boolean) {
    if (value) {
      this._value = true;
    } else {
      this._value = false;
    }
  }

  value() {
    return this._value;
  }
}
