import { JavascriptDatatype } from "./types";

export class UnionDatatypes {
  readonly datatypes: JavascriptDatatype[];

  constructor() {
    this.datatypes = [];
  }

  setDatatype(dat: JavascriptDatatype) {
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

      return `${type.definition()}`;
    } else {
      const types = this.datatypes.map((d) => d.definition()).join(" | ");

      return types;
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
