import { ChacaError } from "../../../../../errors/ChacaError.js";

interface ObjectKey {
  key: string;
  type: CSVDataType;
}

export abstract class CSVDataType {
  public abstract getCSVValue(): string;

  public static filterTypeByValue(value: any): CSVDataType {
    let type: CSVDataType = new CSVNull();

    if (typeof value === "string") {
      type = new CSVString(value);
    } else if (typeof value === "number") {
      type = new CSVNumber(value);
    } else if (typeof value === "boolean") {
      type = new CSVBoolean(value);
    } else if (typeof value === "bigint") {
      type = new CSVBigint(value);
    } else if (typeof value === "undefined") {
      type = new CSVNull();
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function in a csv file.`);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol in a csv file.`);
    } else if (typeof value === "object") {
      if (value instanceof Date) {
        type = new CSVDate(value);
      } else if (Array.isArray(value)) {
        type = new CSVArray(value);
      } else if (value === null) {
        type = new CSVNull();
      } else {
        type = new CSVObject(value);
      }
    }

    return type;
  }
}

export class CSVBoolean extends CSVDataType {
  constructor(private readonly value: boolean) {
    super();
  }

  public getCSVValue(): string {
    if (this.value) return "TRUE";
    else return "FALSE";
  }
}

export class CSVDate extends CSVDataType {
  constructor(private readonly value: Date) {
    super();
  }

  public getCSVValue(): string {
    return this.value.toISOString();
  }
}

export class CSVNull extends CSVDataType {
  public getCSVValue(): string {
    return "NULL";
  }
}

export class CSVString extends CSVDataType {
  constructor(private readonly value: string) {
    super();
  }

  public getCSVValue(): string {
    return JSON.stringify(this.value);
  }
}

export class CSVBigint extends CSVDataType {
  constructor(private readonly value: bigint) {
    super();
  }

  public getCSVValue(): string {
    return this.value.toString();
  }
}

export class CSVNumber extends CSVDataType {
  constructor(private readonly value: number) {
    super();
  }

  public getCSVValue(): string {
    let retString: string;

    if (Number.isNaN(this.value)) {
      retString = "NaN";
    } else if (this.value === Infinity) {
      retString = "Infinity";
    } else if (this.value === -Infinity) {
      retString = "-Infinity";
    } else {
      retString = `${this.value}`;
    }

    return retString;
  }
}

export class CSVArray extends CSVDataType {
  private values: Array<CSVObject> = [];

  constructor(array: Array<any>) {
    super();
    for (const v of array) {
      const type = CSVDataType.filterTypeByValue(v);

      if (
        type instanceof CSVObject &&
        this.values.every((v) => type.equal(v))
      ) {
        this.values.push(type);
      } else {
        throw new ChacaError(`Your objects array must have the same keys`);
      }
    }
  }

  public getValues() {
    return this.values;
  }

  public getCSVValue(): string {
    let content = "";

    if (this.values.length > 0) {
      const firstObject = this.values[0];
      const allKeys = firstObject.getKeys();

      const header = allKeys.join(",") + "\n";

      let allObjectsContent = "";
      for (const o of this.values) {
        allObjectsContent += o.getCSVValue();
      }

      content = header + allObjectsContent;
    }

    return content;
  }
}

export class CSVObject extends CSVDataType {
  private keys: Array<ObjectKey> = [];

  constructor(public readonly object: any) {
    super();

    for (const [key, value] of Object.entries(object)) {
      const type = CSVDataType.filterTypeByValue(value);

      if (type instanceof CSVArray) {
        throw new ChacaError(`You can not insert an array into a CSV File`);
      } else if (type instanceof CSVObject) {
        throw new ChacaError(
          `You can not insert a nested object into a CSV File`,
        );
      }

      this.keys.push({ key, type });
    }
  }

  public getCSVValue(): string {
    const values = this.keys.map((k) => k.type.getCSVValue());
    return values.join(", ") + "\n";
  }

  public equal(otherObject: CSVObject): boolean {
    let equal = true;

    if (this.keys.length === otherObject.keys.length) {
      for (let i = 0; i < this.keys.length; i++) {
        const key = this.keys[i];
        const exists = otherObject.keys.some((k) => k.key === key.key);

        if (!exists) {
          equal = false;
        }
      }
    } else {
      equal = false;
    }

    return equal;
  }

  public getKeys() {
    return this.keys.map((k) => k.key);
  }
}
