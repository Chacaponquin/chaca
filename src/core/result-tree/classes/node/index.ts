import { NodeRoute } from "../../../input-tree/core/node/value-object/route";
import { SingleResultNode } from "../single-result";

export interface GetRefValueProps {
  search: NodeRoute;
  caller: NodeRoute;
  baseSearch: NodeRoute;
}

export abstract class FieldNode {
  constructor(readonly name: string) {}

  protected abstract value(): unknown | unknown[];
  abstract getNodeByRoute(fieldTreeRoute: string[]): FieldNode;

  protected abstract getRefValueByNodeRoute(
    props: GetRefValueProps,
  ): SingleResultNode;

  getRefValueByRoute(props: GetRefValueProps): SingleResultNode {
    const value = this.getRefValueByNodeRoute(props);
    return value;
  }

  getRealValue() {
    return this.value();
  }
}
