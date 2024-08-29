import {
  CsvFormatConfig,
  ExportFormat,
  JavaFormatConfig,
  JavascriptFormatConfig,
  JsonFormatConfig,
  PostgresqlFormatConfig,
  PythonFormatConfig,
  TypescriptFormatConfig,
  YamlFormatConfig,
} from "../interfaces/export";
import { ChacaError } from "../../../errors";

export class FileFormat {
  private _value: ExportFormat;

  constructor(format?: ExportFormat) {
    if (typeof format === "string") {
      this._value = format;
    } else if (typeof format === "object" && format !== null) {
      if (format.ext === "json") {
        this._value = this.validateJson(format);
      } else if (format.ext === "csv") {
        this._value = this.validateCsv(format);
      } else if (format.ext === "java") {
        this._value = this.validateJava(format);
      } else if (format.ext === "javascript") {
        this._value = this.validateJs(format);
      } else if (format.ext === "postgresql") {
        this._value = this.validatePostgresql(format);
      } else if (format.ext === "python") {
        this._value = this.validatePython(format);
      } else if (format.ext === "typescript") {
        this._value = this.validateTs(format);
      } else if (format.ext === "yaml") {
        this._value = this.validateYaml(format);
      } else {
        throw new ChacaError(`Invalid format for exportation`);
      }
    } else {
      throw new ChacaError(`Invalid format for exportation`);
    }

    this._value = format;
  }

  private validateYaml(format: YamlFormatConfig): YamlFormatConfig {
    const config: YamlFormatConfig = { ext: "yaml" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateTs(format: TypescriptFormatConfig): TypescriptFormatConfig {
    const config: TypescriptFormatConfig = { ext: "typescript" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validatePython(format: PythonFormatConfig): PythonFormatConfig {
    const config: PythonFormatConfig = { ext: "python" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validatePostgresql(
    format: PostgresqlFormatConfig,
  ): PostgresqlFormatConfig {
    const config: PostgresqlFormatConfig = { ext: "postgresql" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateJs(format: JavascriptFormatConfig): JavascriptFormatConfig {
    const config: JavascriptFormatConfig = { ext: "javascript" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateCsv(format: CsvFormatConfig): CsvFormatConfig {
    const config: CsvFormatConfig = { ext: "csv" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateJson(format: JsonFormatConfig): JsonFormatConfig {
    const config: JsonFormatConfig = {
      ext: "json",
    };

    if (typeof format === "object" && format !== null) {
      config.separate = Boolean(format.separate);
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateJava(format: JavaFormatConfig): JavaFormatConfig {
    const config: JavaFormatConfig = { ext: "java" };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  public value() {
    return this._value;
  }
}
