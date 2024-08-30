import { ChacaError } from "../../../../../../errors";

interface ObjectTypeField {
  key: string;
  datatype: Datatype;
}

export abstract class Datatype {
  protected abstract equalType(otherType: Datatype): boolean;

  equal(otherType: Datatype): boolean {
    const areEqual =
      otherType instanceof NullType ||
      this instanceof NullType ||
      this.equalType(otherType);
    return areEqual;
  }

  static filterTypeByValue(value: any): Datatype {
    let returnType: Datatype;

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

export class StringType extends Datatype {
  constructor(readonly value: string) {
    super();
  }

  equalType(otherType: Datatype): boolean {
    return otherType instanceof StringType;
  }
}

export class NumberType extends Datatype {
  constructor(readonly value: number) {
    super();
  }

  equalType(otherType: Datatype): boolean {
    return otherType instanceof NumberType;
  }
}

export class BigintType extends Datatype {
  constructor(readonly value: bigint) {
    super();
  }

  protected equalType(otherType: Datatype): boolean {
    return otherType instanceof BigintType;
  }
}

export class DateType extends Datatype {
  constructor(readonly value: Date) {
    super();
  }

  equalType(otherType: Datatype): boolean {
    return otherType instanceof DateType;
  }
}

export class BooleanType extends Datatype {
  constructor(readonly value: boolean) {
    super();
  }

  equalType(otherType: Datatype): boolean {
    return otherType instanceof BooleanType;
  }
}

export class NullType extends Datatype {
  equalType(otherType: Datatype): boolean {
    return otherType instanceof NullType;
  }
}

export class ObjectType extends Datatype {
  private keys: Array<ObjectTypeField> = [];

  constructor(object: any) {
    super();
    Object.entries(object).forEach(([key, value]) => {
      this.keys.push({ key: key, datatype: Datatype.filterTypeByValue(value) });
    });
  }

  getKeys() {
    return this.keys;
  }

  equalType(otherType: Datatype): boolean {
    if (otherType instanceof ObjectType) {
      if (otherType.keys.length === this.keys.length) {
        let areEqual = true;

        for (let i = 0; i < this.keys.length && areEqual; i++) {
          const found = otherType.keys.some(
            (k) =>
              k.key === this.keys[i].key &&
              k.datatype.equal(this.keys[i].datatype),
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

export class ArrayType extends Datatype {
  private values: Datatype[] = [];

  constructor(array: any[]) {
    super();

    array.forEach((v) => {
      const valueType = Datatype.filterTypeByValue(v);

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

  getValues() {
    return this.values;
  }

  equalType(otherType: Datatype): boolean {
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
