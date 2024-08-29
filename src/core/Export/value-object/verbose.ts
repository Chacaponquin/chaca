export class Verbose {
  private _value = false;

  constructor(verbose?: boolean) {
    if (typeof verbose === "boolean") {
      this._value = verbose;
    }
  }

  value() {
    return this._value;
  }
}
