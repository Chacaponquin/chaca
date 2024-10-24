import { Imports } from "./import";
import { PythonDatatype } from "./type";

export class UnionDatatypes {
  readonly datatypes: PythonDatatype[];

  constructor() {
    this.datatypes = [];
  }

  setDatatype(dat: PythonDatatype) {
    const exists = this.datatypes.some((d) => d.equal(dat));

    if (!exists) {
      this.datatypes.push(dat);
    }
  }

  length(): number {
    return this.datatypes.length;
  }

  declaration(imports: Imports): string {
    if (this.datatypes.length === 1) {
      const type = this.datatypes[0];

      return `${type.declaration(imports)}`;
    } else {
      imports.add({ from: "typing", modules: ["Union"] });

      const types = this.datatypes
        .map((d) => d.declaration(imports))
        .join(", ");

      return `Union[${types}]`;
    }
  }

  equal(union: UnionDatatypes): boolean {
    const [min, max] =
      union.length() >= this.length() ? [this, union] : [union, this];

    let equal = true;
    for (const datatype of min.datatypes) {
      const exist = max.datatypes.some((d) => d.equal(datatype));

      if (!exist) {
        equal = false;
        break;
      }
    }

    return equal;
  }
}
