import { PrivateUtils } from "../../../utils/helpers/PrivateUtils.js";

interface ObjectKeys {
  keyName: string;
  fieldInterface: Array<TypescriptInterface>;
}

export abstract class TypescriptInterface {
  private aldreadyUsed = false;

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
        t = ObjectInterface.setObjectToCreate(newObject as ObjectInterface);
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

  public isUsed() {
    return this.aldreadyUsed;
  }

  public changeIsUsed(): void {
    this.aldreadyUsed = true;
  }

  protected pushIsNotInArray(
    array: Array<TypescriptInterface>,
    int: TypescriptInterface,
  ) {
    if (!array.some((v) => v.equal(int))) {
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
        fieldInterface: [ObjectInterface.filterInterface(fieldValue)],
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
    let found = object;

    for (let i = 0; i < this.objectsToCreate.length && found === object; i++) {
      const compare = this.objectsToCreate[i].compareAndUpdate(object);

      if (compare === this.objectsToCreate[i]) {
        found = this.objectsToCreate[i];
      }
    }

    if (found === object) {
      this.objectsToCreate.push(found);
    }

    return found;
  }

  public static deleteObjectToCreateByName(name: string): void {
    this.objectsToCreate = this.objectsToCreate.filter((o) => o.name !== name);
  }

  public getInterface(): string {
    return this.name;
  }

  public getInterfaceCode(): string {
    const returnInterface =
      `interface ${this.name}{` +
      `${this.keys
        .map(
          (k) =>
            `${k.keyName}: ${k.fieldInterface
              .map((i) => i.getInterface())
              .join(" | ")}`,
        )
        .join(";")}` +
      "}";

    return returnInterface;
  }

  public getKeysInterfaces() {
    return this.keys;
  }

  public compareAndUpdate(
    compareObjectInterface: ObjectInterface,
  ): ObjectInterface {
    if (!compareObjectInterface.isUsed()) {
      compareObjectInterface.getKeysInterfaces().forEach((key) => {
        const found = this.keys.find((k) => k.keyName === key.keyName);

        if (found) {
          const communInterfaces = this.communInterfaces(
            key.fieldInterface,
            found.fieldInterface,
          );

          if (communInterfaces.length > 0) {
            compareObjectInterface.changeIsUsed();
            key.fieldInterface = communInterfaces;
          }
        }
      });

      if (compareObjectInterface.isUsed()) {
        ObjectInterface.deleteObjectToCreateByName(compareObjectInterface.name);
        return this;
      } else {
        return compareObjectInterface;
      }
    } else {
      return this;
    }
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
        const compareKeysInterfaces = int.getKeysInterfaces();
        for (let i = 0; i < compareKeysInterfaces.length && isEqual; i++) {
          const exists = this.keys.some((k) => {
            return (
              k.keyName === compareKeysInterfaces[i].keyName &&
              this.equalArrayInterfaces(
                compareKeysInterfaces[i].fieldInterface,
                k.fieldInterface,
              )
            );
          });

          if (!exists) {
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
    return this.name === int.getInterface();
  }
}

export class ArrayInterface extends TypescriptInterface {
  private values: Array<TypescriptInterface> = [];

  constructor(array: any) {
    super();
    this.values = array.map((v: any) => ArrayInterface.filterInterface(v));
    this.updateValuesInterfaces();
  }

  public equal(int: TypescriptInterface): boolean {
    if (int instanceof ArrayInterface) {
      let isEqual = true;

      const compareValueInterfaces = int.getValuesInterfaces();
      for (let i = 0; i < compareValueInterfaces.length && isEqual; i++) {
        const exists = this.values.some((v) =>
          v.equal(compareValueInterfaces[i]),
        );

        if (!exists) {
          isEqual = false;
        }
      }

      return isEqual;
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

        const aldreadyExists = actualInterface.isUsed();
        if (!aldreadyExists) {
          if (i !== this.values.length - 1) {
            for (let j = i + 1; j < this.values.length; j++) {
              const compareInterface = this.values[j];

              const areTheSameInterface =
                actualInterface.equal(compareInterface);
              if (!areTheSameInterface) {
                if (
                  actualInterface instanceof ObjectInterface &&
                  compareInterface instanceof ObjectInterface
                ) {
                  actualInterface.compareAndUpdate(compareInterface);
                  updatedInterfaces.push(actualInterface);
                } else {
                  this.pushIsNotInArray(updatedInterfaces, actualInterface);
                }
              } else {
                this.pushIsNotInArray(updatedInterfaces, actualInterface);
                compareInterface.changeIsUsed();
              }
            }
          }

          // si es el último elemento significa que su interfaz no se repite en todo el array
          // porque si existiera ya hubiera sido usada
          else {
            updatedInterfaces.push(actualInterface);
          }
        }
      }

      this.values = updatedInterfaces;
    }
  }

  public getValuesInterfaces() {
    return this.values;
  }
}
