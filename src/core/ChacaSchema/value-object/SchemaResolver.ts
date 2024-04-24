import { ChacaError } from "../../../errors";
import { SchemaField } from "../../../schemas/SchemaField";
import {
  EnumField,
  KeyField,
  PickField,
  ProbabilityField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../Fields/core";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  MixedFieldResolver,
  PickFieldResolver,
  ProbabilityFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../../Resolvers/core";
import { IResolver } from "../../Resolvers/interfaces/resolvers";
import { ChacaSchema } from "../ChacaSchema";
import {
  CustomField,
  FieldObjectInput,
  FieldTypes,
  ResolverObject,
  SchemaInput,
  SchemaToResolve,
} from "../interfaces/schema";
import { FieldIsArray } from "./FieldIsArray";
import { FieldPossibleNull } from "./FieldPossibleNull";
import { InputKeyField } from "./Key";

interface Filter {
  config?: FieldTypes;
}

export class InputSchemaResolver {
  private _schema: SchemaToResolve;

  constructor(obj: SchemaInput) {
    this._schema = this.validate(obj);
  }

  public value() {
    return this._schema;
  }

  private filter({ config }: Filter): IResolver {
    let returnResolver: IResolver;

    if (config) {
      if (typeof config === "function") {
        returnResolver = new CustomFieldResolver(config as CustomField);
      } else {
        if (config instanceof ChacaSchema) {
          returnResolver = new MixedFieldResolver(config);
        } else if (config instanceof PickField) {
          returnResolver = new PickFieldResolver(config.values);
        } else if (config instanceof SchemaField) {
          returnResolver = new SchemaFieldResolver(config);
        } else if (config instanceof RefField) {
          returnResolver = new RefFieldResolver(config.getRefField());
        } else if (config instanceof SequentialField) {
          returnResolver = new SequentialFieldResolver(
            config.getValuesArray(),
            config.getConfig(),
          );
        } else if (config instanceof ProbabilityField) {
          returnResolver = new ProbabilityFieldResolver(config.getValues());
        } else if (config instanceof KeyField) {
          returnResolver = new InputKeyField(config).resolver();
        } else if (config instanceof SequenceField) {
          returnResolver = new SequenceFieldResolver(config.getConfig());
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

  private validate(obj: SchemaInput): SchemaToResolve {
    const schemaToSave = {} as SchemaToResolve;

    for (const [key, field] of Object.entries(obj)) {
      const resolverObject = {
        isArray: null,
        possibleNull: 0,
      } as ResolverObject;

      if ("type" in field) {
        const fieldObject = field as FieldObjectInput;
        const type = this.filter({ config: fieldObject.type });

        resolverObject.type = type;

        const configArray = new FieldIsArray(fieldObject.isArray);
        const configNull = new FieldPossibleNull(fieldObject.possibleNull);

        resolverObject.possibleNull = configNull.value();
        resolverObject.isArray = configArray.value();
      } else {
        const type = this.filter({ config: field });
        resolverObject.type = type;
      }

      schemaToSave[key] = resolverObject;
    }

    return schemaToSave;
  }
}
