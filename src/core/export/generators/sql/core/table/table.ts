import { ChacaUtils } from "../../../../../utils";
import { ColumnName, TableName } from "../generators/names";
import { SQLDatatype, SQLNull, SQLSerial } from "../sql-types";
import { SQLColumn } from "./column";
import { SQLRow } from "./row";
import { RowColumn } from "./row-column";

export class SQLTable {
  _name: TableName;
  readonly rows: SQLRow[];
  readonly autoGenerated: boolean;
  private _columns: SQLColumn[];
  private readonly utils: ChacaUtils;

  constructor(utils: ChacaUtils, name: TableName, autoGenerated: boolean) {
    this.utils = utils;
    this.rows = [];
    this._name = name;
    this.autoGenerated = autoGenerated;
    this._columns = [];
  }

  setName(n: TableName) {
    this._name = n;
  }

  notAutogeneratedColumns(): SQLColumn[] {
    return this._columns.filter((c) => !c.autoGenerated);
  }

  columns() {
    return this._columns;
  }

  keys(): SQLColumn[] {
    return this._columns.filter((k) => k.isKey());
  }

  autogeneratedColumns() {
    return this._columns.filter((c) => c.autoGenerated);
  }

  deleteAutogeneratedKeys() {
    const autoGenerateds = this.autogeneratedColumns().filter((c) => c.isKey());
    this._columns = this.notAutogeneratedColumns();

    for (const row of this.rows) {
      for (const auto of autoGenerateds) {
        row.deleteColumn(auto);
      }
    }
  }

  deleteColumn(column: SQLColumn) {
    this._columns = this._columns.filter((c) => c !== column);
  }

  get(column: SQLColumn, index: number): SQLDatatype {
    const row = this.rows[index];
    const found = row.columns().find((c) => c.column() === column);

    if (found) {
      return found.value();
    } else {
      return new SQLNull();
    }
  }

  find(search: string): SQLColumn | null {
    const name = new ColumnName(this.utils, search);
    const found = this._columns
      .filter((c) => !c.autoGenerated)
      .find((c) => c.equal(name));

    return found ? found : null;
  }

  length() {
    return this.rows.length;
  }

  equal(name: TableName): boolean {
    return this._name.equal(name);
  }

  name() {
    return this._name.value();
  }

  lastKeys(): RowColumn[] {
    const lastRow = this.rows.at(-1);

    if (lastRow) {
      const keys = this._columns.filter((c) => c.isKey());

      return lastRow.columns().filter((c) => keys.includes(c.column()));
    }

    return [];
  }

  addColumn(column: SQLColumn, auto: boolean): SQLColumn {
    const found = this._columns
      .filter((c) => {
        return auto ? c.autoGenerated : !c.autoGenerated;
      })
      .find((c) => c.equal(column._name));

    if (!found) {
      this._columns.push(column);

      return column;
    } else {
      return found;
    }
  }

  addSerial(row: SQLRow, generateId: boolean, hasKey: boolean) {
    if (generateId && !hasKey) {
      // add serial column
      const serialColumn = this.addColumn(
        new SQLColumn({
          isKey: true,
          isNull: false,
          autoGenerated: true,
          name: new ColumnName(this.utils, "id"),
          isUnique: true,
        }),
        true,
      );

      // add serial
      const serial = new RowColumn(this, {
        column: serialColumn,
        value: new SQLSerial(this.length()),
      });

      row.add(serial);
    }
  }

  addRow(row: SQLRow) {
    this.rows.push(row);
  }

  iterate(func: (values: SQLDatatype[]) => void): void {
    for (const row of this.rows) {
      const values = [] as SQLDatatype[];

      for (const column of this._columns) {
        const found = row.columns().find((c) => c.column() === column);

        if (found) {
          values.push(found.value());
        } else {
          values.push(new SQLNull());
        }
      }

      func(values);
    }
  }
}
