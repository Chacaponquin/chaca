import { DatatypeModule } from "../../../../modules/datatype";
import { DatasetSchema } from "../../../dataset-resolver/interfaces/resolver";
import { DatasetResolver } from "../../../dataset-resolver/dataset-resolver";
import { ChacaUtils } from "../../../utils";
import { Filename } from "../../generators/file-creator/filename";
import { DumpFile } from "../../generators/generator/generator";
import { DumpConfig } from "../../interfaces/export";
import { FileFormat } from "../../value-object/format";
import { FileName } from "../../value-object/name";
import { Verbose } from "../../value-object/verbose";
import { GeneratorFilter } from "../generator-filter/generator-filter";
import { ExtensionFilename } from "./value-object/filename";

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
    const generator = this.filter.execute(this.format.value());

    const result = generator.dump({
      data: data,
      filename: new Filename(this.filename.value()),
    });

    return result.map((r) => {
      return {
        content: r.content,
        filename: new ExtensionFilename(r.filename, generator.ext).value(),
      };
    });
  }

  async relational(schemas: DatasetSchema[]): Promise<DumpFile[]> {
    const generator = this.filter.execute(this.format.value());

    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas: schemas,
      verbose: this.verbose.value(),
    });

    const result = await generator.dumpRelational({
      resolver: resolver,
      filename: new Filename(this.filename.value()),
    });

    return result.map((r) => {
      return {
        content: r.content,
        filename: new ExtensionFilename(r.filename, generator.ext).value(),
      };
    });
  }
}

export type { DumpFile, DumpConfig };
