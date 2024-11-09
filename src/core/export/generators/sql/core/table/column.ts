import { ChacaError } from "../../../../../../errors";
import { ColumnName } from "../generators/names";
import { SQLDatatype, SQLNull } from "../sql-types";
import { SQLTable } from "./table";

interface Props {
  isKey: boolean;
  isNull: boolean;
  isUnique: boolean;
  name: ColumnName;
  autoGenerated: boolean;
}

export interface RefTable {
  table: SQLTable;
  column: SQLColumn;
}

export class SQLColumn {
  readonly autoGenerated: boolean;
  _name: ColumnName;
  private _datatype: SQLDatatype;
  private _isKey: boolean;
  private _isNull: boolean;
  private _unique: boolean;
  private _ref: RefTable | null;
  private _disabled: boolean;

  constructor({ autoGenerated, isKey, isNull, name, isUnique }: Props) {
    this._name = name;
    this._datatype = new SQLNull();
    this._isKey = isKey;
    this._isNull = isNull;
    this._unique = isUnique;
    this._ref = null;
    this.autoGenerated = autoGenerated;
    this._disabled = false;
  }

  setName(name: ColumnName) {
    this._name = name;
  }

  setUnique(v: boolean) {
    this._unique = v;
  }

  setDisabled() {
    this._disabled = true;
  }

  disabled() {
    return this._disabled;
  }

  isUnique() {
    return this._unique;
  }

  isNull() {
    return this._isNull;
  }

  isKey() {
    return this._isKey;
  }

  datatype() {
    return this._datatype;
  }

  setRef(ref: RefTable): void {
    this._ref = ref;
  }

  ref() {
    return this._ref;
  }

  unique() {
    return this._unique;
  }

  equal(other: ColumnName) {
    return this._name.equal(other);
  }

  setIsKey(v: boolean): void {
    this._isKey = v;
  }

  setIsNull(value: boolean) {
    this._isNull = value;
  }

  definition(): string {
    return `${this._datatype.definition()}`;
  }

  name() {
    return this._name.value();
  }

  setDatatype(table: SQLTable, v: SQLDatatype): void {
    if (v.isSimilar(this._datatype)) {
      this._datatype = this._datatype.greater(v);

      if (v instanceof SQLNull) {
        this._isNull = true;
      }
    } else {
      const route = `${table.name()}.${this.name()}`;
      const type1 = v.primitive();
      const type2 = this._datatype.primitive();

      throw new ChacaError(
        `The values for column '${route}' exist as values of type ${type1} and ${type2}. The data must be uniform`,
      );
    }
  }

  similar(other: SQLColumn): boolean {
    return other._datatype.isSimilar(this._datatype);
  }
}
