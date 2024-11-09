export class Unique {
  private readonly unique: boolean;

  constructor(value?: boolean) {
    if (value) {
      this.unique = true;
    } else {
      this.unique = false;
    }
  }

  value() {
    return this.unique;
  }
}
