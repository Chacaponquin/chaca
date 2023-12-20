import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { Generator } from "../Generator/Generator";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

interface ExtProps {
  separate: boolean;
}

interface Props {
  fileName: string;
  location: string;
  extConfig: ExtProps;
}

export class JsonGenerator extends Generator {
  private config: ExtProps;

  constructor({ extConfig, fileName, location }: Props) {
    super({
      extension: "json",
      fileName: fileName,
      location: location,
    });

    this.config = extConfig;
  }

  public async generateFile(data: any): Promise<string> {
    const jsonContent = JSON.stringify(data);
    await fs.promises.writeFile(this.route, jsonContent, "utf-8");
    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const objectData = resolver.resolve();

    if (this.config.separate) {
      const zp = new AdmZip();
      const zipName = `${this.fileName}.zip`;
      const zipPath = path.join(this.baseLocation, zipName);

      for (const [key, data] of Object.entries(objectData)) {
        const route = this.generateRoute(key);
        const jsonContent = JSON.stringify(data);
        await fs.promises.writeFile(route, jsonContent, "utf-8");

        zp.addLocalFile(route);
      }

      zp.writeZip(zipPath);

      return zipPath;
    } else {
      return await this.generateFile(objectData);
    }
  }
}
