import { ChacaError } from "../../errors/ChacaError.js";
import {
  ResolverObject,
  SchemaToResolve,
} from "../ChacaSchema/interfaces/schema.interface.js";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  KeyFieldResolver,
  MixedFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
} from "../Resolvers/core/index.js";
import { ChacaSchema } from "../ChacaSchema/ChacaSchema.js";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  KeyValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  SequenceValueNode,
  SequentialValueNode,
} from "./classes/index.js";
import { InputTreeUtils } from "./utils/input_tree_utils.js";
import { SequentialFieldResolver } from "../Resolvers/core/SequentialFieldResolver/SequentialFieldResolver.js";
import { SchemaStore } from "../SchemasStore/SchemaStore.js";

export class ChacaInputTree {
  private inputTreeUtils = new InputTreeUtils();

  private nodes: Array<ChacaTreeNode> = [];
  private schemasStore: SchemaStore;
  private schemaName: string;

  // ref nodes
  private refToResolve: Array<RefValueNode> = [];

  constructor(
    schemaName: string,
    schemaToResolve: SchemaToResolve,
    schemasStore: SchemaStore,
  ) {
    this.schemasStore = schemasStore;
    this.schemaName = schemaName;

    for (const [key, obj] of Object.entries<ResolverObject>(schemaToResolve)) {
      const fieldRoute = [this.schemaName, key];
      const newNode = this.createNodeByType(fieldRoute, obj);
      this.insertNode(newNode);
    }
  }

  public getRefNodes(): Array<RefValueNode> {
    return this.refToResolve;
  }

  public getFields() {
    return this.nodes;
  }

  private createNodeByType(
    actualRoute: Array<string>,
    object: ResolverObject,
  ): ChacaTreeNode {
    let returnNode: ChacaTreeNode;

    const nodeConfig = {
      fieldTreeRoute: actualRoute,
      isArray: object.isArray,
      possibleNull: object.possibleNull,
    };

    if (object.type instanceof CustomFieldResolver) {
      returnNode = new CustomValueNode(nodeConfig, object.type.fun);
    } else if (object.type instanceof SchemaFieldResolver) {
      returnNode = new SchemaValueNode(nodeConfig, object.type.schema);
    } else if (object.type instanceof EnumFieldResolver) {
      returnNode = new EnumValueNode(nodeConfig, object.type.array);
    } else if (object.type instanceof MixedFieldResolver) {
      returnNode = new MixedValueNode(nodeConfig, this.inputTreeUtils);
      this.createSubNodesOfMixedField(
        actualRoute,
        returnNode as MixedValueNode,
        object.type.schema,
      );
    } else if (object.type instanceof RefFieldResolver) {
      const newRefNode = new RefValueNode(
        nodeConfig,
        object.type.refField,
        this.schemasStore,
      );

      // añadir a lo ref fields del tree
      this.refToResolve.push(newRefNode);
      returnNode = newRefNode;
    } else if (object.type instanceof SequentialFieldResolver) {
      returnNode = new SequentialValueNode({
        fieldTreeRoute: actualRoute,
        valuesArray: object.type.valuesArray,
        config: object.type.config,
        possibleNull: object.possibleNull,
      });
    } else if (object.type instanceof SequenceFieldResolver) {
      returnNode = new SequenceValueNode({
        fieldTreeRoute: actualRoute,
        config: object.type.getConfig(),
        possibleNull: object.possibleNull,
      });
    } else if (object.type instanceof KeyFieldResolver) {
      if (object.type.fieldType instanceof SchemaFieldResolver) {
        const schemaValueNode = new SchemaValueNode(
          {
            fieldTreeRoute: actualRoute,
            isArray: null,
            possibleNull: 0,
          },
          object.type.fieldType.schema,
        );

        returnNode = new KeyValueNode(actualRoute, schemaValueNode);
      } else if (object.type.fieldType instanceof SequenceFieldResolver) {
        const schemaValueNode = new SequenceValueNode({
          fieldTreeRoute: actualRoute,
          config: object.type.fieldType.getConfig(),
          possibleNull: 0,
        });

        returnNode = new KeyValueNode(actualRoute, schemaValueNode);
      } else if (object.type.fieldType instanceof CustomFieldResolver) {
        const customNode = new CustomValueNode(
          { fieldTreeRoute: actualRoute, isArray: null, possibleNull: 0 },
          object.type.fieldType.fun,
        );

        returnNode = new KeyValueNode(actualRoute, customNode);
      } else {
        const refValueNode = new RefValueNode(
          { fieldTreeRoute: actualRoute, isArray: null, possibleNull: 0 },
          object.type.fieldType.refField,
          this.schemasStore,
        );

        // añadir a lo ref fields del tree
        this.refToResolve.push(refValueNode);

        returnNode = new KeyValueNode(actualRoute, refValueNode);
      }
    } else {
      throw new ChacaError(
        `The field '${actualRoute.join(".")}' have an incorrect resolver`,
      );
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
    this.nodes = this.inputTreeUtils.orderNodesByPriority(this.nodes);
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

  public getPossibleNullNodes(): Array<ChacaTreeNode> {
    const nodes = [] as Array<ChacaTreeNode>;

    this.nodes.forEach((n) => {
      if (n.getPossibleNull() > 0) {
        nodes.push(n);
      }

      if (n instanceof MixedValueNode) {
        const subNodes = n.getPossibleNullNodes();
        subNodes.forEach((s) => nodes.push(s));
      }
    });

    return nodes;
  }

  public getKeyFields(): Array<KeyValueNode> {
    const keys = [] as Array<KeyValueNode>;

    this.nodes.forEach((n) => {
      if (n instanceof KeyValueNode) {
        keys.push(n);
      } else if (n instanceof MixedValueNode) {
        const subKeys = n.getKeyFields();
        subKeys.forEach((k) => keys.push(k));
      }
    });

    return keys;
  }
}
