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

  public changeForeignKeyConfig(config: ColumnForeignKeyConfig) {
    this.columnConfig.isForeignKey = config;
  }

  public getColumnType() {
    return this.rows[0];
  }

  public getConfig() {
    return this.columnConfig;
  }

  public concatValues(otherColumn: SQLTableColumn): void {
    for (const v of otherColumn.rows) {
      this.rows.push(v);
    }
  }

  public getColumnLenght(): number {
    return this.rows.length;
  }
}
