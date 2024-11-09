export class Package {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = typeof value === "string" ? value : "chaca.data";
  }

  string() {
    return `package ${this._value};\n\n`;
  }
}
