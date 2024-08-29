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
import { DatasetSchema } from "../dataset-resolver/interfaces/resolver";
import { DatasetResolver } from "../dataset-resolver/resolver";
import { FileName } from "./value-object/name";
import { Location } from "./value-object/location";
import { FileFormat } from "./value-object/format";
import { Verbose } from "./value-object/verbose";

export class ExportResolver {
  private config: Required<FileConfig>;

  constructor(config: FileConfig) {
    this.config = {
      filename: new FileName(config.filename).value(),
      format: new FileFormat(config.format).value(),
      location: new Location(config.location).value(),
      verbose: new Verbose(config.verbose).value(),
    };
  }

  async data(data: any): Promise<string> {
    const gen = this.filterGenerator();
    const route = await gen.generateFile(data);

    return route;
  }

  async relational(schemas: DatasetSchema[]): Promise<string> {
    const gen = this.filterGenerator();
    const resolver = new DatasetResolver({
      schemas: schemas,
      verbose: this.config.verbose,
    });

    const route = await gen.generateRelationalDataFile(resolver);

    return route;
  }

  private filterGenerator(): Generator {
    let gen: Generator;
    const format = this.config.format;

    if (format === "json") {
      gen = new JsonGenerator({
        filename: this.config.filename,
        location: this.config.location,
        extConfig: {},
      });
    } else if (format === "javascript") {
      gen = new JavascriptGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    } else if (format === "csv") {
      gen = new CsvGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    } else if (format === "java") {
      gen = new JavaGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    } else if (format === "typescript") {
      gen = new TypescriptGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    } else if (format === "yaml") {
      gen = new YamlGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    } else if (format === "postgresql") {
      gen = new SQLGenerator({
        filename: this.config.filename,
        format: format,
        location: this.config.location,
      });
    } else if (format === "python") {
      gen = new PythonGenerator({
        filename: this.config.filename,
        location: this.config.location,
      });
    }

    // object config
    else if (typeof format === "object") {
      if (format.ext === "json") {
        gen = new JsonGenerator({
          filename: this.config.filename,
          location: this.config.location,
          extConfig: { separate: format.separate, zip: format.zip },
        });
      } else if (format.ext === "csv") {
        gen = new CsvGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "java") {
        gen = new JavaGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "javascript") {
        gen = new JavascriptGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "postgresql") {
        gen = new SQLGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
          format: format.ext,
        });
      } else if (format.ext === "python") {
        gen = new PythonGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "typescript") {
        gen = new TypescriptGenerator({
          filename: this.config.filename,
          location: this.config.location,
          zip: format.zip,
        });
      } else if (format.ext === "yaml") {
        gen = new YamlGenerator({
          filename: this.config.filename,
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
