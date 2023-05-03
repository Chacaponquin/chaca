import { ChacaError } from "../../../../../errors/ChacaError.js";
import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";

export class SingleResultNode extends FieldNode {
  private value: unknown;
  private taken = false;

  constructor(config: FieldNodeProps, value: unknown) {
    super(config);
    this.value = value;
  }

  protected getValue(): unknown {
    return this.value;
  }

  public changeIsTaken() {
    this.taken = true;
  }

  public isTaken(): boolean {
    return this.taken;
  }

  public getValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
