import { ChacaError } from "../../../errors";
import {
  EnumField,
  KeyField,
  PickField,
  ProbabilityField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../fields/core";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  MixedFieldResolver,
  PickFieldResolver,
  ProbabilityFieldResolver,
  RefFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../../resolvers/core";
import { IResolver } from "../../resolvers/interfaces/resolvers";
import { Schema } from "../../schema";
import {
  FieldObjectInput,
  FieldTypes,
  ResolverObject,
  SchemaInput,
} from "../../schema/interfaces/schema";
import { FieldIsArray } from "./array";
import { FieldPossibleNull } from "./possible-null";
import { InputKeyField } from "./input-key";
import { NodeRoute } from "../../input-tree/core/node/value-object/route";

interface Filter {
  config?: FieldTypes;
  route: NodeRoute;
}

export type ISchemaToResolve = Record<string, ResolverObject>;

export class SchemaToResolve {
  private _schema: ISchemaToResolve;

  constructor(route: NodeRoute, obj: SchemaInput) {
    this._schema = this.validate(route, obj);
  }

  value() {
    return this._schema;
  }

  private filter({ config, route }: Filter): IResolver {
    let returnResolver: IResolver;

    if (config) {
      if (typeof config === "function") {
        returnResolver = new CustomFieldResolver(config);
      } else {
        if (config instanceof Schema) {
          returnResolver = new MixedFieldResolver(config);
        } else if (config instanceof PickField) {
          returnResolver = new PickFieldResolver(config.values);
        } else if (config instanceof RefField) {
          returnResolver = new RefFieldResolver(config.refField);
        } else if (config instanceof SequentialField) {
          returnResolver = new SequentialFieldResolver(
            config.values,
            config.config,
          );
        } else if (config instanceof ProbabilityField) {
          returnResolver = new ProbabilityFieldResolver(config.values);
        } else if (config instanceof KeyField) {
          returnResolver = new InputKeyField(route, config).resolver();
        } else if (config instanceof SequenceField) {
          returnResolver = new SequenceFieldResolver(config.config);
        } else if (config instanceof EnumField) {
          returnResolver = new EnumFieldResolver(config.values);
        } else {
          throw new ChacaError(`${config} is not a valid field type`);
        }
      }
    } else {
      throw new ChacaError(`${config} is not a valid field type`);
    }

    return returnResolver;
  }

  private validate(route: NodeRoute, obj: SchemaInput): ISchemaToResolve {
    const schemaToSave = {} as ISchemaToResolve;

    for (const [key, field] of Object.entries(obj)) {
      const resolverObject = {
        isArray: new FieldIsArray(),
        possibleNull: new FieldPossibleNull(),
      } as ResolverObject;

      if ("type" in field) {
        const fieldObject = field as FieldObjectInput;
        const type = this.filter({ config: fieldObject.type, route: route });

        resolverObject.type = type;

        const configArray = new FieldIsArray(fieldObject.isArray);
        const configNull = new FieldPossibleNull(fieldObject.possibleNull);

        resolverObject.possibleNull = configNull;
        resolverObject.isArray = configArray;
      } else {
        const type = this.filter({ config: field, route: route });
        resolverObject.type = type;
      }

      schemaToSave[key] = resolverObject;
    }

    return schemaToSave;
  }
}
