import { SQLDatatype } from "../sql-types";
import { RowColumn } from "./row-column";

export class SQLRow {
  columns: RowColumn[];

  constructor() {
    this.columns = [];
  }

  add(column: RowColumn) {
    this.columns.push(column);
  }

  values(): SQLDatatype[] {
    return this.columns.map((c) => c.value());
  }
}
