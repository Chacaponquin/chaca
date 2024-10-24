export class Filename {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  value() {
    return this._name.trim();
  }
}
