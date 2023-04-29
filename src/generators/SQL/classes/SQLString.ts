import { SQLType } from "./SQLType.js";

export class SQLString extends SQLType {
  constructor(value: string) {
    super(value);
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLString;
  }
}
