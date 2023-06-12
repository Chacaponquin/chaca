import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { CustomValueNode } from "../CustomValueNode/CustomValueNode.js";
import { RefValueNode } from "../RefValueNode/RefValueNode.js";
import { SchemaValueNode } from "../SchemaValueNode/SchemaValueNode.js";
import { SequenceValueNode } from "../SequenceValueNode/SequenceValueNode.js";
import { DocumentTree } from "../../../ChacaResultTree/classes/DocumentTree/DocumentTree.js";

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

  public getValue<D>(
    currentDocument: number,
    store: DatasetStore,
    restDocuments: Array<DocumentTree<D>>,
    currentSchemaResolver: number,
  ) {
    if (this.fieldNode instanceof RefValueNode) {
      return this.fieldNode.getValue(currentDocument, currentSchemaResolver);
    } else if (this.fieldNode instanceof SchemaValueNode) {
      return this.fieldNode.getValue();
    } else if (this.fieldNode instanceof CustomValueNode) {
      return this.fieldNode.getValue(currentDocument, store, restDocuments);
    } else {
      return this.fieldNode.getNextValue();
    }
  }
}
