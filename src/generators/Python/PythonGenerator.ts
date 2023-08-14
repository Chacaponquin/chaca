import { MultiGenerateResolver } from "../../core/classes/MultiGenerate/MultiGenerateResolver.js";
import { FileConfig } from "../../core/interfaces/export.interface.js";
import { Generator } from "../Generator/Generator.js";
import fs from "fs";

export class PythonGenerator extends Generator {
  constructor(config: FileConfig) {
    super("py", config);
  }

  public async generateFile(data: any): Promise<string> {
    await fs.promises.writeFile(this.route, "", "utf-8");
    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    await this.generateFile(resolver.resolve());
    return this.route;
  }
}
