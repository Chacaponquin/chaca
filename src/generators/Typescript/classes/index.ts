import { PrivateUtils } from "../../../utils/helpers/PrivateUtils.js";

interface ObjectKeys {
  keyName: string;
  fieldInterface: Array<TypescriptInterface>;
}

export abstract class TypescriptInterface {
  public abstract getInterface(): string;
  public abstract equal(int: TypescriptInterface): boolean;
  public abstract getInterfaceCode(): string;

  public static filterInterface(value: any): TypescriptInterface {
    let t: TypescriptInterface = new PrimitiveInterface("undefined");

    if (typeof value === "string") {
      t = new PrimitiveInterface("string");
    } else if (typeof value === "number") {
      t = new PrimitiveInterface("number");
    } else if (typeof value === "boolean") {
      t = new PrimitiveInterface("boolean");
    } else if (typeof value === "undefined") {
      t = new PrimitiveInterface("undefined");
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        t = new ArrayInterface(value);
      } else if (value instanceof Date) {
        t = new PrimitiveInterface("Date");
      } else if (value === null) {
        t = new PrimitiveInterface("null");
      } else {
        const newObject = new ObjectInterface(value);
        t = ObjectInterface.setObjectToCreate(newObject);
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
  private keys: Array<ObjectKeys> = [];
  public readonly name: string = "Object" + PrivateUtils.id();

  private static objectsToCreate: Array<ObjectInterface> = [];

  constructor(value: any) {
    super();

    Object.entries(value).forEach(([key, fieldValue]) => {
      this.keys.push({
        fieldInterface: [TypescriptInterface.filterInterface(fieldValue)],
        keyName: key,
      });
    });
  }

  public static getObjectsToCreate() {
    return this.objectsToCreate;
  }

  public static cleanObjectsToCreate(): void {
    this.objectsToCreate = [];
  }

  public static setObjectToCreate(object: ObjectInterface): ObjectInterface {
    let returnObject = object;

    let found = false;
    for (let i = 0; i < this.objectsToCreate.length && !found; i++) {
      const areSimiliar = this.similarObjects(this.objectsToCreate[i], object);

      if (areSimiliar) {
        returnObject = this.objectsToCreate[i].compareAndUpdate(object);
        found = true;
      } else {
        returnObject = object;
      }
    }

    this.objectsToCreate.push(returnObject);

    return returnObject;
  }

  public hasSameKeys(compareObject: ObjectInterface): boolean {
    if (
      this.getKeysInterfaces().length ===
      compareObject.getKeysInterfaces().length
    ) {
      const { maxObject, minObject } = ObjectInterface.separateObjectsByLength(
        this,
        compareObject,
      );

      let areEqual = true;

      const maxKeys = maxObject.getKeysInterfaces();
      for (let i = 0; i < maxKeys.length && areEqual; i++) {
        const cantWithThatKey = minObject
          .getKeysInterfaces()
          .filter((k) => k.keyName === maxKeys[i].keyName);

        if (cantWithThatKey.length !== 1) {
          areEqual = false;
        }
      }

      return areEqual;
    } else {
      return false;
    }
  }

  public compareAndUpdate(
    compareObjectInterface: ObjectInterface,
  ): ObjectInterface {
    const { maxObject, minObject } = ObjectInterface.separateObjectsByLength(
      this,
      compareObjectInterface,
    );

    const newKeysInterfaces: Array<ObjectKeys> = [];

    maxObject.getKeysInterfaces().forEach((maxKey) => {
      const found = minObject.keys.find((k) => k.keyName === maxKey.keyName);

      if (found) {
        const communInterfaces = this.communInterfaces(
          maxKey.fieldInterface,
          found.fieldInterface,
        );

        newKeysInterfaces.push({
          keyName: maxKey.keyName,
          fieldInterface: communInterfaces,
        });
      } else {
        newKeysInterfaces.push({
          keyName: maxKey.keyName,
          fieldInterface: [
            ...maxKey.fieldInterface.filter((k) => k !== minObject),
            new PrimitiveInterface("undefined"),
          ],
        });
      }
    });

    minObject.getKeysInterfaces().forEach((minKey) => {
      const existsInMax = newKeysInterfaces.some(
        (k) => k.keyName === minKey.keyName,
      );

      if (!existsInMax) {
        newKeysInterfaces.push({
          keyName: minKey.keyName,
          fieldInterface: [
            ...minKey.fieldInterface.filter((k) => k !== minObject),
            new PrimitiveInterface("undefined"),
          ],
        });
      }
    });

    maxObject.setKeysInterfaces(newKeysInterfaces);

    ObjectInterface.deleteObjectToCreateByName(minObject.name);
    ObjectInterface.deleteObjectToCreateByName(maxObject.name);

    return maxObject;
  }

  public static similarObjects(
    objInterfaceOne: ObjectInterface,
    objInterfaceTwo: ObjectInterface,
  ): boolean {
    const { maxObject, minObject } = this.separateObjectsByLength(
      objInterfaceOne,
      objInterfaceTwo,
    );

    let cont = 0;

    const maxKeysInterfaces = maxObject.getKeysInterfaces();
    for (
      let i = 0;
      i < maxKeysInterfaces.length && cont < maxKeysInterfaces.length / 2;
      i++
    ) {
      const exists = minObject
        .getKeysInterfaces()
        .some((k) => maxKeysInterfaces[i].keyName === k.keyName);

      if (exists) {
        cont++;
      }
    }

    return cont >= maxKeysInterfaces.length / 2;
  }

  private static separateObjectsByLength(
    objInterfaceOne: ObjectInterface,
    objInterfaceTwo: ObjectInterface,
  ) {
    let maxObject: ObjectInterface;
    let minObject: ObjectInterface;

    const len1 = objInterfaceOne.getKeysInterfaces().length;
    const len2 = objInterfaceTwo.getKeysInterfaces().length;

    if (len1 > len2 || len1 === len2) {
      maxObject = objInterfaceOne;
      minObject = objInterfaceTwo;
    } else {
      maxObject = objInterfaceTwo;
      minObject = objInterfaceOne;
    }

    return { maxObject, minObject };
  }

  public static deleteObjectToCreateByName(name: string): void {
    this.objectsToCreate = this.objectsToCreate.filter((o) => o.name !== name);
  }

  public getInterface(): string {
    return this.name;
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
      `${this.keys.map(createDataInterface).join(";")}` +
      "}";

    return returnInterface;
  }

  public getKeysInterfaces() {
    return this.keys;
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

  public setKeysInterfaces(array: Array<ObjectKeys>): void {
    this.keys = array;
  }

  public equal(int: TypescriptInterface): boolean {
    if (int instanceof ObjectInterface) {
      let isEqual = true;

      if (this.name !== int.name) {
        const compareKeysInterfaces = int.getKeysInterfaces();

        for (let i = 0; i < compareKeysInterfaces.length && isEqual; i++) {
          const areEqual = this.keys.some((k) => {
            const hasTheSameKey =
              k.keyName === compareKeysInterfaces[i].keyName;

            const hasSameInterface = this.equalArrayInterfaces(
              compareKeysInterfaces[i].fieldInterface,
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

  constructor(array: any) {
    super();
    this.values = array.map((v: any) => TypescriptInterface.filterInterface(v));
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
