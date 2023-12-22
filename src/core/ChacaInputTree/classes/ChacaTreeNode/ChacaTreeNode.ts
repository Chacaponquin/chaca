import { DocumentTree } from "../../../ChacaResultTree/classes";
import { FieldPossibleNull } from "../../../ChacaSchema/value-object";
import { DatasetStore } from "../../../DatasetStore/DatasetStore";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";

interface IsNullProps<K> {
  store: DatasetStore;
  currentDocument: DocumentTree<K>;
}

export abstract class ChacaTreeNode {
  constructor(private readonly nodeConfig: ChacaTreeNodeConfig) {}

  public static getRouteString(route: Array<string>): string {
    return route.join(".");
  }

  public getRouteString(): string {
    return ChacaTreeNode.getRouteString(this.getFieldRoute());
  }

  public getNodeConfig(): ChacaTreeNodeConfig {
    return this.nodeConfig;
  }

  public abstract getNoArrayNode(): ChacaTreeNode;
  public abstract checkIfFieldExists(fieldTreeRoute: Array<string>): boolean;

  public getNodeName(): string {
    const arrayRoute = this.nodeConfig.fieldTreeRoute;
    return arrayRoute[arrayRoute.length - 1];
  }

  public getFieldRoute() {
    return this.nodeConfig.fieldTreeRoute;
  }

  public getIsArray() {
    return this.nodeConfig.isArray;
  }

  public getPossibleNull() {
    return this.nodeConfig.possibleNull;
  }

  public isPossibleNull(): boolean {
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

  public isNull<K>(props: IsNullProps<K>): boolean {
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
