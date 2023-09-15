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
      isPossibleNull: this.getPossibleNull(),
    };
  }

  public abstract getNoArrayNode(): ChacaTreeNode;
  public abstract checkIfFieldExists(fieldTreeRoute: Array<string>): boolean;

  public getNodeName(): string {
    const arrayRoute = this.nodeConfig.fieldTreeRoute;
    return arrayRoute[arrayRoute.length - 1];
  }

  public getFieldRoute() {
    return this.nodeConfig.fieldTreeRoute;
  }

  public getIsArray() {
    return this.nodeConfig.isArray;
  }

  public getFieldRouteString() {
    return this.nodeConfig.fieldTreeRoute.join(".");
  }

  public getPossibleNull() {
    return this.nodeConfig.possibleNull;
  }
}
