import { ChacaError } from "../../../../errors";
import { FieldNode } from "../FieldNode/FieldNode";
import { SingleResultNode } from "../SingleResultNode/SingleResultNode";

export class DocumentTree<D> {
  private nodes: Array<FieldNode> = [];

  public insertField(newField: FieldNode) {
    this.nodes.push(newField);
  }

  public insertKeyField(newKey: FieldNode) {
    this.nodes = [newKey, ...this.nodes];
  }

  public getDocumentObject(): D {
    let returnObject = {} as D;

    for (const n of this.nodes) {
      const nodeName = n.name;
      const nodeValue = n.getRealValue();

      returnObject = { ...returnObject, [nodeName]: nodeValue };
    }

    return returnObject;
  }

  public getNodeByNodeRoute(fieldTreeRoute: Array<string>): FieldNode {
    let returnValue = undefined;

    for (let i = 0; i < this.nodes.length && returnValue === undefined; i++) {
      if (this.nodes[i].name === fieldTreeRoute[0]) {
        returnValue = this.nodes[i].getNodeByRoute(fieldTreeRoute.slice(1));
      }
    }

    if (returnValue) {
      return returnValue;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  public getRefValueByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): SingleResultNode {
    let returnValue = undefined;

    for (let i = 0; i < this.nodes.length && returnValue === undefined; i++) {
      if (this.nodes[i].name === fieldTreeRoute[0]) {
        returnValue = this.nodes[i].getRefValueByRoute(fieldTreeRoute.slice(1));
      }
    }

    if (returnValue) {
      return returnValue;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
