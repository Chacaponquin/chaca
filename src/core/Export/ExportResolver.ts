import { ChacaError } from "../../errors/ChacaError.js";
import {
  CSVGenerator,
  Generator,
  JavaGenerator,
  JavascriptGenerator,
  JsonGenerator,
  PythonGenerator,
  SQLGenerator,
  TypescriptGenerator,
  YamlGenerator,
} from "./generators/index.js";
import { FileConfig } from "./interfaces/export.interface.js";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "../MultiGenerate/interfaces/multiGenerate.interface.js";
import { MultiGenerateResolver } from "../MultiGenerate/MultiGenerateResolver.js";
import { FileFormat, FileName, Location } from "./value-object/index.js";

export class ExportResolver {
  private config: FileConfig;

  constructor(config: FileConfig) {
    this.config = {
      fileName: new FileName(config.fileName).value(),
      format: new FileFormat(config.format).value(),
      location: new Location(config.location).value(),
    };
  }

  public async exportData(data: any): Promise<string> {
    const gen = this.filterGenerator();
    const route = await gen.generateFile(data);

    return route;
  }

  public async exportRelationalSchemas(
    schemas: Array<MultiGenerateSchema>,
    genConfig?: GenerateConfig,
  ): Promise<string> {
    const gen = this.filterGenerator();
    const multiResolver = new MultiGenerateResolver(schemas, genConfig);
    const route = await gen.generateRelationalDataFile(multiResolver);

    return route;
  }

  private filterGenerator(): Generator {
    let gen: Generator;

    switch (this.config.format) {
      case "json":
        gen = new JsonGenerator(this.config);
        break;
      case "javascript":
        gen = new JavascriptGenerator(this.config);
        break;
      case "csv":
        gen = new CSVGenerator(this.config);
        break;
      case "java":
        gen = new JavaGenerator(this.config);
        break;
      case "typescript":
        gen = new TypescriptGenerator(this.config);
        break;
      case "yaml":
        gen = new YamlGenerator(this.config);
        break;
      case "postgresql":
        gen = new SQLGenerator(this.config);
        break;
      case "python":
        gen = new PythonGenerator(this.config);
        break;
      default:
        throw new ChacaError(`Format '${this.config.format}' invalid`);
    }

    return gen;
  }
}
