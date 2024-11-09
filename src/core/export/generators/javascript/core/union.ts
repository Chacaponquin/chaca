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
    } else if (this.datatypes.length === 0) {
      return "any";
    } else {
      const types = this.datatypes.map((d) => d.definition()).join(" | ");

      return types;
    }
  }
}
