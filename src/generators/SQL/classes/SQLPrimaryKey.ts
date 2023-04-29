import { SQLType } from "./SQLType.js";

export class SQLPrimaryKey extends SQLType {
  constructor(value: string | number) {
    super(value);
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLPrimaryKey;
  }
}
