import { ChacaError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { InputTreeNode } from "../node";
import { CustomValueNode } from "../custom";
import { RefValueNode } from "../ref";
import { SequenceValueNode } from "../sequence";
import { NotNull } from "../possible-null";
import { NotArray } from "../is-array";

export type KeyFieldProps = RefValueNode | SequenceValueNode | CustomValueNode;

interface Props {
  currentDocument: number;
  store: DatasetStore;
  currentSchemaResolver: number;
}

export class KeyValueNode extends InputTreeNode {
  constructor(
    fieldTreeRoute: string[],
    private readonly fieldNode: KeyFieldProps,
  ) {
    super({
      fieldTreeRoute: fieldTreeRoute,
      isArray: new NotArray(),
      possibleNull: new NotNull(),
    });
  }

  getNoArrayNode(): InputTreeNode {
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

    if (resultValue === null) {
      throw new ChacaError(
        `The key value ${this.getRouteString()} can not be null`,
      );
    }

    return resultValue;
  }
}