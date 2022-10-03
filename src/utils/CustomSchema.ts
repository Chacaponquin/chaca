import { CHDataError } from "../errors/CHDataError";
import { CHDataUtils } from "./CHDataUtils";
import { SchemaObject, SchemaConfig } from "./interfaces/schema.interface";
import { ReturnValue } from "./interfaces/value.interface";
import { FileConfig, ReturnDoc } from "./interfaces/export.interface";
import { Generator, JsonGenerator } from "../generators";

/**
 * Class for creation of a model with the configuration of each
 * field defined by the user
 */
export class CustomSchema {
  //SCHEMA NAME
  private name: string;
  private schemaObj: SchemaObject;

  constructor(schemaName: string, schemaObj: SchemaObject) {
    if (!schemaName) throw new CHDataError("Your schema must have a name");
    else {
      this.name = schemaName;
      this.schemaObj = this.validateObjectSchema(schemaObj);
    }
  }

  public generate(cantDocuments: number = 10): ReturnDoc[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments < 0
        ? 10
        : cantDocuments;

    let returnArray: ReturnDoc[] = [];

    for (let i = 1; i <= cantDoc; i++) {
      let doc: { [key: string]: ReturnValue | ReturnValue[] } = {};
      for (const [key, schema] of Object.entries(this.schemaObj)) {
        let retValue: ReturnValue | ReturnValue[];

        if (schema.isArray) {
          retValue = [] as ReturnValue[];
          let limit: number = 10;
          if (typeof schema.isArray === "object") {
            limit = CHDataUtils.numberByLimits(schema.isArray);
          } else if (typeof schema.isArray === "number") {
            limit = schema.isArray;
          } else if (schema.isArray === true) {
            limit = 10;
          }

          for (let i = 1; i <= limit; i++) {
            retValue.push(this.generateValueBySchema(schema));
          }
        } else retValue = this.generateValueBySchema(schema);

        if (schema.posibleNull) {
          let porcentNull: number =
            typeof schema.posibleNull === "number" ? schema.posibleNull : 50;

          let array: (null | (ReturnValue | ReturnValue[]))[] = new Array(
            100
          ).fill(0);

          for (let i = 0; i < array.length; i++) {
            if (porcentNull > 0) {
              array.push(null);
              porcentNull--;
            } else {
              array.push(retValue);
            }
          }

          retValue = CHDataUtils.oneOfArray(array);
        }

        doc = { ...doc, [key]: retValue };
      }

      returnArray.push(doc);
    }

    return returnArray;
  }

  /**
   *
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'Users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<void>
   */
  public async export(data: ReturnDoc[], config: FileConfig): Promise<string> {
    if (config && typeof config.format === "string") {
      let gen: Generator;
      switch (config.format) {
        case "json": {
          gen = new JsonGenerator(data, config);
          break;
        }
        default:
          throw new CHDataError(`Format ${config.format} invalid`);
      }

      return await gen.generateFile();
    } else throw new CHDataError(`Format ${config.format} invalid`);
  }

  public async generateAndExport(
    cant: number,
    configFile: FileConfig
  ): Promise<void> {
    const data = this.generate(cant);
    await this.export(data, configFile);
  }

  private generateValueBySchema(schema: SchemaConfig): ReturnValue {
    let retValue: ReturnValue;

    if (schema.type) {
      retValue = schema.type.getValue();
    } else if (schema.custom) {
      retValue = schema.custom() || null;
    } else if (schema.enum) {
      retValue = CHDataUtils.oneOfArray(schema.enum);
    } else throw new CHDataError("");

    return retValue;
  }

  private validateObjectSchema(obj: SchemaObject): SchemaObject {
    if (!obj || typeof obj !== "object" || Array.isArray(obj))
      throw new CHDataError(
        "Your schema has to be an object with the fields descriptions"
      );
    else {
      let schemaToSave: SchemaObject = {};
      for (const [key, schema] of Object.entries(obj)) {
        if (!schema.type && !schema.custom && !schema.enum) {
          throw new CHDataError(
            `The field ${key} dosen't have a resolve function`
          );
        } else {
          if (schema.type) {
            schemaToSave = { ...schemaToSave, [key]: { type: schema.type } };
          } else {
            if (schema.enum) {
              if (Array.isArray(schema.enum)) {
                if (schema.enum.length > 0) {
                  schemaToSave = {
                    ...schemaToSave,
                    [key]: { enum: schema.enum },
                  };
                } else
                  throw new CHDataError(
                    `For the field ${key} you must provide some values to choce`
                  );
              } else {
                throw new CHDataError(
                  `If the field ${key} is a enum type so this one muste be an array of values`
                );
              }
            } else {
              if (typeof schema.custom === "function") {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: { custom: schema.custom },
                };
              } else {
                throw new CHDataError("The custom field must be a function");
              }
            }
          }

          if (schema.posibleNull) {
            if (typeof schema.posibleNull === "number") {
              const value =
                schema.posibleNull <= 100 || schema.posibleNull >= 0
                  ? schema.posibleNull
                  : 50;
              schemaToSave = {
                ...schemaToSave,
                [key]: { ...schema, posibleNull: value },
              };
            } else {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  ...schema,
                  posibleNull: Boolean(schema.posibleNull),
                },
              };
            }
          } else
            schemaToSave = {
              ...schemaToSave,
              [key]: { ...schema, posibleNull: false },
            };

          if (schema.isArray) {
            if (typeof schema.isArray === "number") {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  ...schema,
                  isArray: schema.isArray >= 1 ? schema.isArray : 10,
                },
              };
            } else if (typeof schema.isArray === "boolean") {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  ...schema,
                  isArray: schema.isArray,
                },
              };
            } else if (
              typeof schema.isArray === "object" &&
              !(schema.isArray instanceof Date) &&
              !Array.isArray(schema.isArray)
            ) {
              let min = schema.isArray["min"] || 1;
              let max = schema.isArray["max"] || 10;

              if (min > max) {
                let temp = max;
                max = min;
                min = temp;
              }

              schemaToSave = {
                ...schemaToSave,
                [key]: { ...schema, isArray: { min, max } },
              };
            } else {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  ...schema,
                  isArray: 10,
                },
              };
            }
          } else {
            schemaToSave = {
              ...schemaToSave,
              [key]: { ...schema, isArray: false },
            };
          }
        }
      }
      return schemaToSave;
    }
  }
}
