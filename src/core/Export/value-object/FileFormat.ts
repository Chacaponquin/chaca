import {
  CsvFormatConfig,
  ExportFormat,
  JavaFormatConfig,
  JsonFormatConfig,
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
      } else {
        throw new ChacaError(`Invalid format for exportation`);
      }
    } else {
      throw new ChacaError(`Invalid format for exportation`);
    }

    this._value = format;
  }

  private validateCsv(format: CsvFormatConfig): CsvFormatConfig {
    const config: CsvFormatConfig = { ext: "csv", zip: false };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateJson(format: JsonFormatConfig): JsonFormatConfig {
    const config: JsonFormatConfig = {
      ext: "json",
      separate: false,
      zip: false,
    };

    if (typeof format === "object" && format !== null) {
      config.separate = Boolean(format.separate);
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  private validateJava(format: JavaFormatConfig): JavaFormatConfig {
    const config: JavaFormatConfig = { ext: "java", zip: false };

    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }

    return config;
  }

  public value() {
    return this._value;
  }
}
