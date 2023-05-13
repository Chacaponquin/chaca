import { ChacaError } from "../../../../errors/ChacaError.js";
import {
  SQLBoolean,
  SQLDate,
  SQLForengKey,
  SQLNull,
  SQLNumber,
  SQLPrimaryKey,
  SQLString,
} from "../dataSQLTypes/index.js";
import { SQLTypeWithDefinition } from "../dataSQLTypes/SQLTypeWithDefinition.js";

export abstract class SQLDefinition {
  public abstract getSQLDefinition(): string;
  public abstract equal(otherType: SQLDefinition): boolean;

  public static getTypeFromValue(value: SQLTypeWithDefinition): SQLDefinition {
    if (value instanceof SQLString) {
      if (value.value.length > 255) {
        return new SQLTextDefinition();
      } else {
        return new SQLStringDefinition();
      }
    } else if (value instanceof SQLDate) {
      return new SQLDateDefinition();
    } else if (value instanceof SQLNull) {
      return new SQLNullDefinition();
    } else if (value instanceof SQLNumber) {
      const valueNumber = value.value;

      if (Number.isInteger(valueNumber)) {
        return new SQLIntegerDefinition();
      } else {
        return new SQLDoubleNumberDefinition();
      }
    } else if (value instanceof SQLBoolean) {
      return new SQLBooleanDefinition();
    } else if (value instanceof SQLPrimaryKey) {
      return new SQLPrimaryKeyDefinition(this.getTypeFromValue(value.value));
    } else if (value instanceof SQLForengKey) {
      return new SQLForiegnKeyDefinition(
        this.getTypeFromValue(value.value),
        value.refersTo,
      );
    } else {
      throw new ChacaError(`This value ${value} has not sql definition`);
    }
  }
}

export class SQLStringDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "VARCHAR(255)";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLStringDefinition;
  }
}

export class SQLTextDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "TEXT";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLTextDefinition;
  }
}

export class SQLIntegerDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "INTEGER";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLIntegerDefinition;
  }
}

export class SQLDoubleNumberDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "DOUBLE PRECISION";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLDoubleNumberDefinition;
  }
}

export class SQLDateDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "DATE";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLDateDefinition;
  }
}

export class SQLBooleanDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "BOOLEAN";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLBooleanDefinition;
  }
}

export class SQLNullDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "NULL";
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLNullDefinition;
  }
}

export class SQLPrimaryKeyDefinition extends SQLDefinition {
  constructor(public readonly fieldType: SQLDefinition) {
    super();
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLPrimaryKeyDefinition;
  }

  public getSQLDefinition(): string {
    return `${this.fieldType.getSQLDefinition()}`;
  }
}

export class SQLForiegnKeyDefinition extends SQLDefinition {
  constructor(
    public readonly fieldType: SQLDefinition,
    public readonly refersTo: string,
  ) {
    super();
  }

  public getSQLDefinition(): string {
    return `${this.fieldType.getSQLDefinition()}`;
  }

  public equal(otherType: SQLDefinition): boolean {
    return otherType instanceof SQLForiegnKeyDefinition;
  }
}
