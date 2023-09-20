import { ExportResolver } from "../Export/ExportResolver.js";
import {
  SchemaFieldType,
  SchemaInput,
  SchemaToResolve,
} from "./interfaces/schema.interface.js";
import { FileConfig } from "../Export/interfaces/export.interface.js";
import { InputSchemaResolver } from "./value-object/SchemaResolver.js";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver.js";

export class ChacaSchema<K = any> extends SchemaFieldType {
  private schemaResolver: SchemaToResolve;

  constructor(inputObj: SchemaInput) {
    super();
    this.schemaResolver = new InputSchemaResolver(inputObj).schema();
  }

  public getSchemaObject() {
    return this.schemaResolver;
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
    const schemaToResolve = new SchemaResolver<K>({
      schemaName: "Schema",
      schemaObject: this.schemaResolver,
      countDoc: cantDocuments,
      schemaIndex: 0,
      consoleVerbose: false,
    });

    return schemaToResolve.resolve();
  }
}
