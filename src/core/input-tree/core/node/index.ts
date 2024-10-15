import { DocumentTree, FieldNode } from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";

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
  constructor(private readonly nodeConfig: ChacaTreeNodeConfig) {}

  abstract getNoArrayNode(): InputTreeNode;
  abstract checkIfFieldExists(fieldTreeRoute: string[]): boolean;
  abstract generate(props: GenerateProps): FieldNode;

  static getRouteString(route: string[]): string {
    return route.join(".");
  }

  getParentName(): string {
    return this.nodeConfig.fieldTreeRoute.at(-2) as string;
  }

  getRouteString(): string {
    return InputTreeNode.getRouteString(this.getFieldRoute());
  }

  getNodeConfig(): ChacaTreeNodeConfig {
    return this.nodeConfig;
  }

  getNodeName(): string {
    const arrayRoute = this.nodeConfig.fieldTreeRoute;
    return arrayRoute[arrayRoute.length - 1];
  }

  getFieldRoute() {
    return this.nodeConfig.fieldTreeRoute;
  }

  getIsArray() {
    return this.nodeConfig.isArray;
  }

  getPossibleNull() {
    return this.nodeConfig.possibleNull;
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
