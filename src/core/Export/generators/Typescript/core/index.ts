import { ChacaError } from "../../../../../errors";
import { IdModule } from "../../../../../modules/id";
import { InterfacesToCreate } from "./interfaces";

interface ObjectKeys {
  name: string;
  fieldInterface: TypescriptInterface[];
}

export abstract class TypescriptInterface {
  abstract getInterface(): string;
  abstract equal(int: TypescriptInterface): boolean;
  abstract getInterfaceCode(): string;

  static filterInterface(
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
    array1: TypescriptInterface[],
    array2: TypescriptInterface[],
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
    array: TypescriptInterface[],
    int: TypescriptInterface,
  ) {
    const exists = array.some((v) => v.equal(int));
    if (!exists) {
      array.push(int);
    }
  }
}

export class ObjectInterface extends TypescriptInterface {
  private _keys: ObjectKeys[] = [];
  private readonly idModule = new IdModule();
  readonly name: string = "Object" + this.idModule.mongodbId().getValue();
  private interfaces: InterfacesToCreate;

  constructor(value: any, interfaces: InterfacesToCreate) {
    super();

    this.interfaces = interfaces;

    Object.entries(value).forEach(([key, fieldValue]) => {
      this._keys.push({
        fieldInterface: [
          TypescriptInterface.filterInterface(fieldValue, this.interfaces),
        ],
        name: key,
      });
    });
  }

  get(index: number): ObjectKeys {
    return this._keys[index];
  }

  setKeys(array: ObjectKeys[]): void {
    this._keys = array;
  }

  length(): number {
    return this._keys.length;
  }

  getInterface(): string {
    return this.name;
  }

  hasSameKeys(compareObject: ObjectInterface): boolean {
    if (this.length() === compareObject.length()) {
      let areEqual = true;

      for (let i = 0; i < this.length() && areEqual; i++) {
        const cantWithThatKey = compareObject
          .keys()
          .filter((k) => k.name === this.get(i).name);

        if (cantWithThatKey.length !== 1) {
          areEqual = false;
        }
      }

      return areEqual;
    } else {
      return false;
    }
  }

  compareAndUpdate(compareInterface: ObjectInterface): void {
    const newKeysInterfaces: ObjectKeys[] = [];

    this.keys().forEach((thisKey) => {
      const found = compareInterface
        .keys()
        .find((k) => k.name === thisKey.name);

      if (found) {
        const communInterfaces = this.communInterfaces(
          thisKey.fieldInterface,
          found.fieldInterface,
        );

        newKeysInterfaces.push({
          name: thisKey.name,
          fieldInterface: communInterfaces,
        });
      }
    });

    this.setKeys(newKeysInterfaces);
  }

  getInterfaceCode(): string {
    const createDataInterface = (key: ObjectKeys): string => {
      let returnIndefined: string;

      const includeUndefined = key.fieldInterface
        .map((i) => i.getInterface())
        .includes("undefined");

      if (includeUndefined) {
        returnIndefined = `"${key.name}"?: ${key.fieldInterface
          .map((i) => i.getInterface())
          .filter((i) => i !== "undefined")
          .join(" | ")}`;
      } else {
        returnIndefined = `"${key.name}": ${key.fieldInterface
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

  keys() {
    return this._keys;
  }

  private communInterfaces(
    interfacesOne: TypescriptInterface[],
    interfacesTwo: TypescriptInterface[],
  ): TypescriptInterface[] {
    const returnArray = [] as TypescriptInterface[];

    interfacesOne.forEach((i) => this.pushIsNotInArray(returnArray, i));
    interfacesTwo.forEach((i) => this.pushIsNotInArray(returnArray, i));

    return returnArray;
  }

  equal(int: TypescriptInterface): boolean {
    if (int instanceof ObjectInterface) {
      let isEqual = true;

      if (this.name !== int.name) {
        for (let i = 0; i < int.length() && isEqual; i++) {
          const areEqual = this.keys().some((k) => {
            const hasTheSameKey = k.name === int.get(i).name;

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

  constructor(name: string) {
    super();
    this.name = name;
  }

  getInterface(): string {
    return this.name;
  }

  getInterfaceCode(): string {
    return this.getInterfaceCode();
  }

  equal(int: TypescriptInterface): boolean {
    if (int instanceof PrimitiveInterface) {
      return this.name === int.getInterface();
    } else {
      return false;
    }
  }
}

export class ArrayInterface extends TypescriptInterface {
  private values: TypescriptInterface[] = [];
  private interfaces: InterfacesToCreate;

  constructor(array: any, interfaces: InterfacesToCreate) {
    super();
    this.interfaces = interfaces;
    this.values = array.map((v: any) =>
      TypescriptInterface.filterInterface(v, this.interfaces),
    );
    this.updateValuesInterfaces();
  }

  equal(int: TypescriptInterface): boolean {
    if (int instanceof ArrayInterface) {
      return this.equalArrayInterfaces(int.getValuesInterfaces(), this.values);
    } else {
      return false;
    }
  }

  getInterfaceCode(): string {
    return this.getInterfaceCode();
  }

  getInterface(): string {
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
      const updatedInterfaces: TypescriptInterface[] = [];

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

  getValuesInterfaces() {
    return this.values;
  }
}
