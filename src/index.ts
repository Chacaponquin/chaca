import { ChacaUtils } from "./utils/helpers/ChacaUtils";
import { CustomSchema } from "./utils/classes/CustomSchema";
import {
  SchemaConfig,
  SchemaObject,
} from "./utils/interfaces/schema.interface";

import { ChacaError } from "./errors/ChacaError";
import { ExportAllConfig } from "./utils/interfaces/export.interface";
import { SchemaResolver } from "./utils/classes/SchemaResolver";
import { Schemas } from "./schemas/index";
import { SchemaField } from "./schemas/SchemaField";

import AdmZip from "adm-zip";
import path from "path";

abstract class Chaca {
  /**
   * All schemas created
   */
  private static schemasCreated: CustomSchema[] = [];
  public static Schema = SchemaResolver;
  public static utils = ChacaUtils;

  /**
   *
   * @param {string} schemaName schema name
   * @throws The name of schema can't be an empty string, or a repetive name
   *
   * @param schemaObj The object with the keys and type of each field
   * @example { id: schemas.id.numberRow(), image: schemas.image.film(), name: schemas.person.firstName()}
   */
  public static defineSchema(
    schemaName: string,
    schemaObj: SchemaObject<SchemaConfig>,
  ): CustomSchema {
    const findSchema = this.schemasCreated.find(
      (el) => el.schemaName === schemaName,
    );
    if (!findSchema) {
      const newSchema = new CustomSchema(schemaName, schemaObj);
      this.schemasCreated.push(newSchema);
      return newSchema;
    } else throw new ChacaError("Already exists a schema with that name");
  }

  /**
   * Define your ouwn type schema for create your data
   * @param name Name
   * @param valueFunction
   */
  public static defineSchemaField<T = any, K = unknown>(
    name: string,
    valueFunction: (args: T) => K,
  ): (args?: T) => SchemaField<K, T> {
    return (args) =>
      new SchemaField<K, T>(name, valueFunction, args || ({} as T));
  }

  /**
   * Generate all the schemas defined
   * Returns the location path of the zip
   *
   * @param config.location Destiny folder for the zip
   * @param config.zipName Name for the zip file
   * @param config.format Extension of schema files (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'`)
   *
   * @returns string
   */
  public static async exportAll(config: ExportAllConfig): Promise<string> {
    let allRoutes: string[] = [];

    for (let i = 0; i < this.schemasCreated.length; i++) {
      allRoutes.push(
        await this.schemasCreated[i].generateAndExport(20, {
          ...config,
          fileName: config.zipName + i,
        }),
      );
    }

    try {
      const zp = new AdmZip();
      const zipName = `${config.zipName}.zip`;
      const zipPath = path.join(config.location, zipName);

      for (const route of allRoutes) {
        zp.addLocalFile(route);
      }

      zp.writeZip(zipPath);
      return zipPath;
    } catch (error) {
      throw new ChacaError("Error export zip File");
    }
  }
}

export const chaca = Chaca;
export const schemas = Schemas;
