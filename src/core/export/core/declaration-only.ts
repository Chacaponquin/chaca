export class DeclarationOnly {
  private readonly _value: boolean;

  constructor(v?: boolean) {
    this._value = Boolean(v);
  }

  value() {
    return this._value;
  }
}
