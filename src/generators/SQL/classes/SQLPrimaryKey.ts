import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLPrimaryKey extends SQLType implements ISQLDefinition {
  constructor(public readonly value: string | number) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLPrimaryKey;
  }

  public getSQLDefinition(): string {
    return "PRIMARY KEY";
  }
}
