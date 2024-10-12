import { ChacaError } from "../../../../../errors";
import { UnionDatatypes } from "./union";

interface CreateProps {
  value: any;
  preventName: string;
}

export abstract class PythonDatatype {
  abstract string(): string;
  abstract declaration(): string;
  abstract equal(other: PythonDatatype): boolean;

  static create({ value, preventName }: CreateProps): PythonDatatype {
    let type: PythonDatatype;

    if (typeof value === "string") {
      type = new PythonString(value);
    } else if (typeof value === "number") {
      if (Number.isInteger(value)) {
        type = new PythonInt(value);
      } else {
        type = new PythonFloat(value);
      }
    } else if (typeof value === "boolean") {
      type = new PythonBoolean(value);
    } else if (typeof value === "undefined") {
      type = new PythonNone();
    } else if (Array.isArray(value)) {
      const array = new PythonArray();

      for (const v of value) {
        const datatype = PythonDatatype.create({
          value: v,
          preventName: preventName,
        });

        array.setDatatype(datatype);
      }

      type = array;
    } else if (typeof value === "object") {
      if (value === null) {
        type = new PythonNone();
      } else if (value instanceof Date) {
        type = new PythonDate(value);
      } else if (value instanceof RegExp) {
        type = new PythonRegExp(value);
      } else {
        const object = new PythonClass(preventName);

        for (const [key, data] of Object.entries(value)) {
          const datatype = PythonDatatype.create({
            value: data,
            preventName: key,
          });

          const field = new PythonClassField(key, datatype);

          object.setField(field);
        }

        type = object;
      }
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function in a python file.`);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol in a python file.`);
    } else if (typeof value === "bigint") {
      type = new PythonInt(value);
    } else {
      type = new PythonString(String(value));
    }

    return type;
  }
}

export class PythonString extends PythonDatatype {
  constructor(private readonly value: string) {
    super();
  }

  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonFloat extends PythonDatatype {
  constructor(private readonly value: number) {
    super();
  }

  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonInt extends PythonDatatype {
  constructor(private readonly value: number | bigint) {
    super();
  }

  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonBoolean extends PythonDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonNone extends PythonDatatype {
  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonDate extends PythonDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  string(): string {
    return "";
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonClass extends PythonDatatype {
  private fields: PythonClassField[];
  private name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }

  string(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }

  declaration(): string {
    return "";
  }

  setField(field: PythonClassField): void {
    this.fields.push(field);
  }
}

export class PythonArray extends PythonDatatype {
  values: UnionDatatypes;

  setDatatype(d: PythonDatatype): void {
    this.values.setDatatype(d);
  }

  declaration(): string {
    return "";
  }

  string(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonRegExp extends PythonDatatype {
  constructor(private readonly value: RegExp) {
    super();
  }

  string(): string {
    return `re.compile(r'${this.value.source}')`;
  }

  declaration(): string {
    return "";
  }

  equal(other: PythonDatatype): boolean {
    return true;
  }
}

export class PythonClassField {
  name: string;
  datatypes: UnionDatatypes = new UnionDatatypes();

  constructor(name: string, datatype: PythonDatatype) {
    this.name = name;
    this.datatypes.setDatatype(datatype);
  }

  string(): string {
    return ``;
  }
}
