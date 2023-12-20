import { ChacaError } from "../../errors";
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
} from "./generators";
import { FileConfig } from "./interfaces/export";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "../MultiGenerate/interfaces/multi-generate";
import { MultiGenerateResolver } from "../MultiGenerate/MultiGenerateResolver";
import { FileFormat, FileName, Location } from "./value-object";

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
    const format = this.config.format;

    if (format === "json") {
      if (typeof this.config.format === "string") {
        gen = new JsonGenerator({
          config: this.config,
          extConfig: { separate: false },
        });
      } else {
        gen = new JsonGenerator({
          config: this.config,
          extConfig: { separate: false },
        });
      }
    } else if (format === "javascript") {
      gen = new JavascriptGenerator(this.config);
    } else if (format === "csv") {
      gen = new CSVGenerator(this.config);
    } else if (format === "java") {
      gen = new JavaGenerator(this.config);
    } else if (format === "typescript") {
      gen = new TypescriptGenerator(this.config);
    } else if (format === "yaml") {
      gen = new YamlGenerator(this.config);
    } else if (format === "postgresql") {
      gen = new SQLGenerator({
        fileName: this.config.fileName,
        format: format,
        location: this.config.location,
      });
    } else if (format === "python") {
      gen = new PythonGenerator(this.config);
    }

    // object config
    else if (typeof format === "object") {
      if (format.ext === "json") {
        gen = new JsonGenerator({
          config: this.config,
          extConfig: { separate: format.separate },
        });
      } else {
        throw new ChacaError(`Format '${this.config.format}' invalid`);
      }
    } else {
      throw new ChacaError(`Format '${this.config.format}' invalid`);
    }

    return gen;
  }
}
