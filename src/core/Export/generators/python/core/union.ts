import { Imports } from "./import";
import { PythonDatatype } from "./type";

export class UnionDatatypes {
  readonly datatypes: PythonDatatype[];

  constructor(imports: Imports) {
    this.datatypes = [];

    imports.add({ from: "typing", modules: ["Union"] });
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

  declaration(): string {
    if (this.datatypes.length === 1) {
      const type = this.datatypes[0];

      return `${type.declaration()}`;
    } else {
      const types = this.datatypes.map((d) => d.declaration()).join(", ");

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
