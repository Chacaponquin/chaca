import { ChacaError } from "../../../../errors";
import { FieldNode } from "../node";
import { SingleResultNode } from "../single-result";

interface Props {
  name: string;
  limit: number;
}

export class ArrayResultNode extends FieldNode {
  private arrayNodes: FieldNode[] = [];
  readonly limit: number;

  constructor({ name, limit }: Props) {
    super(name);
    this.limit = limit;
  }

  value(): unknown[] {
    return this.arrayNodes.map((n) => n.getRealValue());
  }

  insertNode(n: FieldNode) {
    this.arrayNodes.push(n);
  }

  getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  getRefValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
    if (fieldTreeRoute.length === 0) {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
