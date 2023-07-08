import { ChacaError } from "../errors/ChacaError.js";

interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = any, A = any> implements ISchemaField<A, K> {
  private valueFunction: (args: A) => K;
  private args: A;
  private name: string;

  constructor(name: string, func: (args: A) => K, args: A) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new ChacaError("The schema field must have a name");
    }

    this.name = name;
    this.valueFunction = func;
    this.args = args;
  }

  public getName(): string {
    return this.name;
  }

  public getValue(a?: A): K {
    const ar =
      a && typeof a === "object" && !Array.isArray(a) && a !== null
        ? a
        : this.args;

    return this.valueFunction(ar);
  }
}
