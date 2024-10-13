export class SpaceIndex {
  private value: number;

  constructor() {
    this.value = 0;
  }

  static create(p: SpaceIndex): SpaceIndex {
    const newIndex = new SpaceIndex();

    newIndex.value = p.value;

    return newIndex;
  }

  create(v: string): string {
    let space = "";

    for (let i = 0; i < this.value; i++) {
      space += " ";
    }

    return `${space}${v}`;
  }

  change(n: number): void {
    this.value = this.value + n;
  }
}
