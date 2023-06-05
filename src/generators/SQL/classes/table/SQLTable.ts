import { PrivateUtils } from "../../../../core/helpers/PrivateUtils.js";
import { SQLType, SQLNumber, SQLIntegerNumber } from "../sqlTypes/index.js";
import { ColumnForeignKeyConfig, SQLTableColumn } from "./SQLTableColumn.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];

  constructor(public readonly tableName: string) {
    const idColumn = new SQLTableColumn(PrivateUtils.id());
    idColumn.changeToPrimaryKey();

    this.columns.push(idColumn);
  }

  public updateIdColumnName(): void {
    const newName = this.tableName + "_id";

    const foundSameName = this.columns.some(
      (c) => c.getColumnName() === newName,
    );

    if (foundSameName) {
      this.columns[0].changeColumnName(newName + "_1");
    } else {
      this.columns[0].changeColumnName(newName);
    }
  }

  public getColumns() {
    return this.columns;
  }

  public getLastID(): SQLNumber {
    return this.columns[0].getLastRow() as SQLNumber;
  }

  public findColumnByName(columnName: string): SQLTableColumn | null {
    return this.columns.find((c) => c.getColumnName() === columnName) || null;
  }

  public getTableMatrixData(): Array<Array<SQLType>> {
    const matrix = [] as Array<Array<SQLType>>;
    const rowCount = this.getTableLenght();

    for (let i = 0; i < rowCount; i++) {
      matrix.push(this.columns.map((c) => c.getValueByRowIndex(i)));
    }

    return matrix;
  }

  private addColumn(columnName: string) {
    this.columns.push(new SQLTableColumn(columnName));
  }

  public getTableLenght(): number {
    return this.columns[0].getColumnLenght();
  }

  public getPrimaryKeyColumn(): SQLTableColumn {
    return this.columns[0];
  }

  public changeColumnToForeignKey(
    columnName: string,
    config: ColumnForeignKeyConfig,
  ) {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.changeForeignKeyConfig(config);
    }
  }

  public addColumnValue(columnName: string, value: SQLType): void {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.insertValue(value);
    } else {
      this.addColumn(columnName);
      this.addColumnValue(columnName, value);
    }
  }

  public addNewID(): void {
    if (this.columns[0].getColumnLenght()) {
      const newID = new SQLIntegerNumber(this.getLastID().value + 1);
      this.columns[0].insertValue(newID);
    } else {
      const newID = new SQLIntegerNumber(1);
      this.columns[0].insertValue(newID);
    }
  }
}
