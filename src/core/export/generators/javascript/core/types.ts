import { SpaceIndex } from "../../../core/space-index";
import { UnionDatatypes } from "./union";
import { SaveClassField, SaveJavascriptClass } from "./classes";

export abstract class JavascriptDatatype {
  abstract string(index: SpaceIndex): string;
  abstract definition(): string;
  abstract equal(other: JavascriptDatatype): boolean;
}

export class JavascriptClass extends JavascriptDatatype {
  fields: JavascriptClassField[];
  readonly save: SaveJavascriptClass;

  constructor(save: SaveJavascriptClass) {
    super();

    this.save = save;
    this.fields = [];
  }

  name() {
    return this.save.name();
  }

  string(index: SpaceIndex): string {
    if (this.fields.length === 0) {
      return `{}`;
    }

    let code = `{\n`;

    index.push();

    const fields = this.fields
      .map((f) => index.create(`${f.name()}: ${f.string(index)}`))
      .join(",\n");

    code += fields + "\n";

    index.reverse();

    code += index.create("}");

    return code;
  }

  equal(other: JavascriptDatatype): boolean {
    if (other instanceof JavascriptClass) {
      return true;
    }

    return false;
  }

  definition(): string {
    return this.name();
  }

  setFields(fields: JavascriptClassField[]): void {
    this.fields = fields;
    this.save.setFields(fields);
  }
}

export class JavascriptClassField {
  readonly save: SaveClassField;
  readonly datatype: JavascriptDatatype;

  constructor(save: SaveClassField, datatype: JavascriptDatatype) {
    this.save = save;
    this.datatype = datatype;
  }

  name(): string {
    return this.save.name();
  }

  string(index: SpaceIndex) {
    return this.datatype.string(index);
  }

  definition(): string {
    return this.datatype.definition();
  }
}

export class JavascriptArray extends JavascriptDatatype {
  private readonly values: JavascriptDatatype[];
  private readonly datatypes: UnionDatatypes;

  constructor() {
    super();

    this.datatypes = new UnionDatatypes();
    this.values = [];
  }

  definition(): string {
    const types = this.datatypes.declaration();

    return `Array<${types}>`;
  }

  setValue(v: JavascriptDatatype): void {
    this.datatypes.setDatatype(v);
    this.values.push(v);
  }

  string(index: SpaceIndex): string {
    if (this.values.length === 0) {
      return `[]`;
    }

    let code = `[\n`;

    index.push();

    code +=
      this.values
        .map((d) => {
          return index.create(d.string(index));
        })
        .join(",\n") + "\n";

    index.reverse();

    code += index.create("]");

    return code;
  }

  equal(other: JavascriptDatatype): boolean {
    if (other instanceof JavascriptArray) {
      return true;
    }

    return false;
  }
}

export class JavascriptBoolean extends JavascriptDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptBoolean;
  }

  definition(): string {
    return "boolean";
  }

  string(): string {
    return this.value ? "true" : "false";
  }
}

export class JavascriptRegExp extends JavascriptDatatype {
  constructor(private readonly value: RegExp) {
    super();
  }

  definition(): string {
    return "RegExp";
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptRegExp;
  }

  string(): string {
    return `/${this.value.source}/${this.value.flags}`;
  }
}

export class JavascriptNull extends JavascriptDatatype {
  constructor() {
    super();
  }

  string(): string {
    return "null";
  }

  definition(): string {
    return "null";
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptNull;
  }
}

export class JavascriptUndefined extends JavascriptDatatype {
  constructor() {
    super();
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptUndefined;
  }

  definition(): string {
    return "undefined";
  }

  string(): string {
    return "undefined";
  }
}

export class JavascriptBignInt extends JavascriptDatatype {
  constructor(private readonly value: bigint) {
    super();
  }

  definition(): string {
    return "bigint";
  }

  string(): string {
    return `${this.value}n`;
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptBignInt;
  }
}

export class JavascriptNumber extends JavascriptDatatype {
  constructor(private readonly value: number) {
    super();
  }

  definition(): string {
    return "number";
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptNumber;
  }

  string(): string {
    return this.value.toString();
  }
}

export class JavascriptDate extends JavascriptDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  definition(): string {
    return "Date";
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptDate;
  }

  string(): string {
    return `new Date("${this.value.toISOString()}")`;
  }
}

export class JavascriptString extends JavascriptDatatype {
  constructor(private readonly value: string) {
    super();
  }

  definition(): string {
    return "string";
  }

  equal(other: JavascriptDatatype): boolean {
    return other instanceof JavascriptString;
  }

  string(): string {
    return `${JSON.stringify(this.value)}`;
  }
}
