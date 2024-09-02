import { SchemaFieldType } from "../core/schema/interfaces/schema";

export type ModuleFunction<V = any, A = never> = (...a: A[]) => V;

export class Module<T = any, A = never> extends SchemaFieldType {
  private readonly args: A[];

  constructor(private readonly func: ModuleFunction<T, A>, ...args: A[]) {
    super();
    this.args = args;
  }

  getValue(...a: A[]): T {
    if (a.length > 0) {
      return this.func(...a);
    } else {
      return this.func(...this.args);
    }
  }
}
