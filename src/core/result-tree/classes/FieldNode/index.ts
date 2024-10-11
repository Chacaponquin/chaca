import { SingleResultNode } from "../SingleResultNode";

export abstract class FieldNode {
  constructor(readonly name: string) {}

  protected abstract value(): unknown | unknown[];
  abstract getNodeByRoute(fieldTreeRoute: Array<string>): FieldNode;

  protected abstract getRefValueByNodeRoute(
    fieldTreeRoute: string[],
  ): SingleResultNode;

  getRefValueByRoute(fieldTreeRoute: string[]): SingleResultNode {
    const value = this.getRefValueByNodeRoute(fieldTreeRoute);
    return value;
  }

  getRealValue() {
    return this.value();
  }
}
