import {
  ChacaError,
  CyclicAccessDataError,
  NotEnoughValuesForRefError,
  NotExistFieldError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { GenerateProps, InputTreeNode } from "../node";
import { ChacaUtils } from "../../../utils";
import { FieldToRefObject } from "../../../fields/core/ref";
import { SchemaStore } from "../../../schema-store/store";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { SearchedRefValue } from "./interfaces/ref";
import { RefRoute } from "./value-object/route";
import { IsArray, NotArray } from "../is-array";
import { SchemaResolver } from "../../../schema-resolver";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

export class RefValueNode extends InputTreeNode {
  private refFieldTreeRoute: string[];
  private schemaRefIndex: number | null = null;
  private allRefNodes: SearchedRefValue[] | null = null;

  constructor(
    private readonly utils: ChacaUtils,
    route: NodeRoute,
    isArray: IsArray,
    possibleNull: PossibleNull,
    readonly refField: FieldToRefObject,
    readonly schemasStore: SchemaStore,
  ) {
    super(route, isArray, possibleNull);

    this.refFieldTreeRoute = new RefRoute(this.refField.refField).value();
  }

  isUnique() {
    return this.refField.unique;
  }

  getRefFieldRoute(): NodeRoute {
    return new NodeRoute(this.refFieldTreeRoute);
  }

  searchSchemaRef(): void {
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

  getSchemaRef(): SchemaResolver | null {
    if (this.schemaRefIndex === null) {
      return null;
    } else {
      return this.schemasStore.getResolverByIndex(this.schemaRefIndex);
    }
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
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
  ): SingleResultNode[] {
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

    const returnRefValues: SingleResultNode[] = [];
    for (const refNode of allValues) {
      if (this.refField.where) {
        const isAccepted = this.refField.where({
          store: new DatasetStore({
            schemasStore: this.schemasStore,
            omitCurrentDocument: refNode.document,
            omitResolver: currentSchemaResolver,
            caller: this.getRouteString(),
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

  private value(
    currentDocument: number,
    currentSchemaResolver: number,
  ): unknown | unknown[] {
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
              this.getRefFieldRoute().string(),
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
              this.getRefFieldRoute().string(),
            );
          }

          return this.utils.oneOfArray(allValues).getRealValue();
        }
      } else {
        throw new CyclicAccessDataError(
          `The field ${this.getRouteString()} is trying to access ${this.getRefFieldRoute().string()}, and it uses that field to create itself`,
        );
      }
    } else {
      throw new ChacaError(
        `First find the schema resolver for the ref field '${this.getRouteString()}'`,
      );
    }
  }

  generate({ schemaIndex, indexDoc }: GenerateProps): FieldNode {
    const refValue = this.value(indexDoc, schemaIndex);

    return new SingleResultNode({
      name: this.getNodeName(),
      value: refValue,
    });
  }

  setSchemaRef(resolverIndex: number): void {
    this.schemaRefIndex = resolverIndex;
  }

  getNoArrayNode(): InputTreeNode {
    const newRefNode = new RefValueNode(
      this.utils,
      this.route,
      new NotArray(),
      this.possibleNull,
      this.refField,
      this.schemasStore,
    );

    if (this.schemaRefIndex) {
      newRefNode.setSchemaRef(this.schemaRefIndex);
    }

    return newRefNode;
  }
}
