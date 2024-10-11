import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ChacaError } from "../../../../errors";
import { Generator } from "../generator";
import fs from "fs";
import yaml from "js-yaml";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
}

export class YamlGenerator extends Generator {
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "yaml",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  async createFile(data: any): Promise<string> {
    if (!Array.isArray(data)) {
      throw new ChacaError(`You can only export data that is inside an array`);
    }

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
    return await this.createFile(relationalData);
  }
}
