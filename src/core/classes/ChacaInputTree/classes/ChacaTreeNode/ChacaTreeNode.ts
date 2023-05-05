import { FieldNodeProps } from "../../../ChacaResultTree/classes/FieldNode/FieldNode.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";

export abstract class ChacaTreeNode {
  constructor(private readonly nodeConfig: ChacaTreeNodeConfig) {}

  public getNodeConfig(): ChacaTreeNodeConfig {
    return this.nodeConfig;
  }

  public getResultNodeConfig(): FieldNodeProps {
    return {
      name: this.getNodeName(),
      isPosibleNull: this.getNodeConfig().posibleNull,
    };
  }

  public abstract getNoArrayNode(): ChacaTreeNode;

  public abstract checkIfFieldExists(fieldTreeRoute: Array<string>): boolean;

  public getNodeName(): string {
    const arrayRoute = this.nodeConfig.fieldTreeRoute;

    return arrayRoute[arrayRoute.length - 1];
  }

  public getFieldRouteString() {
    return this.nodeConfig.fieldTreeRoute.join(".");
  }
}
