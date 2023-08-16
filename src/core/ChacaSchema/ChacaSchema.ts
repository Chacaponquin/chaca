import { IdSchema } from "../../schemas/id/IdSchema.js";
import { ExportResolver } from "../Export/ExportResolver.js";
import { SchemaInput, SchemaToResolve } from "./interfaces/schema.interface.js";
import { FileConfig } from "../Export/interfaces/export.interface.js";
import { InputSchemaResolver } from "./value-object/SchemaResolver.js";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver.js";

export class ChacaSchema<K = any> {
  private schemaObj: SchemaToResolve;

  constructor(inputObj: SchemaInput) {
    this.schemaObj = new InputSchemaResolver(inputObj).schema();
  }

  public getSchemaObject() {
    return this.schemaObj;
  }

  /**
   * Generate and export the schema documents
   * @param countDocuments number of documents that you want to create
   * @param configFile Configuration of the file you want to export (name, location, format)
   * @returns Promise<string>
   */
  public async generateAndExport(
    countDocuments: number,
    configFile: FileConfig,
  ): Promise<string> {
    const exportResolver = new ExportResolver(configFile);
    const fileRoute = await exportResolver.exportRelationalSchemas(
      [{ name: configFile.fileName, documents: countDocuments, schema: this }],
      { verbose: false },
    );

    return fileRoute;
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

    const schemaToResolve = new SchemaResolver<K>({
      schemaName: idSchema.uuid().getValue(),
      schemaObject: this.schemaObj,
      countDoc: cantDocuments,
      schemaIndex: 0,
      consoleVerbose: false,
    });

    return schemaToResolve.resolve();
  }
}
