interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = any, A = any> implements ISchemaField<A, K> {
  private valueFunction: (args: A) => K;
  private args: A;

  constructor(func: (args: A) => K, args?: A) {
    this.valueFunction = func;
    this.args = args || ({} as A);
  }

  public getValue(a?: A): K {
    const args =
      a && typeof a === "object" && !Array.isArray(a) ? a : this.args;

    return this.valueFunction(args);
  }
}
