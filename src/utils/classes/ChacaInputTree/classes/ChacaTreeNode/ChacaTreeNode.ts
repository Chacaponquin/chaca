import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";

export abstract class ChacaTreeNode {
  constructor(public readonly nodeConfig: ChacaTreeNodeConfig) {}

  public abstract getNoArrayNode(): ChacaTreeNode;

  public getFieldInfo() {
    return {
      name: this.nodeConfig.name,
      isPosibleNull: this.nodeConfig.posibleNull,
      isArray: this.nodeConfig.isArray,
    };
  }
}
