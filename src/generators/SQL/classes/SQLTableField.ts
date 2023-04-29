import { SQLType } from "./SQLType.js";

export class SQLTableField {
  private values: Array<SQLType> = [];

  constructor(
    public readonly type: SQLType,
    public readonly canBeNull: boolean,
  ) {}

  public insertValue(value: SQLType): void {
    this.values.push(value);
  }
}
