import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import { IdSchema } from "../../../schemas/id/IdSchema.js";
import { ExportResolver } from "../Export/ExportResolver.js";
import { FileConfig } from "../../interfaces/export.interface.js";
import {
  FieldIsArrayConfig,
  FieldTypeInput,
  IResolver,
  SchemaInput,
  SchemaToResolve,
} from "../../interfaces/schema.interface.js";
import { EnumField } from "../EnumField/EnumField.js";
import { KeyField } from "../KeyField/KeyField.js";
import { RefField } from "../RefField/RefField.js";
import { KeyFieldResolverProps } from "../Resolvers/KeyFieldResolver/KeyFieldResolver.js";
import {
  CustomFieldResolver,
  KeyFieldResolver,
  MixedFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../Resolvers/index.js";
import { SchemaResolver } from "../SchemaResolver.js";
import { SequenceField } from "../SequenceField/SequenceField.js";
import { SequentialField } from "../SequentialField/SequentialField.js";
import { FieldIsArray } from "./value-object/FieldIsArray.js";
import { FieldPosibleNull } from "./value-object/FieldPosibleNull.js";
import { Enum } from "./value-object/index.js";

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export class ChacaSchema<K = any> {
  private schemaObj: SchemaToResolve;

  constructor(inputObj: SchemaInput) {
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public getSchemaObject() {
    return this.schemaObj;
  }

  /**
   * Generate and export the schema documents
   * @param cantDocuments number of documents that you want to create
   * @param configFile Configuration of the file you want to export (name, location, format, etc.)
   * @returns Promise<string>
   */
  public async generateAndExport(
    cantDocuments: number,
    configFile: FileConfig,
  ): Promise<string> {
    const data = this.generate(cantDocuments);
    return await new ExportResolver(configFile).exportData(data);
  }

  private validateObjectSchema(obj: SchemaInput): SchemaToResolve {
    if (!obj || (typeof obj === "object" && Array.isArray(obj))) {
      throw new ChacaError(
        "Your schema has to be an object with the fields descriptions",
      );
    } else {
      let schemaToSave = {} as SchemaToResolve;

      const defaultConfig: CommonSchema = {
        isArray: null,
        posibleNull: 0,
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
              type: new SequentialFieldResolver(schema.getValuesArray()),
              ...defaultConfig,
            },
          };
        } else if (schema instanceof KeyField) {
          schemaToSave = {
            ...schemaToSave,
            [key]: {
              type: this.validateKeyField(schema),
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
            [key]: { type: new Enum(key, schema).resolver(), ...defaultConfig },
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
                    type: this.validateType(key, schema.type),
                    ...defaultConfig,
                  },
                };
              }
            } else {
              throw new ChacaError(
                `The field ${key} dosen't have a resolve function`,
              );
            }
          }

          schemaToSave = {
            ...schemaToSave,
            [key]: {
              ...schemaToSave[key],
              posibleNull: new FieldPosibleNull(schema.posibleNull).value(),
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

  private validateKeyField(schema: KeyField): KeyFieldResolver {
    const fieldType = schema.getFieldType();

    let type: KeyFieldResolverProps;
    if (fieldType instanceof SchemaField) {
      type = new SchemaFieldResolver(fieldType);
    } else if (fieldType instanceof RefField) {
      type = new RefFieldResolver(fieldType.getRefField());
    } else if (fieldType instanceof SequenceField) {
      type = new SequenceFieldResolver(fieldType.getConfig());
    } else if (typeof fieldType === "function") {
      type = new CustomFieldResolver(fieldType);
    } else {
      throw new ChacaError(`Incorrect type for the key schema`);
    }

    return new KeyFieldResolver(type);
  }

  private validateType(key: string, type: FieldTypeInput): IResolver {
    if (type instanceof ChacaSchema) {
      return new MixedFieldResolver(type);
    } else if (type instanceof RefField) {
      return new RefFieldResolver(type.getRefField());
    } else if (type instanceof SchemaField) {
      return new SchemaFieldResolver(type);
    } else if (type instanceof EnumField) {
      return new Enum(key, type).resolver();
    } else if (typeof type === "function") {
      return new CustomFieldResolver(type);
    } else {
      throw new ChacaError(`Invalid type for key ${String(key)}`);
    }
  }

  /**
   * Generate a schema document
   */
  public generateObject(): K {
    const result = this.generate(1);
    return result[0];
  }

  /**
   * Generate an array of schema documents
   * @param cantDocuments number of documents that you want to create
   */
  public generate(cantDocuments: number): K[] {
    const idSchema = new IdSchema();

    const schemaToResolve = new SchemaResolver<K>(
      idSchema.uuid().getValue(),
      this.schemaObj,
      cantDocuments,
      0,
      false,
    );

    return schemaToResolve.resolve();
  }
}
