import {
  ChacaError,
  CyclicAccessDataError,
  NotEnoughValuesForRefError,
  TryRefANoKeyFieldError,
} from "../../../../../errors/ChacaError.js";
import { SchemaResolver } from "../../../SchemaResolver.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";
import { FieldToRefObject } from "../../../RefField/RefField.js";
import { SchemaStore } from "../../../SchemasStore/SchemaStore.js";
import { SingleResultNode } from "../../../ChacaResultTree/classes/index.js";
import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";
import { SearchedRefValue } from "./interfaces/refNode.interface.js";

export class RefValueNode extends ChacaTreeNode {
  private refFieldTreeRoute: Array<string>;
  private schemaRefIndex: number | null = null;
  private allRefNodes: Array<SearchedRefValue> | null = null;

  constructor(
    config: ChacaTreeNodeConfig,
    public readonly refField: FieldToRefObject,
    public readonly schemasStore: SchemaStore,
  ) {
    super(config);

    this.refFieldTreeRoute = this.validateFieldTreeRoute(
      this.refField.refField,
    );
  }

  public getRefFieldRoute() {
    return this.refFieldTreeRoute;
  }

  public searchSchemaRef(): void {
    let exists = -1;

    const schemas = this.schemasStore.getSchemasResolvers();
    for (let i = 0; i < schemas.length && exists === -1; i++) {
      const inputTree = schemas[i].getInputTree();

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
      this.schemaRefIndex = exists;
    }
  }

  public getSchemaRef(): SchemaResolver | null {
    if (this.schemaRefIndex === null) {
      return null;
    } else {
      return this.schemasStore.getResolverByIndex(this.schemaRefIndex);
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
      throw new TryRefANoKeyFieldError(this.getFieldRoute());
    } else {
      return false;
    }
  }

  private filterRefNodesByConfig(
    schemaRef: SchemaResolver,
    currentDocumentIndex: number,
    currentSchemaResolverIndex: number,
  ): Array<SingleResultNode> {
    const allValues = this.allRefNodes
      ? this.allRefNodes
      : schemaRef.getAllRefValuesByNodeRoute(this.refFieldTreeRoute);

    if (!this.allRefNodes) {
      this.allRefNodes = allValues;
    }

    const currentSchemaResolver = this.schemasStore.getResolverByIndex(
      currentSchemaResolverIndex,
    );
    const currentFields = currentSchemaResolver
      .getResultTree()
      .getDocumentByIndex(currentDocumentIndex)
      .getDocumentObject();

    const returnRefValues: Array<SingleResultNode> = [];
    for (const refNode of allValues) {
      if (this.refField.where) {
        const isAccepted = this.refField.where({
          store: new DatasetStore(
            this.schemasStore,
            refNode.document,
            currentSchemaResolver,
          ),
          refFields: refNode.document.getDocumentObject(),
          currentFields,
        });

        if (isAccepted) {
          returnRefValues.push(refNode.resultNode);
        }
      } else {
        returnRefValues.push(refNode.resultNode);
      }
    }

    return returnRefValues;
  }

  public getValue(
    currentDocument: number,
    currentSchemaResolver: number,
  ): unknown | Array<unknown> {
    const schemaRef = this.getSchemaRef();
    if (schemaRef) {
      if (!schemaRef.dangerCyclic()) {
        // build schema ref trees
        schemaRef.buildTrees();

        // get all fields nodes to ref
        const allValues = this.filterRefNodesByConfig(
          schemaRef,
          currentDocument,
          currentSchemaResolver,
        );

        if (this.refField.unique) {
          const noTakenValues = allValues.filter(
            (n) => !n.isTaken(this.getFieldRoute()),
          );

          if (noTakenValues.length === 0) {
            throw new NotEnoughValuesForRefError(
              this.getFieldRoute(),
              this.refFieldTreeRoute,
            );
          } else {
            const node = PrivateUtils.oneOfArray(noTakenValues);
            node.changeIsTaken(this.getFieldRoute());

            return node.getRealValue();
          }
        } else {
          if (allValues.length === 0) {
            throw new NotEnoughValuesForRefError(
              this.getNodeConfig().fieldTreeRoute,
              this.refFieldTreeRoute,
            );
          }

          return PrivateUtils.oneOfArray(allValues).getRealValue();
        }
      } else {
        const refFieldName = this.refFieldTreeRoute.join(".");
        throw new CyclicAccessDataError(
          `The field ${this.getFieldRouteString()} is trying to access ${refFieldName}, and it uses that field to create itself`,
        );
      }
    } else {
      throw new ChacaError(
        `First find the schema resolver for the ref field '${this.getFieldRouteString()}'`,
      );
    }
  }

  public setSchemaRef(resolverIndex: number): void {
    this.schemaRefIndex = resolverIndex;
  }

  public getNoArrayNode(): ChacaTreeNode {
    const newRefNode = new RefValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.refField,
      this.schemasStore,
    );

    if (this.schemaRefIndex) {
      newRefNode.setSchemaRef(this.schemaRefIndex);
    }

    return newRefNode;
  }
}
