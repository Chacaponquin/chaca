export abstract class SQLType {
  public abstract getSQLDefinition(): string;
  public abstract getSQLValue(): string;
}

export class SQLBigint extends SQLType {
  constructor(public readonly value: bigint) {
    super();
  }

  public getSQLDefinition(): string {
    return "NUMERIC(20)";
  }

  public getSQLValue(): string {
    return this.value.toString();
  }
}

export class SQLBoolean extends SQLType {
  constructor(public readonly value: boolean) {
    super();
  }

  public getSQLDefinition(): string {
    return "BOOLEAN";
  }

  public getSQLValue(): string {
    if (this.value) {
      return "TRUE";
    } else {
      return "FALSE";
    }
  }
}

export class SQLDate extends SQLType {
  constructor(public readonly value: Date) {
    super();
  }

  public getSQLDefinition(): string {
    return "DATE";
  }

  public getSQLValue(): string {
    return `'${this.value.toISOString().slice(0, 10)}'`;
  }
}

export class SQLNull extends SQLType {
  public readonly value = null;

  constructor() {
    super();
  }

  public getSQLDefinition(): string {
    return "NULL";
  }

  public getSQLValue(): string {
    return `NULL`;
  }
}

export abstract class SQLNumber extends SQLType {
  constructor(public readonly value: number) {
    super();
  }

  public getSQLValue(): string {
    return `${this.value}`;
  }
}

export class SQLIntegerNumber extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  public getSQLDefinition(): string {
    return "INTEGER";
  }
}

export class SQLFloatNumber extends SQLNumber {
  constructor(value: number) {
    super(value);
  }

  public getSQLDefinition(): string {
    return "DOUBLE PRECISION";
  }

  public getSQLValue(): string {
    if (this.value === Infinity) {
      return "+infinity";
    } else if (this.value === -Infinity) {
      return "-infinity";
    } else if (Number.isNaN(this.value)) {
      return `'NaN'`;
    } else {
      return `${this.value}`;
    }
  }
}

export abstract class SQLString extends SQLType {
  constructor(public readonly value: string) {
    super();
  }

  public getSQLValue(): string {
    return `'${this.value}'`;
  }
}

export class SQLTextString extends SQLString {
  constructor(value: string) {
    super(value);
  }

  public getSQLDefinition(): string {
    return "TEXT";
  }
}

export class SQLVarcharString extends SQLString {
  constructor(value: string) {
    super(value);
  }

  public getSQLDefinition(): string {
    return "VARCHAR(255)";
  }
}
