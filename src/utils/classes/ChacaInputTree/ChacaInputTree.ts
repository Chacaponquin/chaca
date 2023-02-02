import { ChacaError } from "../../../errors/ChacaError.js";
import {
  ResolverObject,
  SchemaToResolve,
} from "../../interfaces/schema.interface.js";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  MixedFieldResolver,
  SchemaFieldResolver,
} from "../Resolvers/index.js";
import { Schema } from "../schemas/Schema/Schema.js";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  MixedValueNode,
  SchemaValueNode,
} from "./classes/index.js";

export class ChacaInputTree<T> {
  private nodes: Array<ChacaTreeNode> = [];

  constructor(schemaToResolve: SchemaToResolve<T>) {
    for (const [key, obj] of Object.entries<ResolverObject>(
      schemaToResolve as any,
    )) {
      const newNode = this.createNodeByType(key, obj);
      this.insertNode(newNode);
    }
  }

  private createNodeByType(
    name: string,
    object: ResolverObject,
  ): ChacaTreeNode {
    let returnNode: ChacaTreeNode;

    const nodeConfig = {
      name,
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
        returnNode as MixedValueNode,
        object.type.schema,
      );
    } else {
      throw new ChacaError(`Dont exists that resolver`);
    }

    return returnNode;
  }

  private createSubNodesOfMixedField(
    parentNode: MixedValueNode,
    schema: Schema,
  ) {
    for (const [key, obj] of Object.entries<ResolverObject>(
      schema.getSchemaObject(),
    )) {
      const newNode = this.createNodeByType(key, obj);
      parentNode.insertNode(newNode);
    }
  }

  public insertNode(node: ChacaTreeNode) {
    this.nodes.push(node);
  }
}