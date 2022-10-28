import { ReturnValue } from "../utils/interfaces/value.interface";

interface ISchemaField<T, K> {
  getValue(args: T): K;
}

export class SchemaField<K = ReturnValue, T = any>
  implements ISchemaField<T, K>
{
  private valueFunction: (args: T) => K;
  private args: T;

  constructor(public readonly name: string, func: (args: T) => K, args: T) {
    this.valueFunction = func;
    this.args = args;
  }

  public getValue(): K {
    return this.valueFunction(this.args);
  }
}
