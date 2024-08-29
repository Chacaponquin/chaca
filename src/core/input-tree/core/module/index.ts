import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node/node";
import { Module } from "../../../../modules";
import { TryRefANoKeyFieldError } from "../../../../errors";

export class ModuleNode extends ChacaTreeNode {
  constructor(config: ChacaTreeNodeConfig, private readonly schema: Module) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new ModuleNode(
      { ...this.getNodeConfig(), isArray: null },
      this.schema,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public getValue() {
    return this.schema.getValue();
  }
}
