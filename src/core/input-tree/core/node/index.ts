import { DocumentTree } from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";

interface IsNullProps<K> {
  store: DatasetStore;
  currentDocument: DocumentTree<K>;
  index: number;
}

export abstract class InputTreeNode {
  constructor(private readonly nodeConfig: ChacaTreeNodeConfig) {}

  abstract getNoArrayNode(): InputTreeNode;
  abstract checkIfFieldExists(fieldTreeRoute: string[]): boolean;

  static getRouteString(route: string[]): string {
    return route.join(".");
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
