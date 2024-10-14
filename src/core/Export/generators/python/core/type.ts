import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { VariableName } from "../../../core/names";
import { SpaceIndex } from "../../../core/space-index";
import { PythonClasses } from "./classes";
import { Imports } from "./import";
import { Parent } from "../../../core/parent";
import { UnionDatatypes } from "./union";
import { Datatype } from "../../../core/datatype";

interface CreateProps {
  value: any;
  preventName: VariableName;
}

export abstract class PythonDatatype {
  abstract string(): string;
  abstract declaration(): string;
  abstract equal(other: PythonDatatype): boolean;

  static create(
    utils: ChacaUtils,
    imports: Imports,
    parent: Parent,
    classes: PythonClasses,
    index: SpaceIndex,
    { value, preventName }: CreateProps,
  ): PythonDatatype {
    const type = Datatype.filter(value, {
      string(value) {
        return new PythonString(value);
      },
      int(value) {
        return new PythonInt(value);
      },
      float(value) {
        return new PythonFloat(value);
      },
      nan(value) {
        return new PythonFloat(value);
      },
      undefined() {
        return new PythonNone(imports);
      },
      boolean(value) {
        return new PythonBoolean(value);
      },
      array(value) {
        const array = new PythonArray(imports, index);

        for (const v of value) {
          const datatype = PythonDatatype.create(
            utils,
            imports,
            parent,
            classes,
            index,
            {
              value: v,
              preventName: preventName,
            },
          );

          array.setValue(datatype);
        }

        return array;
      },
      null() {
        return new PythonNone(imports);
      },
      date(value) {
        return new PythonDate(imports, value);
      },
      regexp(value) {
        return new PythonRegExp(imports, value);
      },
      object(value) {
        const object = new PythonClass(preventName, parent, index);

        for (const [key, data] of Object.entries(value)) {
          const fieldName = new VariableName(utils, {
            name: key,
          });

          const newParent = Parent.create(parent, fieldName);

          const datatype = PythonDatatype.create(
            utils,
            imports,
            newParent,
            classes,
            index,
            {
              value: data,
              preventName: fieldName,
            },
          );

          const field = new PythonClassField(fieldName, datatype);

          object.setField(field);
        }

        classes.add(object);

        return object;
      },
      bigint(value) {
        return new PythonInt(value);
      },
      function() {
        throw new ChacaError(`You can not export a function in a python file.`);
      },
      symbol() {
        throw new ChacaError(`You can not export a Symbol in a python file.`);
      },
    });

    return type;
  }
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
  constructor(imports: Imports) {
    super();

    imports.add({ from: "typing", modules: ["Optional"] });
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
  constructor(private readonly imports: Imports, private readonly value: Date) {
    super();

    this.imports.add({ from: "datetime", modules: [] });
  }

  string(): string {
    return `datetime.datetime.fromisoformat("${this.value.toISOString()}")`;
  }

  declaration(): string {
    return "datetime.datetime";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonDate;
  }
}

export class PythonClass extends PythonDatatype {
  readonly fields: PythonClassField[];
  readonly _name: VariableName;
  readonly parent: Parent;

  constructor(
    name: VariableName,
    parent: Parent,
    private readonly index: SpaceIndex,
  ) {
    super();

    this._name = name;
    this.fields = [];
    this.parent = parent;
  }

  name() {
    return this._name.value("camel");
  }

  string(): string {
    let code = `${this.name()}(\n`;

    this.index.push();

    const fields = this.fields
      .map((f) => this.index.create(`${f.name()}=${f.string()}`))
      .join(",\n");

    code += fields + "\n";

    this.index.reverse();

    code += this.index.create(")");

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
  }
}

export class PythonArray extends PythonDatatype {
  private readonly datatypes: UnionDatatypes;
  private readonly values: PythonDatatype[];

  constructor(imports: Imports, private readonly index: SpaceIndex) {
    super();

    this.values = [];
    this.datatypes = new UnionDatatypes(imports);

    imports.add({ from: "typing", modules: ["List"] });
  }

  setValue(d: PythonDatatype): void {
    this.datatypes.setDatatype(d);
    this.values.push(d);
  }

  declaration(): string {
    const types = this.datatypes.declaration();

    return `List[${types}]`;
  }

  string(): string {
    let code = `[\n`;

    this.index.push();

    code +=
      this.values.map((d) => this.index.create(d.string())).join(",\n") + "\n";

    this.index.reverse();

    code += this.index.create("]");

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
  constructor(
    private readonly imports: Imports,
    private readonly value: RegExp,
  ) {
    super();

    this.imports.add({ from: "re", modules: [] });
  }

  string(): string {
    return `re.compile(r'${this.value.source}')`;
  }

  declaration(): string {
    return "re.Pattern";
  }

  equal(other: PythonDatatype): boolean {
    return other instanceof PythonRegExp;
  }
}

export class PythonClassField {
  readonly _name: VariableName;
  readonly datatype: PythonDatatype;

  constructor(name: VariableName, datatype: PythonDatatype) {
    this._name = name;
    this.datatype = datatype;
  }

  name(): string {
    return this._name.value("snake");
  }

  string() {
    return this.datatype.string();
  }

  definition(): string | null {
    return this.datatype.declaration();
  }
}
