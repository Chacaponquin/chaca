import { ChacaError } from "../../errors";
import { ResolverObject, SchemaToResolve } from "../schema/interfaces/schema";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  KeyFieldResolver,
  MixedFieldResolver,
  ProbabilityFieldResolver,
  RefFieldResolver,
  SequenceFieldResolver,
} from "../resolvers/core";
import { Schema } from "../schema";
import {
  InputTreeNode,
  CustomValueNode,
  EnumValueNode,
  KeyValueNode,
  MixedValueNode,
  PickValueNode,
  ProbabilityValueNode,
  RefValueNode,
  SequenceValueNode,
  SequentialValueNode,
} from "./core";
import { SequentialFieldResolver } from "../resolvers/core/sequential";
import { SchemaStore } from "../schema-store/store";
import { PickFieldResolver } from "../resolvers/core/pick";
import { ChacaTreeNodeConfig } from "./interfaces/tree";
import { FieldIsArray } from "../schema/value-object";
import { ChacaUtils } from "../utils";
import { PossibleNullMapper } from "./core/map/possible-null";
import { NotNull } from "./core/possible-null";

interface Props {
  schemaName: string;
  schemaToResolve: SchemaToResolve;
  schemasStore: SchemaStore;
  count: number;
}

interface CreateNodeProps {
  actualRoute: string[];
  object: ResolverObject;
}

export class ChacaInputTree {
  private nodes: InputTreeNode[] = [];
  private schemasStore: SchemaStore;
  private schemaName: string;
  private count: number;

  // ref nodes
  private refToResolve: RefValueNode[] = [];

  private readonly nullMapper: PossibleNullMapper;

  constructor(
    private readonly utils: ChacaUtils,
    { schemaName, schemaToResolve, schemasStore, count }: Props,
  ) {
    this.nullMapper = new PossibleNullMapper(this.utils);

    this.schemasStore = schemasStore;
    this.schemaName = schemaName;
    this.count = count;

    for (const [key, obj] of Object.entries<ResolverObject>(schemaToResolve)) {
      const fieldRoute = [this.schemaName, key];

      const newNode = this.createNodeByType({
        actualRoute: fieldRoute,
        object: obj,
      });

      this.insertNode(newNode);
    }
  }

  getRefNodes(): RefValueNode[] {
    return this.refToResolve;
  }

  getFields() {
    return this.nodes;
  }

  private createNodeByType({
    actualRoute,
    object,
  }: CreateNodeProps): InputTreeNode {
    let returnNode: InputTreeNode;

    this.validateResolver(actualRoute, object);

    const possibleNull = this.nullMapper.execute({
      route: InputTreeNode.getRouteString(actualRoute),
      value: object.possibleNull,
      countDocs: this.count,
    });

    const nodeConfig: ChacaTreeNodeConfig = {
      fieldTreeRoute: actualRoute,
      isArray: object.isArray,
      possibleNull: possibleNull,
    };

    if (object.type instanceof CustomFieldResolver) {
      returnNode = new CustomValueNode(nodeConfig, object.type.fun);
    } else if (object.type instanceof PickFieldResolver) {
      returnNode = new PickValueNode(nodeConfig, object.type.values);
    } else if (object.type instanceof ProbabilityFieldResolver) {
      returnNode = new ProbabilityValueNode(nodeConfig, object.type.values);
    } else if (object.type instanceof EnumFieldResolver) {
      returnNode = new EnumValueNode(nodeConfig, object.type.array);
    } else if (object.type instanceof MixedFieldResolver) {
      const node = new MixedValueNode(nodeConfig);

      this.createSubNodesOfMixedField(actualRoute, node, object.type.schema);

      returnNode = node;
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
        possibleNull: possibleNull,
      });
    } else if (object.type instanceof SequenceFieldResolver) {
      returnNode = new SequenceValueNode({
        fieldTreeRoute: actualRoute,
        config: object.type.getConfig(),
        possibleNull: possibleNull,
      });
    } else if (object.type instanceof KeyFieldResolver) {
      if (object.type.fieldType instanceof SequenceFieldResolver) {
        const schemaValueNode = new SequenceValueNode({
          fieldTreeRoute: actualRoute,
          config: object.type.fieldType.getConfig(),
          possibleNull: new NotNull(),
        });

        returnNode = new KeyValueNode(actualRoute, schemaValueNode);
      } else if (object.type.fieldType instanceof CustomFieldResolver) {
        const customNode = new CustomValueNode(
          {
            fieldTreeRoute: actualRoute,
            isArray: new FieldIsArray(),
            possibleNull: new NotNull(),
          },
          object.type.fieldType.fun,
        );

        returnNode = new KeyValueNode(actualRoute, customNode);
      } else {
        const refValueNode = new RefValueNode(
          {
            fieldTreeRoute: actualRoute,
            isArray: new FieldIsArray(),
            possibleNull: new NotNull(),
          },
          object.type.fieldType.refField,
          this.schemasStore,
        );

        // añadir a lo ref fields del tree
        this.refToResolve.push(refValueNode);

        returnNode = new KeyValueNode(actualRoute, refValueNode);
      }
    } else {
      throw new ChacaError(
        `The field '${InputTreeNode.getRouteString(
          actualRoute,
        )}' have an incorrect resolver`,
      );
    }

    return returnNode;
  }

  private validateResolver(route: string[], config: ResolverObject): void {
    const name = InputTreeNode.getRouteString(route);

    // sequence
    if (config.type instanceof SequenceFieldResolver) {
      if (config.isArray !== null) {
        throw new ChacaError(
          `The sequence field ${name} can not be an array field`,
        );
      }
    }

    // sequential
    else if (config.type instanceof SequentialFieldResolver) {
      if (config.isArray !== null) {
        throw new ChacaError(
          `The sequential field ${name} can not be an array field`,
        );
      }
    }

    // key
    else if (config.type instanceof KeyFieldResolver) {
      if (config.isArray !== null) {
        throw new ChacaError(`The key field ${name} can not be an array field`);
      }

      const possibleNull = config.possibleNull;
      if (typeof possibleNull === "number" && possibleNull > 0) {
        throw new ChacaError(`The key field ${name} can not be a null field`);
      }
    }
  }

  private createSubNodesOfMixedField(
    actualRoute: string[],
    parentNode: MixedValueNode,
    schema: Schema,
  ) {
    const object = schema.getSchemaObject();
    for (const [key, obj] of Object.entries<ResolverObject>(object)) {
      const fieldRoute = [...actualRoute, key];

      const newNode = this.createNodeByType({
        actualRoute: fieldRoute,
        object: obj,
      });

      parentNode.insertNode(newNode);
    }
  }

  insertNode(node: InputTreeNode) {
    this.nodes.push(node);
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
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

  searchRefNodes(): void {
    this.refToResolve.forEach((r) => r.searchSchemaRef());
  }

  getPossibleNullNodes(): InputTreeNode[] {
    const nodes = [] as InputTreeNode[];

    this.nodes.forEach((n) => {
      if (n.isPossibleNull()) {
        nodes.push(n);
      }

      if (n instanceof MixedValueNode) {
        const subNodes = n.getPossibleNullNodes();
        subNodes.forEach((s) => nodes.push(s));
      }
    });

    return nodes;
  }

  getKeyFields(): KeyValueNode[] {
    const keys = [] as KeyValueNode[];

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
