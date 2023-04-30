export abstract class SQLType {
  public abstract equal(otherType: SQLType): boolean;
}
