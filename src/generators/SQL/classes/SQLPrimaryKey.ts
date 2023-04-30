import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLPrimaryKey extends SQLTypeWithDefinition {
  constructor(public readonly value: SQLTypeWithDefinition) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLPrimaryKey;
  }

  public getSQLDefinition(): string {
    return `${this.value.getSQLDefinition()} PRIMARY KEY`;
  }

  public getSQLValue(): string {
    return `${this.value.getSQLValue()}`;
  }
}
