import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLNumber extends SQLType implements ISQLDefinition {
  constructor(public readonly value: number) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLNumber;
  }

  public getSQLDefinition(): string {
    return "NUMBER";
  }
}
