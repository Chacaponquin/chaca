import { ChacaError } from "../../../../errors/ChacaError.js";
import { SQLType, SQLNumber } from "../sqlTypes/index.js";
import { ColumnForeignKeyConfig, SQLTableColumn } from "./SQLTableColumn.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];

  constructor(public readonly tableName: string) {}

  public getColumns() {
    return this.columns;
  }

  public getLastID(): SQLNumber {
    return new SQLNumber(this.getTableLenght());
  }

  private addColumn(columnName: string) {
    this.columns.push(new SQLTableColumn(columnName));
  }

  public getTableLenght(): number {
    return this.columns[0].getColumnLenght();
  }

  public concatColumns(otherTable: SQLTable): void {
    for (const column of this.columns) {
      const foundColumn = otherTable.columns.find(
        (c) => c.columnName === column.columnName,
      );

      if (foundColumn) {
        column.concatValues(foundColumn);
      } else {
        throw new ChacaError(
          `The column ${column.columnName} does not exists on all objects.`,
        );
      }
    }
  }

  public changeColumnToForeignKey(
    columnName: string,
    config: ColumnForeignKeyConfig,
  ) {
    const foundColumn = this.columns.find((c) => c.columnName === columnName);

    if (foundColumn) {
      foundColumn.changeForeignKeyConfig(config);
    }
  }

  public addColumnValue(columnName: string, value: SQLType): void {
    const foundColumn = this.columns.find((c) => c.columnName === columnName);

    if (foundColumn) {
      foundColumn.insertValue(value);
    } else {
      this.addColumn(columnName);
      this.addColumnValue(columnName, value);
    }
  }
}