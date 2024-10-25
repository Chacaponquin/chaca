import { DocumentTree, FieldNode } from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { NodeRoute } from "./value-object/route";
import { IsArray } from "../is-array";
import { PossibleNull } from "../possible-null";

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
  abstract generate(props: GenerateProps): FieldNode;

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

  isNull<K>({ currentDocument, store, index }: IsNullProps<K>): boolean {
    const value = this.getPossibleNull();

    return value.is({
      index: index,
      currentDocument: currentDocument,
      store: store,
    });
  }
}
