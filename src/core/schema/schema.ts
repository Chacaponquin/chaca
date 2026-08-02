import { ExportResolver } from "../export/resolvers/export/export";
import { SchemaInput } from "./interfaces/schema";
import {
  CliExportable,
  DumpConfig,
  FileConfig,
} from "../export/interfaces/export";
import { SchemaResolver } from "../schema-resolver/schema-resolver";
import { ChacaUtils } from "../utils";
import { DatatypeModule } from "../../modules/datatype";
import { GeneratorFilter } from "../export/resolvers/generator-filter/generator-filter";
import { DumpResolver } from "../export/resolvers/dump/dump";
import { DumpFile } from "../export/generators/generator/generator";
import { FileWriter } from "../export/writers/file-writer";
import { UnavailableFileWriter } from "../export/writers/unavailable/unavailable-file-writer";
import { DEFAULT_SCHEMA_NAME } from "./core/default-name";
import { SchemaCountExecutor } from "../schema-resolver/value-object/schema-count-executor";
import { SchemaCount } from "../schema-resolver/value-object/schema-count";

export class Schema<K = any> implements CliExportable {
  constructor(
    readonly input: SchemaInput,
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    private readonly fileWriter: FileWriter = new UnavailableFileWriter(),
  ) {}

  /**
   * Generates and serializes schema data as a specific file format
   *
   * @param documents number of documents that you want to create
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   */
  async transform(documents: number, props: DumpConfig): Promise<DumpFile[]> {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props,
    );

    const data = await this.array(documents);

    return resolver.data(data);
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
      this.fileWriter,
      config,
    );

    const routes = await resolver.relational([
      { name: config.filename, documents: documents, schema: this },
    ]);

    return routes;
  }

  /**
   * Adapts the CLI's uniform export call to the schema `export` signature.
   * @internal
   */
  exportFromCli(documents: number, config: FileConfig): Promise<string[]> {
    return this.export(documents, config);
  }

  /**
   * Generate a schema document
   */
  async object(): Promise<K> {
    const result = await this.array(1);

    return result[0];
  }

  /**
   * Generate an array of schema documents
   * @param countDocuments number of documents that you want to create
   */
  array(countDocuments: number): Promise<K[]> {
    const name = DEFAULT_SCHEMA_NAME;

    const schemaToResolve = new SchemaResolver<K>(
      this.utils,
      this.datatypeModule,
      {
        name: name,
        input: this.input,
        count: new SchemaCount({
          name: name,
          singleSchema: true,
        }),
        countExecutor: SchemaCountExecutor.create({
          value: countDocuments,
          singleSchema: true,
          name: name,
        }),
        schemaIndex: 0,
        consoleVerbose: false,
      },
    );

    return schemaToResolve.resolve();
  }
}
