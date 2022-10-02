import { ReturnValue } from "./ReturnValue";

interface ISchemaField<T> {
  getValue(args: T): ReturnValue;
}

export class SchemaField<T = any> implements ISchemaField<T> {
  private name: string;
  private valueFunction: (args: T) => ReturnValue;
  private args: T;

  constructor(name: string, func: (args: T) => ReturnValue, args: T) {
    this.name = name;
    this.valueFunction = func;
    this.args = args;
  }

  public getValue(): ReturnValue {
    return this.valueFunction(this.args);
  }
}
