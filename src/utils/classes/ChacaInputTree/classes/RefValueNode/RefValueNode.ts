import { FieldToRefObject } from "../../../Resolvers/RefFieldResolver/RefFieldResolver.js";
import { SchemaResolver } from "../../../SchemaResolver.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class RefValueNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    public readonly refField: FieldToRefObject,
    public readonly injectedSchemas: Array<SchemaResolver>,
  ) {
    super(config);
  }

  public getValue() {
    let exists = false;

    for (let i = 0; i < this.injectedSchemas.length && !exists; i++) {
      this.injectedSchemas[i].getInputTree().check;
    }
    return "";
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new RefValueNode(
      { ...this.nodeConfig, isArray: null },
      this.refField,
      this.injectedSchemas,
    );
  }
}
