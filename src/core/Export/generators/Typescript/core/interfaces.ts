import { ObjectInterface } from ".";

export class InterfacesToCreate {
  private _interfaces: ObjectInterface[] = [];

  interfaces() {
    return this._interfaces;
  }

  length() {
    return this._interfaces.length;
  }

  get(index: number) {
    return this._interfaces[index];
  }

  deleteInterface(name: string): void {
    this._interfaces = this._interfaces.filter((o) => o.name !== name);
  }

  private set(obj: ObjectInterface) {
    this._interfaces.push(obj);
  }

  areSimilarObjects(
    objInterfaceOne: ObjectInterface,
    objInterfaceTwo: ObjectInterface,
  ): boolean {
    if (objInterfaceOne.length() !== objInterfaceTwo.length()) {
      return false;
    }

    const { maxObject, minObject } = this.separateObjectsByLength(
      objInterfaceOne,
      objInterfaceTwo,
    );

    let cont = 0;
    for (let i = 0; i < maxObject.length() && cont < maxObject.length(); i++) {
      const exists = minObject
        .keys()
        .some((k) => maxObject.get(i).name === k.name);

      if (exists) {
        cont++;
      }
    }

    return cont === maxObject.length();
  }

  setInterface(object: ObjectInterface): ObjectInterface {
    let returnObject = object;

    let found = false;
    for (let i = 0; i < this.length() && !found; i++) {
      const actualInterface = this.get(i);
      const areSimiliar = this.areSimilarObjects(actualInterface, object);

      if (areSimiliar) {
        actualInterface.compareAndUpdate(object);
        returnObject = actualInterface;
        found = true;
      } else {
        returnObject = object;
      }
    }

    if (!found) {
      this.set(returnObject);
    }

    return returnObject;
  }

  separateObjectsByLength(
    objInterfaceOne: ObjectInterface,
    objInterfaceTwo: ObjectInterface,
  ) {
    let maxObject: ObjectInterface;
    let minObject: ObjectInterface;

    const len1 = objInterfaceOne.length();
    const len2 = objInterfaceTwo.length();

    if (len1 > len2 || len1 === len2) {
      maxObject = objInterfaceOne;
      minObject = objInterfaceTwo;
    } else {
      maxObject = objInterfaceTwo;
      minObject = objInterfaceOne;
    }

    return { maxObject, minObject };
  }
}
