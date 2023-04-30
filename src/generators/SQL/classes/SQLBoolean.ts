import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLBoolean extends SQLType implements ISQLDefinition {
  constructor(public readonly value: boolean) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLBoolean;
  }

  public getSQLDefinition(): string {
    return "BOOLEAN";
  }
}
