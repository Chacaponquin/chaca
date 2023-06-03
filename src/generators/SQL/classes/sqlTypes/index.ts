export abstract class SQLType {
  public abstract getSQLDefinition(): string;
  public abstract getSQLValue(): string;
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

export class SQLNumber extends SQLType {
  constructor(public readonly value: number) {
    super();
  }

  public getSQLDefinition(): string {
    return "DOUBLE PRECISION";
  }

  public getSQLValue(): string {
    return `${this.value}`;
  }
}

export class SQLString extends SQLType {
  constructor(public readonly value: string) {
    super();
  }

  public getSQLDefinition(): string {
    return "VARCHAR(255)";
  }

  public getSQLValue(): string {
    return `'${this.value}'`;
  }
}
