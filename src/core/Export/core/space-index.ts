export class SpaceIndex {
  private value: number;
  private readonly step: number;

  constructor(v: number) {
    this.step = v;
    this.value = 0;
  }

  reverse(): void {
    this.value = this.value - this.step;
  }

  create(v: string): string {
    let space = "";

    for (let i = 0; i < this.value; i++) {
      space += " ";
    }

    return `${space}${v}`;
  }

  push(): void {
    this.value = this.value + this.step;
  }
}
