import { ChacaError } from "../../../../errors/ChacaError.js";
import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { CustomValueNode } from "../CustomValueNode/CustomValueNode.js";
import { RefValueNode } from "../RefValueNode/RefValueNode.js";
import { SchemaValueNode } from "../SchemaValueNode/SchemaValueNode.js";
import { SequenceValueNode } from "../SequenceValueNode/SequenceValueNode.js";

export type KeyValueNodeProps =
  | RefValueNode
  | SchemaValueNode
  | SequenceValueNode
  | CustomValueNode;

export class KeyValueNode extends ChacaTreeNode {
  constructor(
    fieldTreeRoute: Array<string>,
    private readonly fieldNode: KeyValueNodeProps,
  ) {
    super({ fieldTreeRoute, isArray: null, posibleNull: 0 });
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new KeyValueNode(
      this.getNodeConfig().fieldTreeRoute,
      this.fieldNode,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    return fieldTreeRoute.length === 0;
  }

  public getValue(
    currentDocument: number,
    store: DatasetStore,
    currentSchemaResolver: number,
  ): unknown {
    let resultValue: unknown;

    if (this.fieldNode instanceof RefValueNode) {
      resultValue = this.fieldNode.getValue(
        currentDocument,
        currentSchemaResolver,
      );
    } else if (this.fieldNode instanceof SchemaValueNode) {
      resultValue = this.fieldNode.getValue();
    } else if (this.fieldNode instanceof CustomValueNode) {
      resultValue = this.fieldNode.getValue(currentDocument, store);
    } else {
      resultValue = this.fieldNode.getNextValue();
    }

    if (
      typeof resultValue === "string" ||
      typeof resultValue === "number" ||
      resultValue instanceof Date
    ) {
      return resultValue;
    } else if (resultValue === null) {
      throw new ChacaError(
        `The key value ${this.getFieldRouteString()} can not be null`,
      );
    } else {
      throw new ChacaError(
        `The key value ${this.getFieldRouteString()} has to be an string, number or Date`,
      );
    }
  }
}
