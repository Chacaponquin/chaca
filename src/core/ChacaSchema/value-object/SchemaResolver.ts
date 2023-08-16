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
  RefFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../../Resolvers/core/index.js";
import { ChacaSchema } from "../ChacaSchema.js";
import {
  FieldIsArrayConfig,
  SchemaInput,
  SchemaToResolve,
} from "../interfaces/schema.interface.js";
import { InputEnumField } from "./Enum.js";
import { FieldIsArray } from "./FieldIsArray.js";
import { FieldPossibleNull } from "./FieldPossibleNull.js";
import { InputFieldType } from "./FieldType.js";
import { InputKeyField } from "./Key.js";

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

  private validate(obj: SchemaInput): SchemaToResolve {
    this.validateObject(obj);

    let schemaToSave = {} as SchemaToResolve;

    const defaultConfig: CommonSchema = {
      isArray: null,
      possibleNull: 0,
    };

    for (const [key, schema] of Object.entries(obj)) {
      if (schema instanceof ChacaSchema) {
        schemaToSave = {
          ...schemaToSave,
          [key]: { type: new MixedFieldResolver(schema), ...defaultConfig },
        };
      } else if (typeof schema === "function") {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new CustomFieldResolver(schema),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof SchemaField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new SchemaFieldResolver(schema),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof RefField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new RefFieldResolver(schema.getRefField()),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof SequentialField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new SequentialFieldResolver(
              schema.getValuesArray(),
              schema.getConfig(),
            ),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof KeyField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new InputKeyField(schema).resolver(),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof SequenceField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new SequenceFieldResolver(schema.getConfig()),
            ...defaultConfig,
          },
        };
      } else if (schema instanceof EnumField) {
        schemaToSave = {
          ...schemaToSave,
          [key]: {
            type: new InputEnumField(key, schema).resolver(),
            ...defaultConfig,
          },
        };
      } else {
        if (typeof schema === "object" && schema !== null) {
          if (schema.type) {
            if (schema.type instanceof RefFieldResolver) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: schema.type,
                  ...defaultConfig,
                },
              };
            } else {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new InputFieldType(key, schema.type).resolver(),
                  ...defaultConfig,
                },
              };
            }
          } else {
            throw new ChacaError(
              `The field ${key} dosen't have a resolve method`,
            );
          }
        }

        schemaToSave = {
          ...schemaToSave,
          [key]: {
            ...schemaToSave[key],
            possibleNull: new FieldPossibleNull(schema.posibleNull).value(),
          },
        };

        schemaToSave = {
          ...schemaToSave,
          [key]: {
            ...schemaToSave[key],
            isArray: new FieldIsArray(schema.isArray).value(),
          },
        };
      }
    }

    return schemaToSave;
  }
}
