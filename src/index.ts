import { ChacaUtils } from "./utils/helpers/ChacaUtils.js";
import { CustomSchema } from "./utils/classes/CustomSchema.js";
import { SchemaInput } from "./utils/interfaces/schema.interface.js";

import { ChacaError } from "./errors/ChacaError.js";
import { ExportAllConfig } from "./utils/interfaces/export.interface.js";
import { Schema } from "./utils/classes/Schema.js";
import { Schemas } from "./schemas/index.js";
import { SchemaField } from "./schemas/SchemaField.js";

import AdmZip from "adm-zip";
import path from "path";
import { Export } from "./utils/helpers/Export.js";

abstract class Chaca {
  /**
   * All schemas created
   */
  private static schemasCreated: CustomSchema[] = [];
  public static Schema = Schema;
  public static utils = ChacaUtils;

  /**
   *
   * @param schemaName schema name
   * @throws The name of schema can't be an empty string, or a repetive name
   *
   * @param inputObj The object with the keys and type of each field
   * @example
   * { id: schemas.id.numberRow(), image: schemas.image.film(), name: schemas.person.firstName()}
   */
  public static defineSchema<K = any, T = any>(
    schemaName: string,
    inputObj: SchemaInput<K, T>,
  ): CustomSchema<K, T> {
    const findSchema = this.schemasCreated.find(
      (el) => el.schemaName === schemaName,
    );
    if (!findSchema) {
      const newSchema = new CustomSchema<K, T>(schemaName, inputObj);
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
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'`)
   *
   *  - `'java'`
   * Export a zip file with the classes files and the main java file with the initialization of data
   *
   * - `'csv'`
   * Export a csv file with the data created
   *
   * - `'typescript'`
   * Export a ts file with the data created
   *
   * - `'javascript'`
   * Export a js file with the data created
   *
   * - `'json'`
   * Export a json file with the data created
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'Users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<string>
   */
  public static export = Export;

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
    const allRoutes: string[] = [];

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
