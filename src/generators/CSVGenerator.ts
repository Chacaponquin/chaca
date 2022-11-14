import { FileConfig } from "../utils/interfaces/export.interface.js";
import { Generator } from "./Generator.js";
import { Parser } from "json2csv";
import fs from "fs";

export class CSVGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "csv", config);
  }

  public async generateFile(): Promise<string> {
    const parser = new Parser();

    const str = parser.parse(this.data);

    await fs.promises.writeFile(this.route, str, "utf-8");

    return this.route;
  }
}
