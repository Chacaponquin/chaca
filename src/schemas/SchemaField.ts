import { CHDataError } from "../errors/CHDataError";

interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = unknown, T = any> implements ISchemaField<T, K> {
  private valueFunction: (args: T) => K;
  private args: T;

  constructor(public readonly name: string, func: (args: T) => K, args: T) {
    if (typeof name !== "string" || name.length === 0)
      throw new CHDataError("The SchemaField should have a name");
    this.valueFunction = func;
    this.args = args;
  }

  public getValue(a?: T): K {
    const ar =
      a && typeof a === "object" && !Array.isArray(a) && a !== null
        ? a
        : this.args;
    return this.valueFunction(ar);
  }
}
