interface Props {
  fileName: string;
  location: string;
}
import { Generator } from "../Generator/Generator";
import fs from "fs";
import path from "path";
import { ChacaError } from "../../../../errors";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { CSVArray, CSVDataType, CSVObject } from "./core/types";
import AdmZip from "adm-zip";

interface Props {
  fileName: string;
  location: string;
}

export class CSVGenerator extends Generator {
  constructor(config: Props) {
    super({
      extension: "csv",
      fileName: config.fileName,
      location: config.location,
    });
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const allResolvers = resolver.getResolvers();

    if (allResolvers.length === 1) {
      const schemaData = allResolvers[0].resolve();
      const route = await this.createFile(this.fileName, schemaData);
      return route;
    } else {
      const zp = new AdmZip();
      const zipName = `${this.fileName}.zip`;
      const zipPath = path.join(this.baseLocation, zipName);

      const allRoutes = [] as Array<string>;

      for (const r of allResolvers) {
        const schemaData = r.resolve();
        const route = await this.createFile(r.getSchemaName(), schemaData);
        allRoutes.push(route);
      }

      for (const route of allRoutes) {
        zp.addLocalFile(route);
        await fs.promises.unlink(route);
      }

      zp.writeZip(zipPath);

      return zipPath;
    }
  }

  public async generateFile(data: any): Promise<string> {
    const fileRoute = await this.createFile(this.fileName, data);
    return fileRoute;
  }

  private async createFile(filename: string, data: any): Promise<string> {
    const fileRoute = path.join(this.baseLocation, `${filename}.csv`);

    const dataType = CSVDataType.filterTypeByValue(data);

    let content = "";
    if (dataType instanceof CSVArray) {
      content = dataType.getCSVValue();
    } else if (dataType instanceof CSVObject) {
      const array = [dataType.object];
      const newArrayType = new CSVArray(array);
      content = newArrayType.getCSVValue();
    } else {
      throw new ChacaError(
        `Your export data must be an array of objects or a single object.`,
      );
    }

    await fs.promises.writeFile(fileRoute, content, "utf-8");
    return fileRoute;
  }
}
