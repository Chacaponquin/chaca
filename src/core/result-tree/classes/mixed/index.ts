import { ChacaError } from "../../../../errors";
import { FieldNode } from "../node";
import { SingleResultNode } from "../single-result";

export class MixedFieldNode extends FieldNode {
  public nodes: FieldNode[] = [];

  public insertNode(node: FieldNode): void {
    this.nodes.push(node);
  }

  public value(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.name]: n.getRealValue() };
    });

    return resultObject;
  }

  public getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    let returnNode = undefined;

    for (let i = 0; i < this.nodes.length && returnNode === undefined; i++) {
      if (this.nodes[i].name === fieldTreeRoute[0]) {
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
      if (this.nodes[i].name === fieldTreeRoute[0]) {
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
