import { ChacaError } from "../errors/ChacaError.js";

interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = unknown, A = any> implements ISchemaField<A, K> {
  private valueFunction: (args: A) => K;
  private args: A;

  constructor(public readonly name: string, func: (args: A) => K, args: A) {
    if (typeof name !== "string" || name.length === 0) {
      throw new ChacaError("The SchemaField should have a name");
    }
    this.valueFunction = func;
    this.args = args;
  }

  public getValue(a?: A): K {
    const ar =
      a && typeof a === "object" && !Array.isArray(a) && a !== null
        ? a
        : this.args;
    return this.valueFunction(ar);
  }
}
