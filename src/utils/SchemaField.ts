import { ReturnValue } from "./ReturnValue";

interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = ReturnValue, T = any>
  implements ISchemaField<T, K>
{
  private name: string;
  private valueFunction: (args: T) => K;
  private args: T;

  constructor(name: string, func: (args: T) => K, args: T) {
    this.name = name;
    this.valueFunction = func;
    this.args = args;
  }

  public getValue(): K {
    return this.valueFunction(this.args);
  }
}
