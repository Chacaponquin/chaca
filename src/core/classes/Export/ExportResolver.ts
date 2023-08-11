import { ChacaError } from "../../../errors/ChacaError.js";
import {
  CSVGenerator,
  Generator,
  JavaGenerator,
  JavascriptGenerator,
  JsonGenerator,
  SQLGenerator,
  TypescriptGenerator,
  YamlGenerator,
} from "../../../generators/index.js";
import { FileConfig } from "../../interfaces/export.interface.js";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "../MultiGenerate/interfaces/multiGenerate.interface.js";
import { MultiGenerateResolver } from "../MultiGenerate/MultiGenerateResolver.js";
import { FileFormat, FileName, Location } from "./value-object/index.js";

export class ExportResolver {
  constructor(private readonly config: FileConfig) {}

  public async exportData(data: any): Promise<string> {
    const gen = this.filterGenerator();
    return await gen.generateFile(data);
  }

  public async exportRelationalSchemas(
    schemas: Array<MultiGenerateSchema>,
    genConfig?: GenerateConfig,
  ): Promise<string> {
    const gen = this.filterGenerator();
    const multiResolver = new MultiGenerateResolver(schemas, genConfig);
    return await gen.generateRelationalDataFile(multiResolver);
  }

  private filterGenerator(): Generator {
    let gen: Generator;

    const config: FileConfig = {
      fileName: new FileName(this.config.fileName).value(),
      format: new FileFormat(this.config.format).value(),
      location: new Location(this.config.location).value(),
    };

    switch (this.config.format) {
      case "json":
        gen = new JsonGenerator(config);
        break;
      case "javascript":
        gen = new JavascriptGenerator(config);
        break;
      case "csv":
        gen = new CSVGenerator(config);
        break;
      case "java":
        gen = new JavaGenerator(config);
        break;
      case "typescript":
        gen = new TypescriptGenerator(config);
        break;
      case "yaml":
        gen = new YamlGenerator(config);
        break;
      case "postgresql":
        gen = new SQLGenerator(config);
        break;
      default:
        throw new ChacaError(`Format '${config.format}' invalid`);
    }

    return gen;
  }
}
