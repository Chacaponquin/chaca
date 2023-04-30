import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLDate extends SQLType implements ISQLDefinition {
  constructor(public readonly value: Date) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLDate;
  }

  public getSQLDefinition(): string {
    return "DATE";
  }
}
