import { MultiGenerateResolver } from "../../core/helpers/MultiGenerate/classes/MultiGenerateResolver.js";
import { FileConfig } from "../../core/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import fs from "fs";

export class JsonGenerator extends Generator {
  constructor(config: FileConfig) {
    super("json", config);
  }

  public async generateFile(data: any): Promise<string> {
    const jsonContent = JSON.stringify(data);
    await fs.promises.writeFile(this.route, jsonContent, "utf-8");
    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    const data = resolver.resolve();
    return await this.generateFile(data);
  }
}
