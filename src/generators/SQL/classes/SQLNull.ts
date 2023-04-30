import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLNull extends SQLType implements ISQLDefinition {
  public readonly value = null;

  constructor() {
    super();
  }

  public getSQLDefinition(): string {
    return "NULL";
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLNull;
  }
}
