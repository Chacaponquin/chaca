import { SQLType } from "./SQLType.js";

export class SQLNull extends SQLType {
  constructor() {
    super(null);
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLNull;
  }
}
