import { SQLTableColumn } from "./SQLTableColumn.js";
import { SQLPrimaryKeyDefinition } from "../definitionTypes/index.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];

  constructor(public readonly tableName: string) {}

  public insertColumn(column: SQLTableColumn) {
    this.columns.push(column);
  }

  public getColumns() {
    return this.columns;
  }

  public getColumnsData(): Array<Array<string>> {
    const data = [] as Array<Array<string>>;
    const MAX_CANT_DOCUMENTS = this.columns[0].getCantDocuments();

    for (let i = 0; i < MAX_CANT_DOCUMENTS; i++) {
      const saveRow = [] as Array<string>;

      this.columns.forEach((column) => {
        saveRow.push(column.getValueByIndex(i));
      });

      data.push(saveRow);
    }

    return data;
  }

  public getTablePrimaryKeyColumn(): SQLTableColumn {
    const foundPrimaryKeyColumn = this.columns.find(
      (c) => c.getColumnType() instanceof SQLPrimaryKeyDefinition,
    ) as SQLTableColumn;

    return foundPrimaryKeyColumn;
  }
}
