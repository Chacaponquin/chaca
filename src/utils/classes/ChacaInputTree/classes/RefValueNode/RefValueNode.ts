import { ChacaError } from "../../../../../errors/ChacaError.js";
import { FieldToRefObject } from "../../../Resolvers/RefFieldResolver/RefFieldResolver.js";
import { SchemaResolver } from "../../../SchemaResolver.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { TryRefARefFieldError } from "../../errors/index.js";

export class RefValueNode extends ChacaTreeNode {
  private fieldTreeRoute: Array<string>;

  constructor(
    config: ChacaTreeNodeConfig,
    public readonly refField: FieldToRefObject,
    public readonly injectedSchemas: Array<SchemaResolver>,
  ) {
    super(config);

    this.fieldTreeRoute = this.validateFieldTreeRoute(this.refField.refField);

    let exists = false;
    for (let i = 0; i < this.injectedSchemas.length && !exists; i++) {
      exists = this.injectedSchemas[i]
        .getInputTree()
        .checkIfFieldExists(this.fieldTreeRoute);
    }
  }

  private validateFieldTreeRoute(route: string): Array<string> {
    const saveRoute = route.split(".");

    if (saveRoute.length === 0) {
      throw new ChacaError("You can't ref an empty field");
    } else {
      return saveRoute;
    }
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefARefFieldError();
    } else {
      return false;
    }
  }

  public getValue() {
    return "";
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new RefValueNode(
      { ...this.nodeConfig, isArray: null },
      this.refField,
      this.injectedSchemas,
    );
  }
}
