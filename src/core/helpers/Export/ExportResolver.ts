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
} from "../MultiGenerate/MultiGenerate.js";
import { MultiGenerateResolver } from "../MultiGenerate/classes/MultiGenerateResolver.js";

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
    if (this.config && typeof this.config.format === "string") {
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
        default:
          throw new ChacaError(
            `Format '${String(this.config.format)}' invalid`,
          );
      }

      return gen;
    } else {
      throw new ChacaError(`Format '${String(this.config.format)}' invalid`);
    }
  }
}
