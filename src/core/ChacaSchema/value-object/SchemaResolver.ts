import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import {
  EnumField,
  KeyField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../Fields/core/index.js";
import {
  CustomFieldResolver,
  MixedFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../../Resolvers/core/index.js";
import { IResolver } from "../../Resolvers/interfaces/resolvers.interface.js";
import { ChacaSchema } from "../ChacaSchema.js";
import {
  FieldIsArrayConfig,
  FieldObjectInput,
  FieldTypes,
  SchemaInput,
  SchemaToResolve,
} from "../interfaces/schema.interface.js";
import { InputEnumField } from "./Enum.js";
import { FieldIsArray } from "./FieldIsArray.js";
import { FieldPossibleNull } from "./FieldPossibleNull.js";
import { InputKeyField } from "./Key.js";

interface Filter {
  key?: string;
  config?: FieldTypes;
}

interface CommonSchema {
  isArray: FieldIsArrayConfig;
  possibleNull: number;
}

export class InputSchemaResolver {
  private _schema: SchemaToResolve;

  constructor(obj: SchemaInput) {
    this._schema = this.validate(obj);
  }

  public schema() {
    return this._schema;
  }

  private validateObject(obj?: SchemaInput): void {
    if (!obj || (typeof obj === "object" && Array.isArray(obj))) {
      throw new ChacaError(
        "Your schema has to be an object with the fields descriptions",
      );
    }
  }

  private filter({ config, key }: Filter): IResolver {
    let returnResolver: IResolver;

    if (config) {
      if (config instanceof ChacaSchema) {
        returnResolver = new MixedFieldResolver(config);
      } else if (typeof config === "function") {
        returnResolver = new CustomFieldResolver(config);
      } else if (config instanceof SchemaField) {
        returnResolver = new SchemaFieldResolver(config);
      } else if (config instanceof RefField) {
        returnResolver = config;
      } else if (config instanceof SequentialField) {
        returnResolver = new SequentialFieldResolver(
          config.getValuesArray(),
          config.getConfig(),
        );
      } else if (config instanceof KeyField) {
        returnResolver = new InputKeyField(config).resolver();
      } else if (config instanceof SequenceField) {
        returnResolver = new SequenceFieldResolver(config.getConfig());
      } else if (config instanceof EnumField) {
        returnResolver = new InputEnumField({
          key,
          enumField: config,
        }).resolver();
      } else {
        throw new ChacaError(`Is not a valid field type`);
      }
    } else {
      throw new ChacaError(`Is not a valid field type`);
    }

    return returnResolver;
  }

  private validate(obj: SchemaInput): SchemaToResolve {
    this.validateObject(obj);

    let schemaToSave = {} as SchemaToResolve;

    const defaultConfig: CommonSchema = {
      isArray: null,
      possibleNull: 0,
    };

    for (const [key, schema] of Object.entries(obj)) {
      if (
        typeof schema === "object" &&
        schema !== null &&
        !Array.isArray(schema)
      ) {
        const fieldObject = schema as FieldObjectInput;

        if (fieldObject.type instanceof SequenceField) {
          throw new ChacaError(`A sequence field can not be modificated`);
        } else if (fieldObject.type instanceof SequentialField) {
          throw new ChacaError(`A sequential field can not be modificated`);
        } else if (fieldObject.type instanceof KeyField) {
          throw new ChacaError(`A key field can not be modificated`);
        } else {
          const type = this.filter({ config: fieldObject.type });
          schemaToSave.type = { ...defaultConfig, type };
        }

        schemaToSave = {
          ...schemaToSave,
          [key]: {
            ...schemaToSave[key],
            possibleNull: new FieldPossibleNull(
              fieldObject.posibleNull,
            ).value(),
          },
        };

        schemaToSave = {
          ...schemaToSave,
          [key]: {
            ...schemaToSave[key],
            isArray: new FieldIsArray(fieldObject.isArray).value(),
          },
        };
      }
    }

    return schemaToSave;
  }
}
