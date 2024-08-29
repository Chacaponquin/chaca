import { ExportResolver } from "../export/ExportResolver";
import {
  SchemaFieldType,
  SchemaInput,
  SchemaToResolve,
} from "./interfaces/schema";
import { FileConfig } from "../export/interfaces/export";
import { InputSchemaResolver } from "./value-object/SchemaResolver";
import { SchemaResolver } from "../schema-resolver/resolver";

export class ChacaSchema<K = any> extends SchemaFieldType {
  private schemaResolver: SchemaToResolve;

  constructor(input: SchemaInput) {
    super();
    this.schemaResolver = new InputSchemaResolver(input).value();
  }

  getSchemaObject() {
    return this.schemaResolver;
  }

  /**
   * Generate and export the schema documents
   * @param countDocuments number of documents that you want to create
   * @param configFile Configuration of the file you want to export (name, location, format)
   * @returns Promise<string>
   */
  async export(
    countDocuments: number,
    configFile: FileConfig,
  ): Promise<string> {
    const resolver = new ExportResolver(configFile);
    const fileRoute = await resolver.relational([
      { name: configFile.filename, documents: countDocuments, schema: this },
    ]);

    return fileRoute;
  }

  /**
   * Generate a schema document
   */
  object(): K {
    const result = this.array(1);
    return result[0];
  }

  /**
   * Generate an array of schema documents
   * @param countDocuments number of documents that you want to create
   */
  array(countDocuments: number): K[] {
    const schemaToResolve = new SchemaResolver<K>({
      name: "Schema",
      schemaObject: this.schemaResolver,
      countDoc: countDocuments,
      schemaIndex: 0,
      consoleVerbose: false,
    });

    return schemaToResolve.resolve();
  }
}
