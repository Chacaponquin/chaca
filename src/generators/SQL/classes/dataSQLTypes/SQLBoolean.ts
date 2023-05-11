import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLBoolean extends SQLTypeWithDefinition {
  constructor(public readonly value: boolean) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLBoolean;
  }

  public getSQLValue(): string {
    if (this.value) {
      return "TRUE";
    } else {
      return "FALSE";
    }
  }
}
