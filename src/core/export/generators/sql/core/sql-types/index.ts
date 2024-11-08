export abstract class SQLDatatype {
  abstract definition(): string;
  abstract string(): string;
  protected abstract greaterThan(other: SQLDatatype): boolean;
  protected abstract similar(other: SQLDatatype): boolean;
  abstract refValue(): SQLDatatype;
  abstract primitive(): string;

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

  primitive(): string {
    return "Date";
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

  primitive(): string {
    return "null";
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

  primitive(): string {
    return "bigint";
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

  primitive(): string {
    return "number";
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

  definition(): string {
    return "FLOAT";
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

  primitive(): string {
    return "string";
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

  primitive(): string {
    return "number";
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
