import { PythonDatatype } from "./type";

export class UnionDatatypes {
  private datatypes: PythonDatatype[] = [];

  setDatatype(d: PythonDatatype) {
    this.datatypes.push(d);
  }

  declaration(): string {
    return "";
  }

  equal(union: UnionDatatypes): boolean {
    return true;
  }
}
