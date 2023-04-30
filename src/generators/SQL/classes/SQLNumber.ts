import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLNumber extends SQLTypeWithDefinition {
  constructor(public readonly value: number) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLNumber;
  }

  public getSQLDefinition(): string {
    return "NUMBER";
  }

  public getSQLValue(): string {
    return `${this.value}`;
  }
}
