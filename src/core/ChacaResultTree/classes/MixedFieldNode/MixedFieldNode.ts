import { ChacaError } from "../../../../errors/ChacaError.js";
import { FieldNode } from "../FieldNode/FieldNode.js";
import { SingleResultNode } from "../SingleResultNode/SingleResultNode.js";

export class MixedFieldNode extends FieldNode {
  public nodes: Array<FieldNode> = [];

  public insertNode(node: FieldNode): void {
    this.nodes.push(node);
  }

  public getValue(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.nodeConfig.name]: n.getRealValue() };
    });

    return resultObject;
  }

  public getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    let returnNode = undefined;

    for (let i = 0; i < this.nodes.length && returnNode === undefined; i++) {
      if (this.nodes[i].nodeConfig.name === fieldTreeRoute[0]) {
        returnNode = this.nodes[i].getNodeByRoute(fieldTreeRoute.slice(1));
      }
    }

    if (returnNode) {
      return returnNode;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  public getRefValueByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): SingleResultNode {
    let returnNode = undefined;

    for (let i = 0; i < this.nodes.length && returnNode === undefined; i++) {
      if (this.nodes[i].nodeConfig.name === fieldTreeRoute[0]) {
        returnNode = this.nodes[i].getRefValueByRoute(fieldTreeRoute.slice(1));
      }
    }

    if (returnNode) {
      return returnNode;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
