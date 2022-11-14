import { FileConfig } from "../utils/interfaces/export.interface.js";
import { Generator } from "./Generator.js";
import fs from "fs";

export class JsonGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "json", config);
  }

  public async generateFile(): Promise<string> {
    const jsonContent = JSON.stringify(this.data);
    await fs.promises.writeFile(this.route, jsonContent, "utf-8");
    return this.route;
  }
}
