import { ChacaError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNode } from "../node";
import { CustomValueNode } from "../custom";
import { RefValueNode } from "../ref";
import { SequenceValueNode } from "../sequence";

export type KeyValueNodeProps =
  | RefValueNode
  | SequenceValueNode
  | CustomValueNode;

interface Props {
  currentDocument: number;
  store: DatasetStore;
  currentSchemaResolver: number;
}

export class KeyValueNode extends ChacaTreeNode {
  constructor(
    fieldTreeRoute: string[],
    private readonly fieldNode: KeyValueNodeProps,
  ) {
    super({ fieldTreeRoute: fieldTreeRoute, isArray: null, possibleNull: 0 });
  }

  getNoArrayNode(): ChacaTreeNode {
    return new KeyValueNode(
      this.getNodeConfig().fieldTreeRoute,
      this.fieldNode,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    return fieldTreeRoute.length === 0;
  }

  value({ currentDocument, currentSchemaResolver, store }: Props): unknown {
    let resultValue: unknown;

    if (this.fieldNode instanceof RefValueNode) {
      resultValue = this.fieldNode.value(
        currentDocument,
        currentSchemaResolver,
      );
    } else if (this.fieldNode instanceof CustomValueNode) {
      resultValue = this.fieldNode.value({
        datasetStore: store,
        fields: currentDocument,
      });
    } else {
      resultValue = this.fieldNode.value();
    }

    if (
      typeof resultValue === "string" ||
      typeof resultValue === "number" ||
      resultValue instanceof Date
    ) {
      return resultValue;
    } else if (resultValue === null) {
      throw new ChacaError(
        `The key value ${this.getRouteString()} can not be null`,
      );
    } else {
      throw new ChacaError(
        `The key value ${this.getRouteString()} has to be an string, number or Date`,
      );
    }
  }
}
