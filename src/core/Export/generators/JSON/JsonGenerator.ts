import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { FileConfig } from "../../interfaces/export";
import { Generator } from "../Generator/Generator";
import fs from "fs";

interface ExtProps {
  separate: boolean;
}

interface Props {
  config: FileConfig;
  extConfig: ExtProps;
}

export class JsonGenerator extends Generator {
  // private config: ExtProps;

  constructor({ config }: Props) {
    super({
      extension: "json",
      fileName: config.fileName,
      location: config.location,
    });

    //this.config = extConfig;
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
