import { SQLType } from "./SQLType.js";

export class SQLBoolean extends SQLType {
  constructor(value: boolean) {
    super(value);
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLBoolean;
  }
}
