import { ChacaError } from "../../../errors/ChacaError.js";
import {
  ResolverObject,
  SchemaToResolve,
} from "../../interfaces/schema.interface.js";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  KeyFieldResolver,
  MixedFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
} from "../Resolvers/index.js";
import { ChacaSchema } from "../ChacaSchema/ChacaSchema.js";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  KeyValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  SequentialValueNode,
} from "./classes/index.js";
import { orderFieldsByPriority } from "./utils/treeUtils.js";
import { SchemaResolver } from "../SchemaResolver.js";
import { SequentialFieldResolver } from "../Resolvers/SequentialFieldResolver/SequentialFieldResolver.js";

export class ChacaInputTree<T> {
  private nodes: Array<ChacaTreeNode> = [];
  private injectedSchemas: Array<SchemaResolver>;
  private schemaName: string;

  // ref nodes
  private refToResolve: Array<RefValueNode> = [];

  constructor(
    schemaName: string,
    schemaToResolve: SchemaToResolve<T>,
    injectedSchemas: Array<SchemaResolver>,
  ) {
    this.injectedSchemas = injectedSchemas;
    this.schemaName = schemaName;

    for (const [key, obj] of Object.entries<ResolverObject>(schemaToResolve)) {
      const fieldRoute = [this.schemaName, key];
      const newNode = this.createNodeByType(fieldRoute, obj);
      this.insertNode(newNode);
    }
  }

  public getFields() {
    return this.nodes;
  }

  private createNodeByType(
    actualRoute: Array<string>,
    object: ResolverObject,
  ): ChacaTreeNode {
    let returnNode: ChacaTreeNode;

    if (object instanceof SequentialFieldResolver) {
      returnNode = new SequentialValueNode(actualRoute, object.valuesArray);
    } else if (object instanceof KeyFieldResolver) {
      returnNode = new KeyValueNode(actualRoute, object.fieldFiunction);
    } else {
      const nodeConfig = {
        fieldTreeRoute: actualRoute,
        isArray: object.isArray,
        posibleNull: object.posibleNull,
      };

      if (object.type instanceof CustomFieldResolver) {
        returnNode = new CustomValueNode(nodeConfig, object.type.fun);
      } else if (object.type instanceof SchemaFieldResolver) {
        returnNode = new SchemaValueNode(nodeConfig, object.type.schema);
      } else if (object.type instanceof EnumFieldResolver) {
        returnNode = new EnumValueNode(nodeConfig, object.type.array);
      } else if (object.type instanceof MixedFieldResolver) {
        returnNode = new MixedValueNode(nodeConfig);
        this.createSubNodesOfMixedField(
          actualRoute,
          returnNode as MixedValueNode,
          object.type.schema,
        );
      } else if (object.type instanceof RefFieldResolver) {
        const newRefNode = new RefValueNode(
          nodeConfig,
          object.type.getRefField(),
          this.injectedSchemas,
        );

        this.refToResolve.push(newRefNode);
        returnNode = newRefNode;
      } else if (object.type instanceof SequentialFieldResolver) {
        returnNode = new SequentialValueNode(
          actualRoute,
          object.type.valuesArray,
        );
      } else if (object.type instanceof KeyFieldResolver) {
        returnNode = new KeyValueNode(actualRoute, object.type.fieldFiunction);
      } else {
        throw new ChacaError(`Dont exists that resolver`);
      }
    }
    return returnNode;
  }

  private createSubNodesOfMixedField(
    actualRoute: Array<string>,
    parentNode: MixedValueNode,
    schema: ChacaSchema,
  ) {
    for (const [key, obj] of Object.entries<ResolverObject>(
      schema.getSchemaObject(),
    )) {
      const fieldRoute = [...actualRoute, key];
      const newNode = this.createNodeByType(fieldRoute, obj);
      parentNode.insertNode(newNode);
    }
  }

  public insertNode(node: ChacaTreeNode) {
    this.nodes.push(node);
    this.nodes = orderFieldsByPriority(this.nodes);
  }

  public checkIfFieldExists(fieldTreeRoute: Array<string>): boolean {
    if (this.schemaName === fieldTreeRoute[0]) {
      let exists = false;

      for (let i = 0; i < this.nodes.length && !exists; i++) {
        if (this.nodes[i].getNodeName() === fieldTreeRoute[1]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(2);
          const found = this.nodes[i].checkIfFieldExists(
            routeWithoutFirstElement,
          );

          if (!found) {
            break;
          } else {
            exists = true;
          }
        }
      }

      return exists;
    } else {
      return false;
    }
  }

  public searchRefNodes(): void {
    this.refToResolve.forEach((r) => r.searchSchemaRef());
  }
}
