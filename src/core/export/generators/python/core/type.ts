import { SpaceIndex } from "../../../core/space-index";
import { Imports } from "./import";
import { UnionDatatypes } from "./union";
import { SaveClassField, SavePythonClass } from "./classes";

export abstract class PythonDatatype {
  abstract string(index: SpaceIndex, imports: Imports): string;
  abstract declaration(imports: Imports): string;
  abstract equal(other: PythonDatatype): boolean;
}

export class PythonString extends PythonDatatype {
  constructor(private readonly value: string) {
    super();
  }

  string(): string {
    return `${JSON.stringify(this.value)}`;
  }

  declaration(): string {
    return "str";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonString;
  }
}

export class PythonFloat extends PythonDatatype {
  constructor(private readonly value: number) {
    super();
  }

  string(): string {
    if (this.value === Infinity) {
      return "float('inf')";
    } else if (this.value === -Infinity) {
      return "float('-inf')";
    } else if (Number.isNaN(this.value)) {
      return `float('nan')`;
    }

    return `${this.value}`;
  }

  declaration(): string {
    return "float";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonFloat;
  }
}

export class PythonInt extends PythonDatatype {
  constructor(private readonly value: number | bigint) {
    super();
  }

  string(): string {
    return `${this.value}`;
  }

  declaration(): string {
    return "int";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonInt;
  }
}

export class PythonBoolean extends PythonDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  string(): string {
    return this.value ? "True" : "False";
  }

  declaration(): string {
    return "bool";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonBoolean;
  }
}

export class PythonNone extends PythonDatatype {
  constructor() {
    super();
  }

  string(): string {
    return "None";
  }

  declaration() {
    return "None";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonNone;
  }
}

export class PythonDate extends PythonDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  string(_: SpaceIndex, imports: Imports): string {
    imports.add({ from: "datetime", modules: [] });

    return `datetime.datetime.fromisoformat("${this.value.toISOString()}")`;
  }

  declaration(imports: Imports): string {
    imports.add({ from: "datetime", modules: [] });

    return "datetime.datetime";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonDate;
  }
}

export class PythonClass extends PythonDatatype {
  readonly fields: PythonClassField[];
  readonly save: SavePythonClass;

  constructor(save: SavePythonClass) {
    super();

    this.fields = [];
    this.save = save;
  }

  name() {
    return this.save.name();
  }

  string(index: SpaceIndex, imports: Imports): string {
    if (this.fields.length === 0) {
      return `${this.name()}()`;
    }

    let code = `${this.name()}(\n`;

    index.push();

    const fields = this.fields
      .map((f) => index.create(`${f.name()}=${f.string(index, imports)}`))
      .join(",\n");

    code += fields + "\n";

    index.reverse();

    code += index.create(")");

    return code;
  }

  equal(other: PythonDatatype): boolean {
    if (other instanceof PythonClass) {
      return true;
    }

    return false;
  }

  declaration(): string {
    return this.name();
  }

  setField(field: PythonClassField): void {
    this.fields.push(field);
    this.save.setField(field);
  }
}

export class PythonArray extends PythonDatatype {
  private readonly datatypes: UnionDatatypes;
  private readonly values: PythonDatatype[];

  constructor() {
    super();

    this.values = [];
    this.datatypes = new UnionDatatypes();
  }

  setValue(d: PythonDatatype): void {
    this.datatypes.setDatatype(d);
    this.values.push(d);
  }

  declaration(imports: Imports): string {
    imports.add({ from: "typing", modules: ["List"] });

    const types = this.datatypes.declaration(imports);

    return `List[${types}]`;
  }

  string(index: SpaceIndex, imports: Imports): string {
    if (this.values.length === 0) {
      return `[]`;
    }

    let code = `[\n`;

    index.push();

    code +=
      this.values
        .map((d) => index.create(d.string(index, imports)))
        .join(",\n") + "\n";

    index.reverse();

    code += index.create("]");

    return code;
  }

  equal(other: PythonDatatype): boolean {
    if (other instanceof PythonArray) {
      return other.datatypes.equal(this.datatypes);
    }

    return false;
  }
}

export class PythonRegExp extends PythonDatatype {
  constructor(private readonly value: RegExp) {
    super();
  }

  string(_: SpaceIndex, imports: Imports): string {
    imports.add({ from: "re", modules: [] });

    return `re.compile(r'${this.value.source}')`;
  }

  declaration(imports: Imports): string {
    imports.add({ from: "re", modules: [] });

    return "re.Pattern";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonRegExp;
  }
}

export class PythonClassField {
  readonly save: SaveClassField;
  readonly datatype: PythonDatatype;

  constructor(save: SaveClassField, datatype: PythonDatatype) {
    this.datatype = datatype;
    this.save = save;
  }

  name(): string {
    return this.save.name();
  }

  string(index: SpaceIndex, imports: Imports) {
    return this.datatype.string(index, imports);
  }

  definition(imports: Imports): string {
    return this.datatype.declaration(imports);
  }
}
