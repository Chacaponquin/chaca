import { ExportResolver } from "../export/resolvers/export";
import { SchemaInput, SchemaToResolve } from "./interfaces/schema";
import { DumpConfig, FileConfig } from "../export/interfaces/export";
import { InputSchemaResolver } from "./value-object/schema-resolver";
import { SchemaResolver } from "../schema-resolver";
import { ChacaUtils } from "../utils";
import { DatatypeModule } from "../../modules/datatype";
import { GeneratorFilter } from "../export/resolvers/generator-filter";
import { DumpResolver } from "../export/resolvers/dump";
import { DumpFile } from "../export/generators/generator";

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
   * Generates and serializes schema data as a specific file format
   *
   * @param documents number of documents that you want to create
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   */
  transform(documents: number, props: DumpConfig): DumpFile[] {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props,
    );

    return resolver.data(this.array(documents));
  }

  /**
   * Generate and export the schema documents
   * @param documents number of documents that you want to create
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @returns Promise<string[]>
   */
  async export(documents: number, config: FileConfig): Promise<string[]> {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
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
