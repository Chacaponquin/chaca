import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";
import { Module } from "../../../../modules";
import { TryRefANoKeyFieldError } from "../../../../errors";

export class ModuleNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    private readonly module: Module<any, any>,
  ) {
    super(config);
  }

  getNoArrayNode(): ChacaTreeNode {
    return new ModuleNode(
      { ...this.getNodeConfig(), isArray: null },
      this.module,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  getValue() {
    return this.module.getValue();
  }
}
