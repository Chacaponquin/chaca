import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { FileConfig } from "../../interfaces/export";
import { Generator } from "../Generator/Generator";
import fs from "fs";

export class JsonGenerator extends Generator {
  constructor(config: FileConfig) {
    super({ extension: "json", config });
  }

  public async generateFile(data: any): Promise<string> {
    const jsonContent = JSON.stringify(data);
    await fs.promises.writeFile(this.route, jsonContent, "utf-8");
    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const data = resolver.resolve();
    return await this.generateFile(data);
  }
}
