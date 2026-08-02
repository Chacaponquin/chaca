import { DatatypeModule } from "../../modules/datatype";
import { DatasetSchema } from "../dataset-resolver/interfaces/dataset-schema";
import { DatasetResolver } from "../dataset-resolver/dataset-resolver";
import { ExportResolver } from "../export/resolvers/export/export";
import {
  CliExportable,
  DumpConfig,
  FileConfig,
} from "../export/interfaces/export";
import { ChacaUtils } from "../utils";
import { GeneratorFilter } from "../export/resolvers/generator-filter/generator-filter";
import { DumpResolver } from "../export/resolvers/dump/dump";
import { DumpFile } from "../export/generators/generator/generator";
import { FileWriter } from "../export/writers/file-writer";
import { UnavailableFileWriter } from "../export/writers/unavailable/unavailable-file-writer";

export class Dataset<K = any> implements CliExportable {
  constructor(
    private readonly schemas: DatasetSchema[],
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    private readonly fileWriter: FileWriter = new UnavailableFileWriter(),
  ) {}

  /**
   * Generates and serializes dataset data as a specific file format
   *
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param config.verbose show log in console progretion
   */
  transform(props: DumpConfig): Promise<DumpFile[]> {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props,
    );

    return resolver.relational(this.schemas);
  }

  /**
   * Generate and export data from relational schemas
   * @param schemas Array with the schemas config
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param config.verbose show log in console progretion
   */
  async export(config: FileConfig): Promise<string[]> {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
      this.fileWriter,
      config,
    );
    const routes = await resolver.relational(this.schemas);

    return routes;
  }

  /**
   * Adapts the CLI's uniform export call to the dataset `export` signature.
   * The document count is defined per schema, so it is ignored here.
   * @internal
   */
  exportFromCli(_documents: number, config: FileConfig): Promise<string[]> {
    return this.export(config);
  }

  /**
   * Generates the dataset data through the defined schemas
   */
  async generate(): Promise<K> {
    const resolver = new DatasetResolver<K>(this.utils, this.datatypeModule, {
      schemas: this.schemas,
      verbose: false,
    });

    return await resolver.resolve();
  }
}
