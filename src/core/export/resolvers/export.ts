import { FileConfig } from "../interfaces/export";
import { DatasetSchema } from "../../dataset-resolver/interfaces/resolver";
import { DatasetResolver } from "../../dataset-resolver/resolver";
import { FileName } from "../value-object/name";
import { Location } from "../value-object/location";
import { FileFormat } from "../value-object/format";
import { Verbose } from "../value-object/verbose";
import { ChacaUtils } from "../../utils";
import { DatatypeModule } from "../../../modules/datatype";
import { GeneratorFilter } from "./generator-filter";
import { FileCreator } from "../generators/file-creator/file-creator";

export class ExportResolver {
  private readonly format: FileFormat;
  private readonly filename: FileName;
  private readonly location: Location;
  private readonly verbose: Verbose;

  constructor(
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
    private readonly filter: GeneratorFilter,
    config: FileConfig,
  ) {
    this.filename = new FileName(config.filename);
    this.format = new FileFormat(config.format);
    this.location = new Location(config.location);
    this.verbose = new Verbose(config.verbose);
  }

  async data(data: any): Promise<string[]> {
    const gen = this.filter.execute(this.format.value());
    const fileCreator = new FileCreator(
      this.filename.value(),
      this.location.value(),
      gen.ext,
    );
    const route = await gen.createFile(fileCreator, data);

    return route;
  }

  async relational(schemas: DatasetSchema[]): Promise<string[]> {
    const gen = this.filter.execute(this.format.value());
    const fileCreator = new FileCreator(
      this.filename.value(),
      this.location.value(),
      gen.ext,
    );
    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas: schemas,
      verbose: this.verbose.value(),
    });

    const route = await gen.createRelationalFile(fileCreator, resolver);

    return route;
  }
}
