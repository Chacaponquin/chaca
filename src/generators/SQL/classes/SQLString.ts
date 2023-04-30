import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLString extends SQLType implements ISQLDefinition {
  constructor(public readonly value: string) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLString;
  }

  public getSQLDefinition(): string {
    return "VARCHAR";
  }
}
