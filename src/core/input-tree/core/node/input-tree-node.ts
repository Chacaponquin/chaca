import { DatasetStore } from "../../../dataset-store/dataset-store";
import { NodeRoute } from "./value-object/route";
import { IsArray } from "../is-array/is-array";
import { PossibleNull } from "../possible-null/possible-null";
import { DocumentTree } from "../../../result-tree/classes/document/document-tree";
import { FieldNode } from "../../../result-tree/classes/node/field-node";

export interface IsNullProps<K> {
  store: DatasetStore;
  currentDocument: DocumentTree<K>;
  index: number;
}

export interface GenerateProps {
  currentDocument: DocumentTree;
  store: DatasetStore;
  indexDoc: number;
  schemaIndex: number;
}

export abstract class InputTreeNode {
  constructor(
    protected readonly route: NodeRoute,
    protected readonly isArray: IsArray,
    protected readonly possibleNull: PossibleNull,
  ) {}

  abstract getNoArrayNode(): InputTreeNode;
  abstract checkIfFieldExists(fieldTreeRoute: string[]): boolean;
  abstract generate(props: GenerateProps): Promise<FieldNode>;

  getRouteString(): string {
    return this.route.string();
  }

  getName(): string {
    return this.route.name();
  }

  getFieldRoute() {
    return this.route;
  }

  getIsArray() {
    return this.isArray;
  }

  getPossibleNull() {
    return this.possibleNull;
  }

  isPossibleNull(): boolean {
    return this.getPossibleNull().can();
  }

  async isNull<K>({
    currentDocument,
    store,
    index,
  }: IsNullProps<K>): Promise<boolean> {
    const value = this.getPossibleNull();

    const result = await value.is({
      index: index,
      currentDocument: currentDocument,
      store: store,
    });

    return result;
  }
}
