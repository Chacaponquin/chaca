import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLString extends SQLTypeWithDefinition {
  constructor(public readonly value: string) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLString;
  }

  public getSQLValue(): string {
    return `'${this.value}'`;
  }
}
