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
import { ChacaUtils } from "../utils";
import { PossibleNullMapper } from "./core/map/possible-null";
import { NotNull } from "./core/possible-null";
import { IsArrayMapper } from "./core/map/is-array";
import { DatatypeModule } from "../../modules/datatype";
import { NotArray } from "./core/is-array";
import { Count } from "./core/pick/value-object/count";
import { Values } from "./core/pick/value-object/values";
import { ChancesArray } from "./core/probability/value-object/chances-array";
import { Step } from "./core/sequence/value-object/step";
import { StartsWith } from "./core/sequence/value-object/starts-with";
import { ResolverValidator } from "./core/validators/resolver";
import { NodeRoute } from "./core/node/value-object/route";

interface Props {
  name: string;
  schemaToResolve: SchemaToResolve;
  schemasStore: SchemaStore;
  count: number;
}

interface CreateNodeProps {
  actualRoute: NodeRoute;
  object: ResolverObject;
}

interface CreateSubNodesProps {
  actualRoute: NodeRoute;
  parentNode: MixedValueNode;
  schema: Schema;
}

export class ChacaInputTree {
  private nodes: InputTreeNode[];
  private schemasStore: SchemaStore;
  private name: string;
  private count: number;

  // ref nodes
  private refToResolve: RefValueNode[];

  private readonly nullMapper: PossibleNullMapper;
  private readonly arrayMapper: IsArrayMapper;

  private readonly resolverValidator: ResolverValidator;

  constructor(
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    { name, schemaToResolve, schemasStore, count }: Props,
  ) {
    this.nullMapper = new PossibleNullMapper(this.utils);
    this.arrayMapper = new IsArrayMapper(this.datatypeModule);

    this.resolverValidator = new ResolverValidator();

    this.schemasStore = schemasStore;
    this.name = name;
    this.count = count;

    this.refToResolve = [];
    this.nodes = [];

    for (const [key, obj] of Object.entries<ResolverObject>(schemaToResolve)) {
      const route = new NodeRoute([this.name, key]);

      const newNode = this.createNodeByType({
        actualRoute: route,
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

    this.resolverValidator.execute({
      route: actualRoute.string(),
      config: object,
    });

    const possibleNull = this.nullMapper.execute({
      route: actualRoute.string(),
      value: object.possibleNull,
      countDocs: this.count,
    });

    const isArray = this.arrayMapper.execute({
      route: actualRoute.string(),
      value: object.isArray,
    });

    if (object.type instanceof CustomFieldResolver) {
      returnNode = new CustomValueNode(
        actualRoute,
        isArray,
        possibleNull,
        object.type.fun,
      );
    } else if (object.type instanceof PickFieldResolver) {
      const values = new Values({
        route: actualRoute.string(),
        values: object.type.values.values,
      });

      const count = Count.create(this.datatypeModule, {
        count: object.type.values.count,
        options: values,
        route: actualRoute.string(),
      });

      returnNode = new PickValueNode(
        this.datatypeModule,
        actualRoute,
        isArray,
        possibleNull,
        count,
        values,
      );
    } else if (object.type instanceof ProbabilityFieldResolver) {
      const options = new ChancesArray(this.utils, {
        options: object.type.values,
        route: actualRoute.string(),
      });

      returnNode = new ProbabilityValueNode(
        actualRoute,
        isArray,
        possibleNull,
        options,
      );
    } else if (object.type instanceof EnumFieldResolver) {
      returnNode = new EnumValueNode(
        this.utils,
        actualRoute,
        isArray,
        possibleNull,
        object.type.array,
      );
    } else if (object.type instanceof MixedFieldResolver) {
      const node = new MixedValueNode(actualRoute, isArray, possibleNull);

      this.createSubNodes({
        actualRoute: actualRoute,
        parentNode: node,
        schema: object.type.schema,
      });

      returnNode = node;
    } else if (object.type instanceof RefFieldResolver) {
      const newRefNode = new RefValueNode(
        this.utils,
        actualRoute,
        isArray,
        possibleNull,
        object.type.refField,
        this.schemasStore,
      );

      // añadir a lo ref fields del tree
      this.refToResolve.push(newRefNode);

      returnNode = newRefNode;
    } else if (object.type instanceof SequentialFieldResolver) {
      returnNode = new SequentialValueNode(
        actualRoute,
        possibleNull,
        object.type.valuesArray,
        object.type.config,
      );
    } else if (object.type instanceof SequenceFieldResolver) {
      const step = new Step({
        route: actualRoute.string(),
        value: object.type.getConfig().step,
      });

      const startsWith = new StartsWith({
        value: object.type.getConfig().starsWith,
        route: actualRoute.string(),
      });

      returnNode = new SequenceValueNode(
        actualRoute,
        possibleNull,
        startsWith,
        step,
      );
    } else if (object.type instanceof KeyFieldResolver) {
      if (object.type.type instanceof SequenceFieldResolver) {
        const step = new Step({
          route: actualRoute.string(),
          value: object.type.type.getConfig().step,
        });

        const startsWith = new StartsWith({
          value: object.type.type.getConfig().starsWith,
          route: actualRoute.string(),
        });

        const schemaValueNode = new SequenceValueNode(
          actualRoute,
          new NotNull(),
          startsWith,
          step,
        );

        returnNode = new KeyValueNode(actualRoute, schemaValueNode);
      } else if (object.type.type instanceof CustomFieldResolver) {
        const customNode = new CustomValueNode(
          actualRoute,
          new NotArray(),
          new NotNull(),
          object.type.type.fun,
        );

        returnNode = new KeyValueNode(actualRoute, customNode);
      } else {
        const refValueNode = new RefValueNode(
          this.utils,
          actualRoute,
          new NotArray(),
          new NotNull(),
          object.type.type.refField,
          this.schemasStore,
        );

        // añadir a lo ref fields del tree
        this.refToResolve.push(refValueNode);

        returnNode = new KeyValueNode(actualRoute, refValueNode);
      }
    } else {
      throw new ChacaError(
        `The field '${actualRoute.string()}' have an incorrect resolver`,
      );
    }

    return returnNode;
  }

  private createSubNodes({
    actualRoute,
    parentNode,
    schema,
  }: CreateSubNodesProps) {
    const object = schema.getSchemaObject();

    for (const [key, obj] of Object.entries<ResolverObject>(object)) {
      const fieldRoute = actualRoute.create(key);

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
    if (this.name === fieldTreeRoute[0]) {
      let exists = false;

      for (let i = 0; i < this.nodes.length && !exists; i++) {
        if (this.nodes[i].getName() === fieldTreeRoute[1]) {
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
