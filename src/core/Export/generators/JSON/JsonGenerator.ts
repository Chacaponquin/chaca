import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { Generator } from "../Generator/Generator";
import fs from "fs";

interface ExtProps {
  separate?: boolean;
  zip?: boolean;
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
      const allRoutes: Array<string> = [];

      for (const [key, data] of Object.entries(objectData)) {
        const route = this.generateRoute(key);
        const jsonContent = JSON.stringify(data);
        await fs.promises.writeFile(route, jsonContent, "utf-8");
      }

      if (this.config.zip) {
        const { zip, zipPath } = this.createZip();

        for (const route of allRoutes) {
          zip.addLocalFile(route);
          await fs.promises.unlink(route);
        }

        zip.writeZip(zipPath);

        return zipPath;
      } else {
        return this.baseLocation;
      }
    } else {
      if (this.config.zip) {
        const { zip, zipPath } = this.createZip();

        const route = await this.generateFile(objectData);
        zip.addLocalFile(route);
        zip.writeZip(zipPath);

        return zipPath;
      } else {
        return await this.generateFile(objectData);
      }
    }
  }
}
