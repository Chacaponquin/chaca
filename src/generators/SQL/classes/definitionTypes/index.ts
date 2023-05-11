import { ChacaError } from "../../../../errors/ChacaError.js";
import {
  SQLBoolean,
  SQLDate,
  SQLNull,
  SQLNumber,
  SQLString,
} from "../dataSQLTypes/index.js";
import { SQLTypeWithDefinition } from "../dataSQLTypes/SQLTypeWithDefinition.js";

export abstract class SQLDefinition {
  public abstract getSQLDefinition(): string;

  public static getTypeFromValue(value: SQLTypeWithDefinition): SQLDefinition {
    if (value instanceof SQLString) {
      return new SQLStringDefinition();
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
    } else {
      throw new ChacaError(`This has not sql definition`);
    }
  }
}

export class SQLStringDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "VARCHAR(255)";
  }
}

export class SQLTextDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "TEXT";
  }
}

export class SQLIntegerDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "INTEGER";
  }
}

export class SQLDoubleNumberDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "DOUBLE PRECISION";
  }
}

export class SQLDateDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "DATE";
  }
}

export class SQLBooleanDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "BOOLEAN";
  }
}

export class SQLNullDefinition extends SQLDefinition {
  public getSQLDefinition(): string {
    return "NULL";
  }
}

export class SQLPrimaryKeyDefinition extends SQLDefinition {
  constructor(public readonly fieldType: SQLDefinition) {
    super();
  }

  public getSQLDefinition(): string {
    return `PRIMARY KEY`;
  }
}

export class SQLForiegnKeyDefinition extends SQLDefinition {
  constructor(private fieldType: SQLDefinition) {
    super();
  }

  public getSQLDefinition(): string {
    return `FOREIGN KEY`;
  }
}
