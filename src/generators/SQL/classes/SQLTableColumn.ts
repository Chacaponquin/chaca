import { SQLType } from "./SQLType.js";

export class SQLTableColumn {
  private values: Array<SQLType> = [];

  constructor(
    public readonly columnName: string,
    public readonly canBeNull: boolean,
  ) {}

  public insertValue(value: SQLType): void {
    this.values.push(value);
  }

  public insertAllValues(values: Array<SQLType>): void {
    values.forEach((v) => {
      this.insertValue(v);
    });
  }

  public getColumnType(): SQLType {
    return this.values[0];
  }

  public getRows() {
    return this.values;
  }
}
