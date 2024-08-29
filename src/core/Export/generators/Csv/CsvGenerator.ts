import { Generator } from "../generator/Generator";
import fs from "fs";
import path from "path";
import { ChacaError } from "../../../../errors";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { CSVArray, CSVDataType, CSVObject } from "./core/types";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
}

export class CsvGenerator extends Generator {
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "csv",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  public async generateRelationalDataFile(
    resolver: DatasetResolver,
  ): Promise<string> {
    const allResolvers = resolver.getResolvers();

    if (allResolvers.length === 1) {
      const schemaData = allResolvers[0].resolve();
      const route = await this.createFile(this.filename, schemaData);

      return route;
    } else {
      const allRoutes = [] as Array<string>;

      for (const r of allResolvers) {
        const schemaData = r.resolve();
        const route = await this.createFile(r.getSchemaName(), schemaData);
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
  }

  public async generateFile(data: any): Promise<string> {
    const fileRoute = await this.createFile(this.filename, data);

    if (this.zip) {
      const { zip, zipPath } = this.createZip();

      zip.addLocalFile(fileRoute);
      zip.writeZip(zipPath);

      await fs.promises.unlink(fileRoute);

      return zipPath;
    } else {
      return fileRoute;
    }
  }

  private async createFile(filename: string, data: any): Promise<string> {
    const fileRoute = path.join(this.baseLocation, `${filename}.csv`);

    const dataType = CSVDataType.filterTypeByValue(data);

    let content = "";

    // array
    if (dataType instanceof CSVArray) {
      content = dataType.getCSVValue();
    }

    // object
    else if (dataType instanceof CSVObject) {
      const array = [dataType.object];
      const newArrayType = new CSVArray(array);

      content = newArrayType.getCSVValue();
    }

    // other
    else {
      throw new ChacaError(
        `Your export data must be an array of objects or a single object.`,
      );
    }

    await fs.promises.writeFile(fileRoute, content, "utf-8");

    return fileRoute;
  }
}
