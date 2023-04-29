import { SQLPrimaryKey } from "./SQLPrimaryKey.js";
import { SQLTableColumn } from "./SQLTableColumn.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];

  constructor(public readonly tableName: string) {}

  public insertColumn(field: SQLTableColumn) {
    this.columns.push(field);
  }

  public getTablePrimaryKey(): SQLTableColumn {
    return this.columns.find(
      (f) => f.getColumnType() instanceof SQLPrimaryKey,
    ) as SQLTableColumn;
  }
}
