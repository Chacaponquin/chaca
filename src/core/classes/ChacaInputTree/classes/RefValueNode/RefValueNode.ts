import {
  ChacaError,
  NotEnoughValuesForRefError,
  TryRefANoKeyFieldError,
} from "../../../../../errors/ChacaError.js";
import { FieldToRefObject } from "../../../Resolvers/RefFieldResolver/RefFieldResolver.js";
import { SchemaResolver } from "../../../SchemaResolver.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";

export class RefValueNode extends ChacaTreeNode {
  private fieldTreeRoute: Array<string>;
  private schemaRef: SchemaResolver | null;

  constructor(
    config: ChacaTreeNodeConfig,
    public readonly refField: FieldToRefObject,
    public readonly injectedSchemas: Array<SchemaResolver>,
  ) {
    super(config);

    this.fieldTreeRoute = this.validateFieldTreeRoute(this.refField.refField);

    this.schemaRef = null;
  }

  public searchSchemaRef(): void {
    let exists = -1;

    for (let i = 0; i < this.injectedSchemas.length && exists === -1; i++) {
      const inputTree = this.injectedSchemas[i].getInputTree();

      if (inputTree) {
        const found = inputTree.checkIfFieldExists(this.fieldTreeRoute);

        if (found) {
          exists = i;
        }
      }
    }

    if (exists === -1) {
      throw new ChacaError(
        `From ${this.nodeConfig.name}, The field ${this.refField.refField} does not exists`,
      );
    } else {
      this.schemaRef = this.injectedSchemas[exists];
    }
  }

  public getSchemaRef() {
    return this.schemaRef;
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
      throw new TryRefANoKeyFieldError(this.nodeConfig.name);
    } else {
      return false;
    }
  }

  public getValue(): unknown | Array<unknown> {
    if (this.schemaRef) {
      this.schemaRef.buildTrees();

      if (
        (!this.schemaRef.isBuildingTrees() &&
          this.schemaRef.isFinishBuilding()) ||
        (!this.schemaRef.isBuildingTrees() &&
          !this.schemaRef.isFinishBuilding())
      ) {
        const allValues = this.schemaRef.getAllValuesByNodeRoute(
          this.fieldTreeRoute,
          this,
        );

        if (this.refField.unique) {
          const noTakenValues = allValues.filter((n) => !n.isTaken());

          if (noTakenValues.length === 0) {
            throw new NotEnoughValuesForRefError(this.nodeConfig.name);
          } else {
            const node = PrivateUtils.oneOfArray(noTakenValues);
            node.changeIsTaken();
            return node.getRealValue();
          }
        } else {
          return PrivateUtils.oneOfArray(allValues).getRealValue();
        }
      } else {
        throw new ChacaError(
          `You are trying to access ${
            this.refField.refField
          } when the data in ${this.schemaRef.getSchemaName()} is not finish`,
        );
      }
    } else {
      return null;
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new RefValueNode(
      { ...this.nodeConfig, isArray: null },
      this.refField,
      this.injectedSchemas,
    );
  }
}
