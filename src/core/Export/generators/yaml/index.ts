import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import fs from "fs";
import yaml from "js-yaml";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
  separate?: boolean;
}

export class YamlGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  constructor(config: Props) {
    super({
      extension: "yaml",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);
  }

  async createFile(data: any): Promise<string> {
    const result = yaml.dump(data, { skipInvalid: true });

    await fs.promises.writeFile(this.route, result, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string> {
    const relationalData = resolver.resolve();

    if (this.separate) {
      const allRoutes: string[] = [];

      for (const [key, data] of Object.entries(relationalData)) {
        const route = this.generateRoute(key);

        const result = yaml.dump(data, { skipInvalid: true });
        await fs.promises.writeFile(route, result, "utf-8");

        allRoutes.push(route);
      }

      if (this.zip) {
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
    }

    return await this.createFile(relationalData);
  }
}
