import { SQLNull, SQLType } from "../sqlTypes/index.js";
import { SQLTable } from "./SQLTable.js";

interface ColumnConfig {
  isPrimaryKey: boolean;
  isForeignKey: false | ColumnForeignKeyConfig;
  posibleNull: boolean;
}

export interface ColumnForeignKeyConfig {
  table: SQLTable;
  column: SQLTableColumn;
}

export class SQLTableColumn {
  private rows: Array<SQLType> = [];
  private columnConfig: ColumnConfig = {
    isPrimaryKey: false,
    isForeignKey: false,
    posibleNull: false,
  };

  constructor(public readonly columnName: string) {}

  public insertValue(value: SQLType) {
    this.rows.push(value);

    if (value instanceof SQLNull) {
      this.columnConfig.posibleNull = true;
    }
  }

  public getRows() {
    return this.rows;
  }

  public getValueByRowIndex(index: number): SQLType {
    return this.rows[index];
  }

  public changeToPosibleNull(): void {
    this.columnConfig.posibleNull = true;
  }

  public isPrimaryKey() {
    return this.columnConfig.isPrimaryKey;
  }

  public isForeignKey() {
    return this.columnConfig.isForeignKey;
  }

  public posibleNull() {
    return this.columnConfig.posibleNull;
  }

  public changeForeignKeyConfig(config: ColumnForeignKeyConfig) {
    this.columnConfig.isForeignKey = config;
  }

  public getColumnType() {
    return this.rows[0];
  }

  public changeToPrimaryKey(): void {
    this.columnConfig.isPrimaryKey = true;
  }

  public getColumnLenght(): number {
    return this.rows.length;
  }

  public getLastRow() {
    return this.rows[this.rows.length - 1];
  }
}
