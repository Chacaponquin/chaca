import { FileConfig } from "../../interfaces/export";
import { DatasetSchema } from "../../../dataset-resolver/interfaces/dataset-schema";
import { DatasetResolver } from "../../../dataset-resolver/dataset-resolver";
import { FileName } from "../../value-object/name";
import { Location } from "../../value-object/location";
import { FileFormat } from "../../value-object/format";
import { Verbose } from "../../value-object/verbose";
import { ChacaUtils } from "../../../utils";
import { DatatypeModule } from "../../../../modules/datatype";
import { GeneratorFilter } from "../generator-filter/generator-filter";
import { FileWriter } from "../../writers/file-writer";
import { Filename } from "../../generators/file-creator/filename";

export class ExportResolver {
  private readonly format: FileFormat;
  private readonly filename: FileName;
  private readonly location: Location;
  private readonly verbose: Verbose;

  constructor(
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    private readonly filter: GeneratorFilter,
    private readonly writer: FileWriter,
    config: FileConfig,
  ) {
    this.filename = new FileName(config.filename);
    this.format = new FileFormat(config.format);
    this.location = new Location(config.location);
    this.verbose = new Verbose(config.verbose);
  }

  data(data: any): Promise<string[]> {
    const gen = this.filter.execute(this.format.value());

    const files = gen.dump({
      data: data,
      filename: new Filename(this.filename.value()),
    });

    return this.writer.write({
      files: files,
      ext: gen.ext,
      zip: gen.zip,
      location: this.location.value(),
      filename: this.filename.value(),
    });
  }

  async relational(schemas: DatasetSchema[]): Promise<string[]> {
    const gen = this.filter.execute(this.format.value());

    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas: schemas,
      verbose: this.verbose.value(),
    });

    const files = await gen.dumpRelational({
      resolver: resolver,
      filename: new Filename(this.filename.value()),
    });

    return this.writer.write({
      files: files,
      ext: gen.ext,
      zip: gen.zip,
      location: this.location.value(),
      filename: this.filename.value(),
    });
  }
}
