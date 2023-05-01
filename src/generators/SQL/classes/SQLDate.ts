import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLDate extends SQLTypeWithDefinition {
  constructor(public readonly value: Date) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLDate;
  }

  public getSQLDefinition(): string {
    return "DATE";
  }

  public getSQLValue(): string {
    return `'${this.value.toISOString().slice(0, 10)}'`;
  }
}
