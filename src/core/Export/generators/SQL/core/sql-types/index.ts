import { ChacaError } from "../../../../../../errors";
import { ChacaUtils } from "../../../../../utils";
import { Datatype } from "../../../../core/datatype";
import { TablesFixer } from "../generators/fixer";
import {
  ArrayTableName,
  ColumnName,
  ObjectTableName,
} from "../generators/names";
import { SQLColumn } from "../table/column";
import { SQLRow } from "../table/row";
import { SQLTable } from "../table/table";
import { SQLTables } from "../table/tables";

export interface RefTable {
  table: SQLTable;
  column: SQLColumn;
}

export abstract class SQLDatatype {
  abstract definition(): string;
  abstract string(): string;
  protected abstract greaterThan(other: SQLDatatype): boolean;
  protected abstract similar(other: SQLDatatype): boolean;
  abstract refValue(): SQLDatatype;

  private _ref: RefTable | null;

  constructor() {
    this._ref = null;
  }

  ref() {
    return this._ref;
  }

  setRef(ref: RefTable) {
    this._ref = ref;
  }

  isSimilar(other: SQLDatatype): boolean {
    if (other instanceof SQLNull || this instanceof SQLNull) {
      return true;
    }

    return other.similar(this);
  }

  isGreaterThan(other: SQLDatatype): boolean {
    if (other instanceof SQLNull) {
      return true;
    }

    return this.greaterThan(other);
  }
}

export class SQLBoolean extends SQLDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  greaterThan(): boolean {
    return false;
  }

  definition(): string {
    return "BOOLEAN";
  }

  refValue(): SQLDatatype {
    return this;
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

  refValue(): SQLDatatype {
    return this;
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

  greaterThan(): boolean {
    return false;
  }
}

export class SQLNull extends SQLDatatype {
  constructor() {
    super();
  }

  refValue(): SQLDatatype {
    return this;
  }

  definition(): string {
    return "NULL";
  }

  string(): string {
    return `NULL`;
  }

  greaterThan(): boolean {
    return false;
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

  refValue(): SQLDatatype {
    return this;
  }

  definition(): string {
    return "BIGINT";
  }

  greaterThan(other: SQLDatatype): boolean {
    if (other instanceof SQLNumber) {
      return true;
    }

    return false;
  }

  string(): string {
    return `${this.value}`;
  }
}

export class SQLInteger extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  refValue(): SQLDatatype {
    return this;
  }

  greaterThan(): boolean {
    return false;
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

  refValue(): SQLDatatype {
    return this;
  }

  greaterThan(other: SQLDatatype): boolean {
    if (other instanceof SQLInteger) {
      return true;
    }

    return false;
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

  refValue(): SQLDatatype {
    return this;
  }

  definition(): string {
    return "TEXT";
  }

  greaterThan(other: SQLDatatype): boolean {
    if (other instanceof SQLString) {
      return true;
    }

    return false;
  }
}

export class SQLVarchar extends SQLString {
  constructor(value: string) {
    super(value);
  }

  definition(): string {
    return "VARCHAR(255)";
  }

  refValue(): SQLDatatype {
    return this;
  }

  greaterThan(): boolean {
    return false;
  }
}

export class SQLSerial extends SQLNumber {
  constructor(v: number) {
    super(v);
  }

  refValue(): SQLDatatype {
    return new SQLInteger(Number(this.value));
  }

  string(): string {
    return `${this.value}`;
  }

  definition(): string {
    return "SERIAL";
  }

  greaterThan(): boolean {
    return false;
  }
}

interface Props {
  parent: SQLTable;
  table: SQLTable | null;
  name: string;
  value: any;
}

export class ValueCreator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly fixer: TablesFixer,
    private readonly tables: SQLTables,
  ) {}

  execute({ name, parent, table, value }: Props): SQLDatatype[] {
    const type = Datatype.filter<SQLDatatype[]>(value, {
      int(value) {
        return [new SQLInteger(value)];
      },
      float(value) {
        return [new SQLFloat(value)];
      },
      bigint(value) {
        return [new SQLBigint(value)];
      },
      boolean(value) {
        return [new SQLBoolean(value)];
      },
      date(value) {
        return [new SQLDate(value)];
      },
      function() {
        throw new ChacaError(`hola`);
      },
      null() {
        return [new SQLNull()];
      },
      nan(value) {
        return [new SQLFloat(value)];
      },
      symbol() {
        throw new ChacaError(`hola`);
      },
      string(value) {
        if (value.length < 255) {
          return [new SQLVarchar(value)];
        }

        return [new SQLText(value)];
      },
      regexp(value) {
        return [new SQLText(String(value))];
      },
      undefined() {
        return [new SQLNull()];
      },
      object: (value) => {
        const tableName = new ObjectTableName(this.utils, name);
        const objectTable = table
          ? table
          : new SQLTable(this.utils, tableName, false);

        const row = new SQLRow();

        for (const [key, data] of Object.entries(value)) {
          const datatypes = this.execute({
            name: key,
            parent: objectTable,
            table: null,
            value: data,
          });

          for (let i = 0; i < datatypes.length; i++) {
            const columnName = new ColumnName(
              this.utils,
              i === 0 ? key : `${key}_${i}`,
            );

            row.addValue({
              name: columnName,
              value: datatypes[i],
              isKey: this.fixer.isKey(objectTable._name, columnName),
              isNull: this.fixer.isNull(objectTable._name, columnName),
              autoGenerated: false,
            });
          }
        }

        objectTable.add(row);

        this.tables.mergeTable(objectTable);

        return [];
      },
      array: (value) => {
        const tableName = new ArrayTableName(this.utils, name);
        const arrayTable = new SQLTable(this.utils, tableName, true);

        const keys = parent.lastKeys();

        for (const v of value) {
          const row = new SQLRow();

          const datatypes = this.execute({
            name: tableName.name(),
            table: arrayTable,
            parent: arrayTable,
            value: v,
          });

          for (let i = 0; i < datatypes.length; i++) {
            const name = new ColumnName(this.utils, `value_${i}`);
            const datatype = datatypes[i];

            row.addValue({
              name: name,
              isKey: false,
              isNull: false,
              value: datatype,
              autoGenerated: false,
            });
          }

          for (const key of keys) {
            const keyName = new ColumnName(this.utils, key.name());

            row.addValue({
              autoGenerated: true,
              isKey: false,
              isNull: false,
              name: keyName,
              value: key.value(),
            });
          }

          arrayTable.add(row);
        }

        return [];
      },
    });

    return type;
  }
}
