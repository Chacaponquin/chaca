import { ChacaError } from "../../../../../../errors/ChacaError.js";

interface ObjectTypeField {
  key: string;
  dataType: DataType;
}

export abstract class DataType {
  protected abstract equalType(otherType: DataType): boolean;
  public equal(otherType: DataType): boolean {
    const areEqual =
      otherType instanceof NullType ||
      this instanceof NullType ||
      this.equalType(otherType);
    return areEqual;
  }

  public static filterTypeByValue(value: any): DataType {
    let returnType: DataType;

    if (typeof value === "string") {
      returnType = new StringType(value);
    } else if (typeof value === "number") {
      returnType = new NumberType(value);
    } else if (typeof value === "boolean") {
      returnType = new BooleanType(value);
    } else if (typeof value === "undefined") {
      returnType = new NullType();
    } else if (typeof value === "bigint") {
      returnType = new BigintType(value);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a SQL file.`);
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function to a SQL file.`);
    } else {
      if (Array.isArray(value)) {
        returnType = new ArrayType(value);
      } else if (value instanceof Date) {
        returnType = new DateType(value);
      } else if (value instanceof RegExp) {
        throw new ChacaError(`You can not export a RegExp to a SQL file`);
      } else if (value === null) {
        returnType = new NullType();
      } else {
        returnType = new ObjectType(value);
      }
    }

    return returnType;
  }
}

export class StringType extends DataType {
  constructor(public readonly value: string) {
    super();
  }

  public equalType(otherType: DataType): boolean {
    return otherType instanceof StringType;
  }
}

export class NumberType extends DataType {
  constructor(public readonly value: number) {
    super();
  }

  public equalType(otherType: DataType): boolean {
    return otherType instanceof NumberType;
  }
}

export class BigintType extends DataType {
  constructor(public readonly value: bigint) {
    super();
  }

  protected equalType(otherType: DataType): boolean {
    return otherType instanceof BigintType;
  }
}

export class DateType extends DataType {
  constructor(public readonly value: Date) {
    super();
  }

  public equalType(otherType: DataType): boolean {
    return otherType instanceof DateType;
  }
}

export class BooleanType extends DataType {
  constructor(public readonly value: boolean) {
    super();
  }

  public equalType(otherType: DataType): boolean {
    return otherType instanceof BooleanType;
  }
}

export class NullType extends DataType {
  public equalType(otherType: DataType): boolean {
    return otherType instanceof NullType;
  }
}

export class ObjectType extends DataType {
  private keys: Array<ObjectTypeField> = [];

  constructor(object: any) {
    super();
    Object.entries(object).forEach(([key, value]) => {
      this.keys.push({ key: key, dataType: DataType.filterTypeByValue(value) });
    });
  }

  public getKeys() {
    return this.keys;
  }

  public equalType(otherType: DataType): boolean {
    if (otherType instanceof ObjectType) {
      if (otherType.keys.length === this.keys.length) {
        let areEqual = true;

        for (let i = 0; i < this.keys.length && areEqual; i++) {
          const found = otherType.keys.some(
            (k) =>
              k.key === this.keys[i].key &&
              k.dataType.equal(this.keys[i].dataType),
          );

          if (!found) {
            areEqual = false;
          }
        }

        return areEqual;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

export class ArrayType extends DataType {
  private values: Array<DataType> = [];

  constructor(array: Array<any>) {
    super();

    array.forEach((v) => {
      const valueType = DataType.filterTypeByValue(v);

      if (this.values.length) {
        if (this.values[0].equal(valueType)) {
          this.values.push(valueType);
        } else {
          throw new ChacaError(`The array has different value types`);
        }
      } else {
        this.values.push(valueType);
      }
    });
  }

  public getValues() {
    return this.values;
  }

  public equalType(otherType: DataType): boolean {
    if (otherType instanceof ArrayType) {
      if (this.values.length && otherType.values.length) {
        if (this.values[0].equal(otherType.values[0])) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
