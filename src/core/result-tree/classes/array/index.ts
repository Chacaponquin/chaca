import { ChacaError, NotExistRefFieldError } from "../../../../errors";
import { FieldNode, GetRefValueProps } from "../node";
import { SingleResultNode } from "../single-result";

interface Props {
  name: string;
  limit: number;
}

export class ArrayResultNode extends FieldNode {
  private nodes: FieldNode[] = [];
  readonly limit: number;

  constructor({ name, limit }: Props) {
    super(name);
    this.limit = limit;
  }

  value(): unknown[] {
    return this.nodes.map((n) => n.getRealValue());
  }

  insertNode(n: FieldNode) {
    this.nodes.push(n);
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

  getRefValueByNodeRoute({
    baseSearch,
    caller,
  }: GetRefValueProps): SingleResultNode {
    throw new NotExistRefFieldError(caller.string(), baseSearch.string());
  }
}
