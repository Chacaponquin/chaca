import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { JavascriptClasses } from "./classes";
import { VariableName } from "../../../core/names";
import { SpaceIndex } from "../../../core/space-index";
import { UnionDatatypes } from "./union";
import { Parent } from "../../../core/parent";
import { Datatype } from "../../../core/datatype";

interface Props {
  preventName: VariableName;
  value: any;
}
export abstract class JavascriptDatatype {
  abstract string(): string;
  abstract definition(): string;
  abstract equal(other: JavascriptDatatype): boolean;

  static create(
    utils: ChacaUtils,
    index: SpaceIndex,
    parent: Parent,
    classes: JavascriptClasses,
    { preventName, value }: Props,
  ): JavascriptDatatype {
    const type = Datatype.filter(value, {
      string(value) {
        return new JavascriptString(value);
      },
      int(value) {
        return new JavascriptNumber(value);
      },
      float(value) {
        return new JavascriptNumber(value);
      },
      nan() {
        return new JavascriptNumber(value);
      },
      bigint(value) {
        return new JavascriptBignInt(value);
      },
      function() {
        throw new ChacaError(
          `You can not export a function to a javascript file.`,
        );
      },
      boolean(value) {
        return new JavascriptBoolean(value);
      },
      undefined() {
        return new JavascriptUndefined();
      },
      array(value) {
        const array = new JavascriptArray(index);

        for (const v of value) {
          const sub = JavascriptDatatype.create(utils, index, parent, classes, {
            value: v,
            preventName: preventName,
          });

          array.setValue(sub);
        }

        return array;
      },
      symbol() {
        throw new ChacaError(
          `You can not export a Symbol to a javascript file.`,
        );
      },
      null() {
        return new JavascriptNull();
      },
      date(value) {
        return new JavascriptDate(value);
      },
      regexp(value) {
        return new JavascriptRegExp(value);
      },
      object(value) {
        const object = new JavascriptClass(preventName, parent, index);

        for (const [key, data] of Object.entries(value)) {
          const fieldName = new VariableName(utils, {
            name: key,
          });

          const newParent = Parent.create(parent, fieldName);

          const datatype = JavascriptDatatype.create(
            utils,
            index,
            newParent,
            classes,
            {
              value: data,
              preventName: fieldName,
            },
          );

          const field = new JavascriptClassField(fieldName, datatype);

          object.setField(field);
        }

        classes.add(object);

        return object;
      },
    });

    return type;
  }
}

export class JavascriptClass extends JavascriptDatatype {
  readonly fields: JavascriptClassField[];
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
    let code = `{\n`;

    this.index.push();

    const fields = this.fields
      .map((f) => this.index.create(`${f.name()}: ${f.string()}`))
      .join(",\n");

    code += fields + "\n";

    this.index.reverse();

    code += this.index.create("}");

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

  setField(field: JavascriptClassField): void {
    this.fields.push(field);
  }
}

export class JavascriptClassField {
  readonly _name: VariableName;
  readonly datatype: JavascriptDatatype;

  constructor(name: VariableName, datatype: JavascriptDatatype) {
    this._name = name;
    this.datatype = datatype;
  }

  name(): string {
    return this._name.value("snake");
  }

  string() {
    return this.datatype.string();
  }

  definition(): string {
    return this.datatype.definition();
  }
}

export class JavascriptArray extends JavascriptDatatype {
  private readonly values: JavascriptDatatype[];
  private readonly datatypes: UnionDatatypes;

  constructor(private readonly index: SpaceIndex) {
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

  string(): string {
    let code = `[\n`;

    this.index.push();

    code +=
      this.values.map((d) => this.index.create(d.string())).join(",\n") + "\n";

    this.index.reverse();

    code += this.index.create("]");

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
    return this.value.toString();
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
