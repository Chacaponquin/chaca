import { SQLDatatype } from "../sql-types";
import { SQLColumn } from "./column";
import { RowColumn } from "./row-column";

export class SQLRow {
  private _columns: RowColumn[];

  constructor() {
    this._columns = [];
  }

  add(column: RowColumn) {
    this._columns.push(column);
  }

  values(): SQLDatatype[] {
    return this._columns.map((c) => c.value());
  }

  columns() {
    return this._columns;
  }

  hasKey(): boolean {
    return this._columns.some((c) => c.column().isKey());
  }

  deleteColumn(column: SQLColumn) {
    this._columns = this._columns.filter((c) => c.column() === column);
  }
}
