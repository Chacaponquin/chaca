import { ChacaError } from "../../errors";
import {
  CsvGenerator,
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
      gen = new JsonGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
        extConfig: {},
      });
    } else if (format === "javascript") {
      gen = new JavascriptGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    } else if (format === "csv") {
      gen = new CsvGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    } else if (format === "java") {
      gen = new JavaGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    } else if (format === "typescript") {
      gen = new TypescriptGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    } else if (format === "yaml") {
      gen = new YamlGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    } else if (format === "postgresql") {
      gen = new SQLGenerator({
        fileName: this.config.fileName,
        format: format,
        location: this.config.location,
      });
    } else if (format === "python") {
      gen = new PythonGenerator({
        fileName: this.config.fileName,
        location: this.config.location,
      });
    }

    // object config
    else if (typeof format === "object") {
      if (format.ext === "json") {
        gen = new JsonGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          extConfig: { separate: format.separate, zip: format.zip },
        });
      } else if (format.ext === "csv") {
        gen = new CsvGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "java") {
        gen = new JavaGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "javascript") {
        gen = new JavascriptGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "postgresql") {
        gen = new SQLGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
          format: format.ext,
        });
      } else if (format.ext === "python") {
        gen = new PythonGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "typescript") {
        gen = new TypescriptGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "yaml") {
        gen = new YamlGenerator({
          fileName: this.config.fileName,
          location: this.config.location,
          zip: format.zip,
        });
      } else {
        throw new ChacaError(
          `Format '${this.config.format}' invalid for exportation`,
        );
      }
    }

    // else
    else {
      throw new ChacaError(
        `Format '${this.config.format}' invalid for exportation`,
      );
    }

    return gen;
  }
}
