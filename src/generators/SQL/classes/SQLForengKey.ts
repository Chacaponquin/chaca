import { ISQLDefinition } from "../interfaces/sqlDefinition.interface.js";
import { SQLType } from "./SQLType.js";

export class SQLForengKey extends SQLType implements ISQLDefinition {
  constructor(public readonly value: string | number) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLForengKey;
  }

  public getSQLDefinition(): string {
    return "FOREING KEY";
  }
}
