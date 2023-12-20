import { ExportFormat, JsonFormatConfig } from "../interfaces/export";
import { ChacaError } from "../../../errors";

export class FileFormat {
  private _value: ExportFormat;

  constructor(format?: ExportFormat) {
    if (typeof format === "string") {
      this._value = format;
    } else if (typeof format === "object") {
      if (format.ext === "json") {
        this._value = this.validateJson(format);
      } else {
        throw new ChacaError(`Format '${format.ext}' invalid for export`);
      }
    } else {
      throw new ChacaError(`Format '${format}' invalid for export`);
    }

    this._value = format;
  }

  private validateJson(format: JsonFormatConfig): JsonFormatConfig {
    const config: JsonFormatConfig = { ext: "json", separate: false };

    config.separate = format.separate;

    return config;
  }

  public value() {
    return this._value;
  }
}
