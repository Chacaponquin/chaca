import { DatatypeModule } from "../../../modules/datatype";
import { DatasetSchema } from "../../dataset-resolver/interfaces/resolver";
import { DatasetResolver } from "../../dataset-resolver/resolver";
import { ChacaUtils } from "../../utils";
import { Filename } from "../generators/file-creator/filename";
import { DumpFile } from "../generators/generator";
import { DumpConfig } from "../interfaces/export";
import { FileFormat } from "../value-object/format";
import { FileName } from "../value-object/name";
import { Verbose } from "../value-object/verbose";
import { GeneratorFilter } from "./generator-filter";

export class DumpResolver {
  private readonly format: FileFormat;
  private readonly filename: FileName;
  private readonly verbose: Verbose;

  constructor(
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    private readonly filter: GeneratorFilter,
    config: DumpConfig,
  ) {
    this.format = new FileFormat(config.format);
    this.filename = new FileName(config.filename);
    this.verbose = new Verbose(config.verbose);
  }

  data(data: any): DumpFile[] {
    const gen = this.filter.execute(this.format.value());

    return gen.dump({
      data: data,
      filename: new Filename(this.filename.value()),
    });
  }

  relational(schemas: DatasetSchema[]): DumpFile[] {
    const gen = this.filter.execute(this.format.value());

    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas: schemas,
      verbose: this.verbose.value(),
    });

    return gen.dumpRelational({
      resolver: resolver,
      filename: new Filename(this.filename.value()),
    });
  }
}

export type { DumpFile, DumpConfig };
