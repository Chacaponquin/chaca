import { ChacaError } from "../../../../../errors";

interface ObjectTypeField {
  key: string;
  dataType: DataType;
}

export abstract class DataType {
  protected abstract equalType(otherType: DataType): boolean;
  equal(otherType: DataType): boolean {
    const areEqual =
      otherType instanceof NullType ||
      this instanceof NullType ||
      this.equalType(otherType);
    return areEqual;
  }

  static filterTypeByValue(value: any): DataType {
    let returnType: DataType;

    if (typeof value === "string") {
      returnType = new StringType(value);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a java file`);
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function to a java file`);
    } else if (typeof value === "number") {
      if (Number.isInteger(value)) {
        returnType = new IntegerType(value);
      } else {
        returnType = new FloatType(value);
      }
    } else if (typeof value === "boolean") {
      returnType = new BooleanType(value);
    } else if (typeof value === "undefined") {
      returnType = new NullType();
    } else if (typeof value === "bigint") {
      returnType = new BigintType(value);
    } else {
      if (Array.isArray(value)) {
        returnType = new ArrayType(value);
      } else if (value instanceof Date) {
        returnType = new DateType(value);
      } else if (value === null) {
        returnType = new NullType();
      } else if (value instanceof RegExp) {
        returnType = new RegExpType(value);
      } else {
        returnType = new ObjectType(value);
      }
    }

    return returnType;
  }
}

export class RegExpType extends DataType {
  constructor(readonly value: RegExp) {
    super();
  }

  protected equalType(otherType: DataType): boolean {
    return otherType instanceof RegExpType;
  }
}

export class BigintType extends DataType {
  constructor(readonly value: bigint) {
    super();
  }

  protected equalType(otherType: DataType): boolean {
    return otherType instanceof BigintType;
  }
}

export class StringType extends DataType {
  constructor(readonly value: string) {
    super();
  }

  equalType(otherType: DataType): boolean {
    return otherType instanceof StringType;
  }
}

export abstract class NumberType extends DataType {
  constructor(readonly value: number) {
    super();
  }

  equalType(otherType: DataType): boolean {
    return otherType instanceof NumberType;
  }
}

export class FloatType extends NumberType {}
export class IntegerType extends NumberType {}

export class DateType extends DataType {
  constructor(readonly value: Date) {
    super();
  }

  equalType(otherType: DataType): boolean {
    return otherType instanceof DateType;
  }
}

export class BooleanType extends DataType {
  constructor(readonly value: boolean) {
    super();
  }

  equalType(otherType: DataType): boolean {
    return otherType instanceof BooleanType;
  }
}

export class NullType extends DataType {
  equalType(otherType: DataType): boolean {
    return otherType instanceof NullType;
  }
}

export class ObjectType extends DataType {
  private keys: ObjectTypeField[] = [];

  constructor(object: any) {
    super();
    Object.entries(object).forEach(([key, value]) => {
      this.keys.push({ key: key, dataType: DataType.filterTypeByValue(value) });
    });
  }

  getKeys() {
    return this.keys;
  }

  equalType(otherType: DataType): boolean {
    if (otherType instanceof ObjectType) {
      if (otherType.keys.length === this.keys.length) {
        let areEqual = true;

        for (let i = 0; i < this.keys.length && areEqual; i++) {
          let foundEqualKey = false;
          const currentThisKey = this.keys[i];

          for (let j = 0; j < otherType.keys.length && !foundEqualKey; j++) {
            const currentOtherKey = otherType.keys[j];
            if (currentOtherKey.key === currentThisKey.key) {
              if (currentOtherKey.dataType.equal(currentThisKey.dataType)) {
                foundEqualKey = true;

                if (
                  currentOtherKey.dataType instanceof NumberType &&
                  currentThisKey.dataType instanceof NumberType
                ) {
                  if (
                    currentOtherKey.dataType instanceof FloatType ||
                    currentThisKey.dataType instanceof FloatType
                  ) {
                    currentThisKey.dataType = new FloatType(
                      currentThisKey.dataType.value,
                    );
                    currentOtherKey.dataType = new FloatType(
                      currentOtherKey.dataType.value,
                    );
                  }
                }
              }
            }
          }

          if (!foundEqualKey) {
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
  private arrayType: DataType | null = null;

  constructor(array: Array<any>) {
    super();

    array.forEach((v) => {
      const valueType = DataType.filterTypeByValue(v);

      if (this.values.length) {
        if (this.values[0].equal(valueType)) {
          this.values.push(valueType);

          if (this.arrayType instanceof NumberType) {
            if (valueType instanceof FloatType) {
              this.arrayType = valueType;
            }
          }
        } else {
          throw new ChacaError(`The array has different value types`);
        }
      } else {
        this.values.push(valueType);
        this.arrayType = valueType;
      }
    });
  }

  getArrayType() {
    return this.arrayType;
  }

  getValues() {
    return this.values;
  }

  equalType(otherType: DataType): boolean {
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
