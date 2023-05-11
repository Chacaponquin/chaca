import { SQLTableColumn } from "./SQLTableColumn.js";
import { ColumnVariation } from "../../interfaces/sqlTable.interface.js";
import { SQLPrimaryKey } from "../dataSQLTypes/SQLPrimaryKey.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];

  constructor(public readonly tableName: string) {}

  public insertColumn(column: SQLTableColumn) {
    this.columns.push(column);
  }

  public getColumns() {
    return this.columns;
  }

  public changeColumnsTypes(variation: Array<ColumnVariation>) {
    variation.forEach((v) => {
      const foundColumn = this.columns.find((c) => c.columnName === v.key);

      if (foundColumn) {
        foundColumn.changeColumnByVariation(v);
      }
    });
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

  public getTablePrimaryKey() {
    return this.columns.find(
      (c) => c.getColumnType() instanceof SQLPrimaryKey,
    ) as SQLTableColumn;
  }
}
