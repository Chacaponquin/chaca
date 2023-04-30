import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";

export class SQLForengKey extends SQLTypeWithDefinition {
  constructor(
    public readonly value: SQLTypeWithDefinition,
    public readonly refersTo: string,
  ) {
    super();
  }

  public equal(otherType: SQLType): boolean {
    return otherType instanceof SQLForengKey;
  }

  public getSQLDefinition(): string {
    return "FOREING KEY";
  }

  public getSQLValue(): string {
    return `${this.value.getSQLValue()}`;
  }
}
