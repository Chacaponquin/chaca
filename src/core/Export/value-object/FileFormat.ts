import { ExportFormat } from "../../Export/interfaces/export.interface.js";
import { ChacaError } from "../../../errors/ChacaError.js";

export class FileFormat {
  private _value: ExportFormat;

  constructor(format?: ExportFormat) {
    if (typeof format !== "string") {
      throw new ChacaError(`Format '${format}' invalid`);
    }

    this._value = format;
  }

  public value() {
    return this._value;
  }
}
