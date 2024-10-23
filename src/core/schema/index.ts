import { ExportResolver } from "../export";
import { SchemaInput, SchemaToResolve } from "./interfaces/schema";
import { FileConfig } from "../export/interfaces/export";
import { InputSchemaResolver } from "./value-object/schema-resolver";
import { SchemaResolver } from "../schema-resolver";
import { ChacaUtils } from "../utils";
import { DatatypeModule } from "../../modules/datatype";

export class Schema<K = any> {
  private schemaResolver: SchemaToResolve;

  constructor(
    input: SchemaInput,
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
  ) {
    this.schemaResolver = new InputSchemaResolver(input).value();
  }

  getSchemaObject() {
    return this.schemaResolver;
  }

  /**
   * Generate and export the schema documents
   * @param documents number of documents that you want to create
   * @param config Configuration of the file you want to export (name, location, format)
   * @returns Promise<string>
   */
  async export(documents: number, config: FileConfig): Promise<string[]> {
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      config,
    );

    const routes = await resolver.relational([
      { name: config.filename, documents: documents, schema: this },
    ]);

    return routes;
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
    const schemaToResolve = new SchemaResolver<K>(
      this.utils,
      this.datatypeModule,
      {
        name: "Schema",
        schemaObject: this.schemaResolver,
        countDoc: countDocuments,
        schemaIndex: 0,
        consoleVerbose: false,
      },
    );

    return schemaToResolve.resolve();
  }
}
