import { ExportResolver } from "../Export/ExportResolver";
import {
  SchemaFieldType,
  SchemaInput,
  SchemaToResolve,
} from "./interfaces/schema";
import { FileConfig } from "../Export/interfaces/export";
import { InputSchemaResolver } from "./value-object/SchemaResolver";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver";

export class ChacaSchema<K = any> extends SchemaFieldType {
  private schemaResolver: SchemaToResolve;

  constructor(input: SchemaInput) {
    super();
    this.schemaResolver = new InputSchemaResolver(input).value();
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
