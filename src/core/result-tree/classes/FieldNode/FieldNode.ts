import { SingleResultNode } from "../SingleResultNode/SingleResultNode";

export abstract class FieldNode {
  constructor(public readonly name: string) {}

  protected abstract getValue(): unknown | Array<unknown>;
  public abstract getNodeByRoute(fieldTreeRoute: Array<string>): FieldNode;

  protected abstract getRefValueByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): SingleResultNode;

  public getRefValueByRoute(fieldTreeRoute: Array<string>): SingleResultNode {
    const value = this.getRefValueByNodeRoute(fieldTreeRoute);
    return value;
  }

  public getRealValue() {
    return this.getValue();
  }
}
