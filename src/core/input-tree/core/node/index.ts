import { DocumentTree } from "../../../result-tree/classes";
import { FieldPossibleNull } from "../../../schema/value-object";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";

interface IsNullProps<K> {
  store: DatasetStore;
  currentDocument: DocumentTree<K>;
}

export abstract class ChacaTreeNode {
  constructor(private readonly nodeConfig: ChacaTreeNodeConfig) {}

  abstract getNoArrayNode(): ChacaTreeNode;
  abstract checkIfFieldExists(fieldTreeRoute: string[]): boolean;

  static getRouteString(route: string[]): string {
    return route.join(".");
  }

  getRouteString(): string {
    return ChacaTreeNode.getRouteString(this.getFieldRoute());
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
    const pos = this.nodeConfig.possibleNull;
    return typeof pos === "number" && pos > 0;
  }

  private nullPossibility(num: number): boolean {
    if (num > 0 && num < 100) {
      const randomVal = Math.floor(Math.random() * 101);

      if (randomVal <= num) {
        return true;
      } else {
        return false;
      }
    } else if (num === 100) {
      return true;
    } else {
      return false;
    }
  }

  isNull<K>(props: IsNullProps<K>): boolean {
    const possibleNull = this.nodeConfig.possibleNull;

    if (typeof possibleNull === "number") {
      return this.nullPossibility(possibleNull);
    } else {
      let result = possibleNull({
        currentFields: props.currentDocument.getDocumentObject(),
        store: props.store,
      });

      if (typeof result === "number") {
        result = FieldPossibleNull.validateNumber(result);
        return this.nullPossibility(result);
      } else {
        result = FieldPossibleNull.validateBoolean(result);
        return this.nullPossibility(result);
      }
    }
  }
}
