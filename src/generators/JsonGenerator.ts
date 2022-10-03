import { FileConfig, ReturnDoc } from "../utils/interfaces/export.interface";
import { Generator } from "./Generator";
import fs from "fs";

export class JsonGenerator extends Generator {
  constructor(data: ReturnDoc[], config: FileConfig) {
    super(data, "json", config);
  }

  public async generateFile(): Promise<string> {
    const jsonContent = JSON.stringify(this.data);
    await fs.promises.writeFile(this.route, jsonContent, "utf-8");
    return this.fileName;
  }
}
