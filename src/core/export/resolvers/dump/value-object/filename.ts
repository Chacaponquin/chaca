export class ExtensionFilename {
  private readonly _value: string;

  constructor(name: string, ext: string) {
    this._value = `${name}.${ext}`;
  }

  value() {
    return this._value;
  }
}
