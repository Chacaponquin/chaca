import { ChacaError } from "../../../../../errors";
import { IdSchema } from "../../../../../schemas/id/IdSchema";
import { InterfacesToCreate } from "./InterfacesToCreate";

interface ObjectKeys {
  keyName: string;
  fieldInterface: Array<TypescriptInterface>;
}

export abstract class TypescriptInterface {
  public abstract getInterface(): string;
  public abstract equal(int: TypescriptInterface): boolean;
  public abstract getInterfaceCode(): string;

  public static filterInterface(
    value: any,
    interfaces: InterfacesToCreate,
  ): TypescriptInterface {
    let t: TypescriptInterface = new PrimitiveInterface("undefined");

    if (typeof value === "string") {
      t = new PrimitiveInterface("string");
    } else if (typeof value === "number") {
      t = new PrimitiveInterface("number");
    } else if (typeof value === "boolean") {
      t = new PrimitiveInterface("boolean");
    } else if (typeof value === "undefined") {
      t = new PrimitiveInterface("undefined");
    } else if (typeof value === "bigint") {
      t = new PrimitiveInterface("bigint");
    } else if (typeof value === "function") {
      throw new ChacaError(
        `You can not export a function to a typescript file.`,
      );
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a typescript file.`);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        t = new ArrayInterface(value, interfaces);
      } else if (value instanceof Date) {
        t = new PrimitiveInterface("Date");
      } else if (value === null) {
        t = new PrimitiveInterface("null");
      } else if (value instanceof RegExp) {
        t = new PrimitiveInterface("RegExp");
      } else {
        const newObject = new ObjectInterface(value, interfaces);
        t = interfaces.setInterface(newObject);
      }
    }

    return t;
  }

  protected equalArrayInterfaces(
    array1: Array<TypescriptInterface>,
    array2: Array<TypescriptInterface>,
  ): boolean {
    if (array1.length === array2.length) {
      let equal = true;

      for (let i = 0; i < array1.length && equal; i++) {
        const founded = array2.filter((int) => int.equal(array1[i]));

        if (founded.length !== 1) {
          equal = false;
        }
      }

      return equal;
    } else {
      return false;
    }
  }

  protected pushIsNotInArray(
    array: Array<TypescriptInterface>,
    int: TypescriptInterface,
  ) {
    const exists = array.some((v) => v.equal(int));
    if (!exists) {
      array.push(int);
    }
  }
}

export class ObjectInterface extends TypescriptInterface {
  private _keys: Array<ObjectKeys> = [];
  private readonly idSchema = new IdSchema();
  public readonly name: string =
    "Object" + this.idSchema.mongodbID().getValue();
  private interfaces: InterfacesToCreate;

  constructor(value: any, interfaces: InterfacesToCreate) {
    super();

    this.interfaces = interfaces;

    Object.entries(value).forEach(([key, fieldValue]) => {
      this._keys.push({
        fieldInterface: [
          TypescriptInterface.filterInterface(fieldValue, this.interfaces),
        ],
        keyName: key,
      });
    });
  }

  public get(index: number): ObjectKeys {
    return this._keys[index];
  }

  public setKeys(array: Array<ObjectKeys>): void {
    this._keys = array;
  }

  public length(): number {
    return this._keys.length;
  }

  public getInterface(): string {
    return this.name;
  }

  public hasSameKeys(compareObject: ObjectInterface): boolean {
    if (this.length() === compareObject.length()) {
      let areEqual = true;

      for (let i = 0; i < this.length() && areEqual; i++) {
        const cantWithThatKey = compareObject
          .keys()
          .filter((k) => k.keyName === this.get(i).keyName);

        if (cantWithThatKey.length !== 1) {
          areEqual = false;
        }
      }

      return areEqual;
    } else {
      return false;
    }
  }

  public compareAndUpdate(compareInterface: ObjectInterface): void {
    const newKeysInterfaces: Array<ObjectKeys> = [];

    this.keys().forEach((thisKey) => {
      const found = compareInterface
        .keys()
        .find((k) => k.keyName === thisKey.keyName);

      if (found) {
        const communInterfaces = this.communInterfaces(
          thisKey.fieldInterface,
          found.fieldInterface,
        );

        newKeysInterfaces.push({
          keyName: thisKey.keyName,
          fieldInterface: communInterfaces,
        });
      }
    });

    this.setKeys(newKeysInterfaces);
  }

  public getInterfaceCode(): string {
    const createDataInterface = (key: ObjectKeys): string => {
      let returnIndefined: string;

      const includeUndefined = key.fieldInterface
        .map((i) => i.getInterface())
        .includes("undefined");

      if (includeUndefined) {
        returnIndefined = `"${key.keyName}"?: ${key.fieldInterface
          .map((i) => i.getInterface())
          .filter((i) => i !== "undefined")
          .join(" | ")}`;
      } else {
        returnIndefined = `"${key.keyName}": ${key.fieldInterface
          .map((i) => i.getInterface())
          .join(" | ")}`;
      }

      return returnIndefined;
    };

    const returnInterface =
      `interface ${this.name}{` +
      `${this.keys().map(createDataInterface).join(";")}` +
      "}";

    return returnInterface;
  }

  public keys() {
    return this._keys;
  }

  private communInterfaces(
    interfacesOne: Array<TypescriptInterface>,
    interfacesTwo: Array<TypescriptInterface>,
  ): Array<TypescriptInterface> {
    const returnArray = [] as Array<TypescriptInterface>;

    interfacesOne.forEach((i) => this.pushIsNotInArray(returnArray, i));
    interfacesTwo.forEach((i) => this.pushIsNotInArray(returnArray, i));

    return returnArray;
  }

  public equal(int: TypescriptInterface): boolean {
    if (int instanceof ObjectInterface) {
      let isEqual = true;

      if (this.name !== int.name) {
        for (let i = 0; i < int.length() && isEqual; i++) {
          const areEqual = this.keys().some((k) => {
            const hasTheSameKey = k.keyName === int.get(i).keyName;

            const hasSameInterface = this.equalArrayInterfaces(
              int.get(i).fieldInterface,
              k.fieldInterface,
            );

            return hasTheSameKey && hasSameInterface;
          });

          if (!areEqual) {
            isEqual = false;
          }
        }
      }

      return isEqual;
    } else {
      return false;
    }
  }
}

export class PrimitiveInterface extends TypescriptInterface {
  private name: string;

  constructor(interfaceName: string) {
    super();
    this.name = interfaceName;
  }

  public getInterface(): string {
    return this.name;
  }

  public getInterfaceCode(): string {
    return this.getInterfaceCode();
  }

  public equal(int: TypescriptInterface): boolean {
    if (int instanceof PrimitiveInterface) {
      return this.name === int.getInterface();
    } else {
      return false;
    }
  }
}

export class ArrayInterface extends TypescriptInterface {
  private values: Array<TypescriptInterface> = [];
  private interfaces: InterfacesToCreate;

  constructor(array: any, interfaces: InterfacesToCreate) {
    super();
    this.interfaces = interfaces;
    this.values = array.map((v: any) =>
      TypescriptInterface.filterInterface(v, this.interfaces),
    );
    this.updateValuesInterfaces();
  }

  public equal(int: TypescriptInterface): boolean {
    if (int instanceof ArrayInterface) {
      return this.equalArrayInterfaces(int.getValuesInterfaces(), this.values);
    } else {
      return false;
    }
  }

  public getInterfaceCode(): string {
    return this.getInterfaceCode();
  }

  public getInterface(): string {
    if (this.values.length === 0) {
      return "[]";
    } else {
      return (
        "Array<" +
        `${this.values.map((v) => v.getInterface()).join(" | ")}` +
        ">"
      );
    }
  }

  private updateValuesInterfaces() {
    if (this.values.length > 1) {
      const updatedInterfaces: Array<TypescriptInterface> = [];

      for (let i = 0; i < this.values.length; i++) {
        const actualInterface = this.values[i];

        const existsEqual = this.values
          .slice(i + 1)
          .some((v) => v.equal(actualInterface));

        if (!existsEqual) {
          updatedInterfaces.push(actualInterface);
        }
      }

      this.values = updatedInterfaces;
    }
  }

  public getValuesInterfaces() {
    return this.values;
  }
}
