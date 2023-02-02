import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";

export abstract class ChacaTreeNode {
  constructor(protected readonly nodeConfig: ChacaTreeNodeConfig) {}

  public abstract getNoArrayNode(): ChacaTreeNode;

  get name() {
    return this.nodeConfig.name;
  }

  get isArray() {
    return this.nodeConfig.isArray;
  }

  get posibleNull() {
    return this.nodeConfig.posibleNull;
  }
}
