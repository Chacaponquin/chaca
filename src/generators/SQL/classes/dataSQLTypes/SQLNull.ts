import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLNull extends SQLTypeWithDefinition {
  public readonly value = null;

  constructor() {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLNull;
  }

  public getSQLValue(): string {
    return `NULL`;
  }
}
