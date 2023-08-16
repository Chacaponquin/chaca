interface ISchemaField<T, K> {
  getValue(args: T): K;
}

class Args<A> {
  private _value: A | null = null;

  constructor(args?: A) {
    if (args && typeof args === "object" && !Array.isArray(args)) {
      this._value = args;
    }
  }

  public value() {
    return this._value;
  }
}

export class SchemaField<K = any, A = any> implements ISchemaField<A, K> {
  private valueFunction: (args: A) => K;
  private args: A;

  constructor(func: (args: A) => K, args?: A) {
    this.valueFunction = func;
    this.args = new Args(args).value() || ({} as A);
  }

  public getValue(a?: A): K {
    const newArgs = new Args(a).value();
    const value = this.valueFunction(newArgs === null ? this.args : newArgs);

    return value;
  }
}
