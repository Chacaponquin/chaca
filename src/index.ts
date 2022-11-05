import { CHDataUtils } from "./utils/CHDataUtils";
import { CustomSchema } from "./utils/classes/CustomSchema";
import {
  SchemaConfig,
  SchemaObject,
} from "./utils/interfaces/schema.interface";

import { CHDataError } from "./errors/CHDataError";
import { FileConfig } from "./utils/interfaces/export.interface";
import { SchemaResolver } from "./utils/classes/SchemaResolver";
import { Schemas } from "./schemas/index";

import AdmZip from "adm-zip";
import path from "path";

abstract class Chaca {
  private static schemasCreated: CustomSchema[] = [];
  public static Schema = SchemaResolver;
  public static utils = CHDataUtils;

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
    } else throw new CHDataError("Already exists a schema with that name");
  }

  public static async exportAll(config: FileConfig): Promise<string> {
    let allRoutes: string[] = [];

    for (let i = 0; i < this.schemasCreated.length; i++) {
      allRoutes.push(
        await this.schemasCreated[i].generateAndExport(20, {
          ...config,
          fileName: config.fileName + i,
        }),
      );
    }

    try {
      const zp = new AdmZip();
      const zipName = `${config.fileName}.zip`;
      const zipPath = path.join(config.location, zipName);

      for (const route of allRoutes) {
        zp.addLocalFile(route);
      }

      zp.writeZip(zipPath);
      return zipPath;
    } catch (error) {
      throw new CHDataError("Error export zip File");
    }
  }
}

export const chaca = Chaca;
export const schemas = Schemas;
