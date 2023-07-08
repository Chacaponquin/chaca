import {
  SQLFloatNumber,
  SQLNull,
  SQLNumber,
  SQLString,
  SQLTextString,
  SQLType,
} from "../sqlTypes/index.js";
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
  private columnName: string;
  private rows: Array<SQLType> = [];
  private columnConfig: ColumnConfig = {
    isPrimaryKey: false,
    isForeignKey: false,
    posibleNull: false,
  };

  constructor(columnName: string) {
    this.columnName = columnName;
  }

  public getColumnName(): string {
    return this.columnName;
  }

  public changeColumnName(newColumnName: string): void {
    this.columnName = newColumnName;
  }

  public getSQLColumnName(): string {
    return this.columnName.toLowerCase().trim().replace(" ", "_");
  }

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

  public getColumnType(): SQLType {
    const notNullTypes = this.rows.filter((r) => !(r instanceof SQLNull));

    if (notNullTypes.length === 0) {
      return new SQLNull();
    } else {
      const firstType = notNullTypes[0];

      if (firstType instanceof SQLString) {
        const textTypes = notNullTypes.filter(
          (t) => t instanceof SQLTextString,
        );

        if (textTypes.length === 0) {
          return firstType;
        } else {
          return textTypes[0];
        }
      } else if (firstType instanceof SQLNumber) {
        const doublePrecisionTypes = notNullTypes.filter(
          (t) => t instanceof SQLFloatNumber,
        );

        if (doublePrecisionTypes.length === 0) {
          return firstType;
        } else {
          return doublePrecisionTypes[0];
        }
      } else {
        return firstType;
      }
    }
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
