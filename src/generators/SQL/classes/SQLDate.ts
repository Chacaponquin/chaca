import { SQLType } from "./SQLType.js";

export class SQLDate extends SQLType {
  constructor(value: Date) {
    super(value);
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLDate;
  }
}
