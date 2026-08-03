/**
 * Representation of a value or type definition for each supported
 * SQL extension. Every `SQLDatatype` is forced to declare how it is
 * exported in each one of them.
 */
export interface SQLExtensionValues {
  postgres: string;
  sqlite: string;
  mysql: string;
}

function same(value: string): SQLExtensionValues {
  return { postgres: value, sqlite: value, mysql: value };
}

export abstract class SQLDatatype {
  abstract definition(): SQLExtensionValues;
  abstract string(): SQLExtensionValues;
  abstract refValue(): SQLDatatype;
  abstract primitive(): string;
  protected abstract greaterThan(other: SQLDatatype): boolean;
  protected abstract similar(other: SQLDatatype): boolean;

  isSimilar(other: SQLDatatype): boolean {
    if (other instanceof SQLNull || this instanceof SQLNull) {
      return true;
    }

    return other.similar(this);
  }

  greater(other: SQLDatatype): SQLDatatype {
    if (other instanceof SQLNull) {
      return this;
    }

    if (this instanceof SQLNull) {
      return other;
    }

    if (this.greaterThan(other)) {
      return this;
    } else {
      return other;
    }
  }
}

export class SQLBoolean extends SQLDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  primitive(): string {
    return "boolean";
  }

  greaterThan(): boolean {
    return false;
  }

  definition(): SQLExtensionValues {
    return same("BOOLEAN");
  }

  refValue(): SQLDatatype {
    return this;
  }

  string(): SQLExtensionValues {
    return same(this.value ? "TRUE" : "FALSE");
  }

  similar(other: SQLDatatype): boolean {
    return other instanceof SQLBoolean;
  }
}

export class SQLDate extends SQLDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  primitive(): string {
    return "Date";
  }

  refValue(): SQLDatatype {
    return this;
  }

  definition(): SQLExtensionValues {
    return {
      postgres: "TIMESTAMP",
      sqlite: "TEXT",
      mysql: "DATETIME(3)",
    };
  }

  string(): SQLExtensionValues {
    const iso = this.value.toISOString();

    return {
      postgres: `'${iso}'`,
      sqlite: `'${iso}'`,
      // mysql does not accept the trailing 'Z' zulu marker in datetime literals
      mysql: `'${iso.slice(0, -1)}'`,
    };
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

  primitive(): string {
    return "null";
  }

  refValue(): SQLDatatype {
    return this;
  }

  definition(): SQLExtensionValues {
    return same("TEXT");
  }

  string(): SQLExtensionValues {
    return same("NULL");
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

  primitive(): string {
    return "bigint";
  }

  refValue(): SQLDatatype {
    return this;
  }

  definition(): SQLExtensionValues {
    return {
      postgres: "BIGINT",
      sqlite: "INTEGER",
      mysql: "BIGINT",
    };
  }

  greaterThan(other: SQLDatatype): boolean {
    if (other instanceof SQLNumber) {
      return true;
    }

    return false;
  }

  string(): SQLExtensionValues {
    return same(`${this.value}`);
  }
}

export class SQLInteger extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  primitive(): string {
    return "number";
  }

  refValue(): SQLDatatype {
    return this;
  }

  greaterThan(): boolean {
    return false;
  }

  definition(): SQLExtensionValues {
    return same("INTEGER");
  }

  string(): SQLExtensionValues {
    return same(`${this.value}`);
  }
}

export class SQLFloat extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  primitive(): string {
    return "number";
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

  definition(): SQLExtensionValues {
    return {
      postgres: "FLOAT",
      sqlite: "REAL",
      mysql: "DOUBLE",
    };
  }

  string(): SQLExtensionValues {
    // mysql DOUBLE cannot represent Infinity or NaN, so infinities are
    // clamped to the DOUBLE range limits and NaN falls back to NULL
    if (this.value === Infinity) {
      return {
        postgres: "'+infinity'",
        sqlite: "9e999",
        mysql: `${Number.MAX_VALUE}`,
      };
    } else if (this.value === -Infinity) {
      return {
        postgres: "'-infinity'",
        sqlite: "-9e999",
        mysql: `${-Number.MAX_VALUE}`,
      };
    } else if (Number.isNaN(this.value)) {
      return {
        postgres: `'NaN'`,
        sqlite: `'NaN'`,
        mysql: "NULL",
      };
    } else {
      return same(`${this.value}`);
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

  primitive(): string {
    return "string";
  }

  string(): SQLExtensionValues {
    const escaped = this.value.replace(/'/g, "''");

    return {
      postgres: `'${escaped}'`,
      sqlite: `'${escaped}'`,
      // mysql treats backslash as an escape character inside string literals
      mysql: `'${this.value.replace(/\\/g, "\\\\").replace(/'/g, "''")}'`,
    };
  }
}

export class SQLText extends SQLString {
  constructor(value: string) {
    super(value);
  }

  refValue(): SQLDatatype {
    return this;
  }

  definition(): SQLExtensionValues {
    return same("TEXT");
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

  definition(): SQLExtensionValues {
    return {
      postgres: "VARCHAR(255)",
      sqlite: "TEXT",
      mysql: "VARCHAR(255)",
    };
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

  primitive(): string {
    return "number";
  }

  refValue(): SQLDatatype {
    return new SQLInteger(Number(this.value));
  }

  string(): SQLExtensionValues {
    return same(`${this.value}`);
  }

  definition(): SQLExtensionValues {
    return {
      postgres: "SERIAL",
      sqlite: "INTEGER",
      mysql: "INT AUTO_INCREMENT",
    };
  }

  greaterThan(): boolean {
    return false;
  }
}
