import { SQLDatatype } from "../sql-types";
import { SQLColumn } from "./column";
import { SQLTable } from "./table";

interface Props {
  column: SQLColumn;
  value: SQLDatatype;
}

export class RowColumn {
  private readonly _column: SQLColumn;
  private readonly _value: SQLDatatype;

  constructor(table: SQLTable, { column, value }: Props) {
    this._column = column;
    this._value = value;

    this._column.setDatatype(table, this._value);
  }

  column() {
    return this._column;
  }

  refValue() {
    return this._value.refValue();
  }

  value() {
    return this._value;
  }
}
