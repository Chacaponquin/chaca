export class SpaceIndex {
  private _value: number;
  private readonly _step: number;

  constructor(v?: number) {
    this._step = v ? v : 3;
    this._value = 0;
  }

  reverse(): void {
    this._value = this._value - this._step;
  }

  create(v: string): string {
    let space = "";

    for (let i = 0; i < this._value; i++) {
      space += " ";
    }

    return `${space}${v}`;
  }

  step() {
    return this._step;
  }

  push(): void {
    this._value = this._value + this._step;
  }
}
