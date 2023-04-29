export abstract class SQLType {
  private value: unknown;

  constructor(value: unknown) {
    this.value = value;
  }

  public abstract equal(otherType: SQLType): boolean;
}
