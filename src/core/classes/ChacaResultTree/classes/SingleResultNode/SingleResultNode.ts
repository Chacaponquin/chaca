import { ChacaError } from "../../../../../errors/ChacaError.js";
import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";

export class SingleResultNode extends FieldNode {
  private value: unknown;

  constructor(config: FieldNodeProps, value: unknown) {
    super(config);
    this.value = value;
  }

  protected getValue(): unknown {
    return this.value;
  }

  public getValueByNodeRoute(fieldTreeRoute: string[]): unknown {
    if (fieldTreeRoute.length === 0) {
      return this.getRealValue();
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
