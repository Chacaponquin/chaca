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
    const year = this.value.getFullYear();
    const day = this.value.getDay();
    const month = this.value.getMonth();

    return `'${year}-${month}-${day}'`;
  }
}
