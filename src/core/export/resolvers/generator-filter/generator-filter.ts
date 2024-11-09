import { ChacaError } from "../../../../errors";
import { ChacaUtils } from "../../../utils";
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
} from "../../generators";
import { ExportFormat } from "../../interfaces/export";

export class GeneratorFilter {
  constructor(private readonly utils: ChacaUtils) {}

  execute(format: ExportFormat): Generator {
    let gen: Generator;

    if (format === "json") {
      gen = new JsonGenerator({});
    } else if (format === "javascript") {
      gen = new JavascriptGenerator(this.utils, {});
    } else if (format === "csv") {
      gen = new CsvGenerator({});
    } else if (format === "java") {
      gen = new JavaGenerator(this.utils, {});
    } else if (format === "typescript") {
      gen = new TypescriptGenerator(this.utils, {});
    } else if (format === "yaml") {
      gen = new YamlGenerator({});
    } else if (format === "postgresql") {
      gen = new SQLGenerator(this.utils, format, {});
    } else if (format === "python") {
      gen = new PythonGenerator(this.utils, {});
    }

    // object config
    else if (typeof format === "object" && format !== null) {
      if (format.ext === "json") {
        gen = new JsonGenerator(format);
      } else if (format.ext === "csv") {
        gen = new CsvGenerator(format);
      } else if (format.ext === "java") {
        gen = new JavaGenerator(this.utils, format);
      } else if (format.ext === "javascript") {
        gen = new JavascriptGenerator(this.utils, format);
      } else if (format.ext === "postgresql") {
        gen = new SQLGenerator(this.utils, format.ext, format);
      } else if (format.ext === "python") {
        gen = new PythonGenerator(this.utils, format);
      } else if (format.ext === "typescript") {
        gen = new TypescriptGenerator(this.utils, format);
      } else if (format.ext === "yaml") {
        gen = new YamlGenerator(format);
      } else {
        throw new ChacaError(`Format '${format}' invalid for exportation`);
      }
    }

    // else
    else {
      throw new ChacaError(`Format '${format}' invalid for exportation`);
    }

    return gen;
  }
}
