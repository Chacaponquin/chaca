import { ChacaError } from "../../../../../errors/ChacaError.js";
import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";

export class SingleResultNode extends FieldNode {
  private value: unknown;
  private taken: Array<string> = [];

  constructor(config: FieldNodeProps, value: unknown) {
    super(config);
    this.value = value;
  }

  protected getValue(): unknown {
    return this.value;
  }

  public changeIsTaken(fieldRoute: Array<string>) {
    this.taken.push(fieldRoute.join("."));
  }

  public isTaken(fieldRoute: Array<string>): boolean {
    return this.taken.includes(fieldRoute.join("."));
  }

  public getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  public getRefValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
