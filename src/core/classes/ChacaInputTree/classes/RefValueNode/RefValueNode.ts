import {
  ChacaError,
  NotEnoughValuesForRefError,
  TryRefANoKeyFieldError,
} from "../../../../../errors/ChacaError.js";
import { SchemaResolver } from "../../../SchemaResolver.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";
import { FieldToRefObject } from "../../../RefField/RefField.js";

export class RefValueNode extends ChacaTreeNode {
  private refFieldTreeRoute: Array<string>;
  private schemaRef: SchemaResolver | null;

  constructor(
    config: ChacaTreeNodeConfig,
    public readonly refField: FieldToRefObject,
    public readonly injectedSchemas: Array<SchemaResolver>,
  ) {
    super(config);

    this.refFieldTreeRoute = this.validateFieldTreeRoute(
      this.refField.refField,
    );

    this.schemaRef = null;
  }

  public searchSchemaRef(): void {
    let exists = -1;

    for (let i = 0; i < this.injectedSchemas.length && exists === -1; i++) {
      const inputTree = this.injectedSchemas[i].getInputTree();

      if (inputTree) {
        const found = inputTree.checkIfFieldExists(this.refFieldTreeRoute);

        if (found) {
          exists = i;
        }
      }
    }

    if (exists === -1) {
      throw new ChacaError(
        `From ${this.getFieldRouteString()}, The field ${
          this.refField.refField
        } does not exists`,
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
      throw new TryRefANoKeyFieldError(this.getNodeConfig().fieldTreeRoute);
    } else {
      return false;
    }
  }

  public getValue(): unknown | Array<unknown> {
    if (this.schemaRef) {
      if (
        (!this.schemaRef.isBuildingTrees() &&
          this.schemaRef.isFinishBuilding()) ||
        (!this.schemaRef.isBuildingTrees() &&
          !this.schemaRef.isFinishBuilding())
      ) {
        this.schemaRef.buildTrees();

        const allValues = this.schemaRef.getAllRefValuesByNodeRoute(
          this.refFieldTreeRoute,
          this,
        );

        if (this.refField.unique) {
          const noTakenValues = allValues.filter(
            (n) => !n.isTaken(this.getNodeConfig().fieldTreeRoute),
          );

          if (noTakenValues.length === 0) {
            throw new NotEnoughValuesForRefError(
              this.getNodeConfig().fieldTreeRoute,
              this.refFieldTreeRoute,
            );
          } else {
            const node = PrivateUtils.oneOfArray(noTakenValues);
            node.changeIsTaken(this.getNodeConfig().fieldTreeRoute);
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
      { ...this.getNodeConfig(), isArray: null },
      this.refField,
      this.injectedSchemas,
    );
  }
}
