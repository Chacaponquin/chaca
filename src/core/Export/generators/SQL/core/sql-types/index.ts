import { ChacaError } from "../../../../../../errors";
import { ChacaUtils } from "../../../../../utils";
import { Datatype } from "../../../../core/datatype";
import { VariableName } from "../../../../core/names";
import { Parent } from "../../../../core/parent";
import { SpaceIndex } from "../../../../core/space-index";
import { SQLTables } from "../table/tables";

export abstract class SQLDatatype {
  abstract definition(): string;
  abstract string(): string;
  protected abstract similar(other: SQLDatatype): boolean;

  isSimilar(other: SQLDatatype): boolean {
    if (other instanceof SQLNull || this instanceof SQLNull) {
      return true;
    }

    return other.similar(this);
  }

  static create(
    utils: ChacaUtils,
    preventName: VariableName,
    parent: Parent,
    index: SpaceIndex,
    tables: SQLTables,
    value: any,
  ): SQLDatatype {
    const type = Datatype.filter<SQLDatatype>(value, {
      int(value) {
        return new SQLInteger(value);
      },
      float(value) {
        return new SQLFloat(value);
      },
      bigint(value) {
        return new SQLBigint(value);
      },
      boolean(value) {
        return new SQLBoolean(value);
      },
      date(value) {
        return new SQLDate(value);
      },
      function() {
        throw new ChacaError(``);
      },
      null() {
        return new SQLNull();
      },
      nan(value) {
        return new SQLFloat(value);
      },
      symbol() {
        throw new ChacaError(``);
      },
      string(value) {
        return new SQLVarchar(value);
      },
      regexp(value) {
        return new SQLText(String(value));
      },
      undefined() {
        return new SQLNull();
      },
      object(value) {
        const object = new SQLClass(preventName, parent, index);

        for (const [key, data] of Object.entries(value)) {
          const fieldName = new VariableName(utils, {
            name: key,
          });

          const newParent = Parent.create(parent, fieldName);

          const datatype = SQLDatatype.create(
            utils,
            fieldName,
            newParent,
            index,
            tables,
            data,
          );

          const field = new SQLClassField(fieldName, datatype);

          object.add(field);
        }

        tables.addClass(object);

        return object;
      },
      array(value) {
        const array = new SQLArray(parent);

        for (const v of value) {
          const sub = SQLDatatype.create(
            utils,
            preventName,
            parent,
            index,
            tables,
            v,
          );

          array.add(sub);
        }

        tables.addArray(array);

        return array;
      },
    });

    return type;
  }
}

export class SQLArray extends SQLDatatype {
  private values: SQLDatatype[];

  constructor(readonly parent: Parent) {
    super();

    this.values = [];
  }

  string(): string {
    return "";
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLArray;
  }

  definition(): string {
    return "";
  }

  add(field: SQLDatatype) {
    if (this.values.length === 0) {
      this.values.push(field);
    } else {
      const similar = field.isSimilar(this.values[0]);

      if (similar) {
        this.values.push(field);
      } else {
        throw new ChacaError(``);
      }
    }
  }
}

export class SQLBoolean extends SQLDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  definition(): string {
    return "BOOLEAN";
  }

  string(): string {
    return this.value ? "TRUE" : "FALSE";
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLBoolean;
  }
}

export class SQLDate extends SQLDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  definition(): string {
    return "DATE";
  }

  string(): string {
    return `'${this.value.toISOString().slice(0, 10)}'`;
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLDate;
  }
}

export class SQLNull extends SQLDatatype {
  constructor() {
    super();
  }

  definition(): string {
    return "NULL";
  }

  string(): string {
    return `NULL`;
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLNull;
  }
}

export abstract class SQLNumber extends SQLDatatype {
  protected value: number | bigint;

  constructor(value: number | bigint) {
    super();
    this.value = value;
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLNumber;
  }
}

export class SQLBigint extends SQLNumber {
  constructor(value: bigint) {
    super(value);
  }

  definition(): string {
    return "BIGINT";
  }

  string(): string {
    return `${this.value}`;
  }
}

export class SQLInteger extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  definition(): string {
    return "INTEGER";
  }

  string(): string {
    return `${this.value}`;
  }
}

export class SQLFloat extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  definition(): string {
    return "DOUBLE PRECISION";
  }

  string(): string {
    if (this.value === Infinity) {
      return "'+infinity'";
    } else if (this.value === -Infinity) {
      return "'-infinity'";
    } else if (Number.isNaN(this.value)) {
      return `'NaN'`;
    } else {
      return `${this.value}`;
    }
  }
}

export abstract class SQLString extends SQLDatatype {
  constructor(readonly value: string) {
    super();
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLString;
  }

  string(): string {
    let value = "";

    const json = JSON.stringify(this.value);
    for (let i = 0; i < json.length; i++) {
      if (i === 0) {
        value += `'`;
      } else if (i === json.length - 1) {
        value += `'`;
      } else {
        value += json[i];
      }
    }

    return value;
  }
}

export class SQLText extends SQLString {
  constructor(value: string) {
    super(value);
  }

  definition(): string {
    return "TEXT";
  }
}

export class SQLVarchar extends SQLString {
  constructor(value: string) {
    super(value);
  }

  definition(): string {
    return "VARCHAR(255)";
  }
}

export class SQLClass extends SQLDatatype {
  readonly fields: SQLClassField[];
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

  add(field: SQLClassField): void {
    this.fields.push(field);
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLClass;
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

  equal(other: SQLDatatype): boolean {
    if (other instanceof SQLClass) {
      return true;
    }

    return false;
  }

  definition(): string {
    return this.name();
  }
}

export class SQLClassField {
  readonly _name: VariableName;
  readonly datatype: SQLDatatype;

  constructor(name: VariableName, datatype: SQLDatatype) {
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
