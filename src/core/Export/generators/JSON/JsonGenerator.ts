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

  private async createFile(route: string, content: any): Promise<void> {
    const jsonContent = JSON.stringify(content);
    await fs.promises.writeFile(route, jsonContent, "utf-8");
  }

  public async generateFile(data: any): Promise<string> {
    await this.createFile(this.route, data);

    if (this.config.zip) {
      return this.createFileZip();
    } else {
      return this.route;
    }
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const objectData = resolver.resolve();

    if (this.config.separate) {
      const allRoutes: Array<string> = [];

      for (const [key, data] of Object.entries(objectData)) {
        const route = this.generateRoute(key);
        await this.createFile(route, data);

        allRoutes.push(route);
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
      return await this.generateFile(objectData);
    }
  }
}
