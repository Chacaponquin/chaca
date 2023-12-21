import {
  ChacaError,
  CyclicAccessDataError,
  NotEnoughValuesForRefError,
  NotExistFieldError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { SchemaResolver } from "../../../SchemaResolver/SchemaResolver";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { ChacaUtils } from "../../../ChacaUtils/ChacaUtils";
import { FieldToRefObject } from "../../../Fields/core/RefField/RefField";
import { SchemaStore } from "../../../SchemasStore/SchemaStore";
import { SingleResultNode } from "../../../ChacaResultTree/classes";
import { DatasetStore } from "../../../DatasetStore/DatasetStore";
import { SearchedRefValue } from "./interfaces/ref";

export class RefValueNode extends ChacaTreeNode {
  private refFieldTreeRoute: Array<string>;
  private schemaRefIndex: number | null = null;
  private allRefNodes: Array<SearchedRefValue> | null = null;
  private utils = new ChacaUtils();

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

  public getRefFieldRouteString(): string {
    return ChacaTreeNode.getRouteString(this.refFieldTreeRoute);
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
      throw new NotExistFieldError(
        this.getRouteString(),
        this.refField.refField,
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
      throw new TryRefANoKeyFieldError(this.getRouteString());
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
          store: new DatasetStore({
            schemasStore: this.schemasStore,
            omitCurrentDocument: refNode.document,
            omitResolver: currentSchemaResolver,
          }),
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
              this.getRouteString(),
              this.getRefFieldRouteString(),
            );
          } else {
            const node = this.utils.oneOfArray(noTakenValues);
            node.changeIsTaken(this.getFieldRoute());

            return node.getRealValue();
          }
        } else {
          if (allValues.length === 0) {
            throw new NotEnoughValuesForRefError(
              this.getRouteString(),
              this.getRefFieldRouteString(),
            );
          }

          return this.utils.oneOfArray(allValues).getRealValue();
        }
      } else {
        throw new CyclicAccessDataError(
          `The field ${this.getRouteString()} is trying to access ${this.getRefFieldRouteString()}, and it uses that field to create itself`,
        );
      }
    } else {
      throw new ChacaError(
        `First find the schema resolver for the ref field '${this.getRouteString()}'`,
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
