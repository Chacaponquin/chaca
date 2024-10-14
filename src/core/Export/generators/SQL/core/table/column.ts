import { VariableName } from "../../../../core/names";
import { SQLDatatype } from "../sql-types";

export class SQLColumn {
  private _name: VariableName;
  private datatype: SQLDatatype;

  constructor(name: VariableName, datatype: SQLDatatype) {
    this._name = name;
    this.datatype = datatype;
  }

  definition(): string {
    return this.datatype.definition();
  }

  name() {
    return this._name.value("snake");
  }

  setDatatype(dat: SQLDatatype): void {
    this.datatype = dat;
  }

  merge(other: SQLColumn): void {
    this.datatype = other.datatype;
  }

  similar(other: SQLColumn): boolean {
    return other.datatype.isSimilar(this.datatype);
  }
}
