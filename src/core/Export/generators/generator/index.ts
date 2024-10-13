import path from "path";
import fs from "fs";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ChacaUtils } from "../../../utils";
import AdmZip from "adm-zip";
import { Filename } from "./name";
import { Route } from "./route";
import { Zip } from "./zip";

export interface Props {
  extension: string;
  filename: string;
  location: string;
}

export abstract class Generator {
  protected utils = new ChacaUtils();

  protected filename: string;
  protected location: string;

  protected ext: string;
  private readonly baseLocation: string;

  constructor({ filename, location, extension }: Props) {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    this.filename = filename;
    this.location = location;

    this.ext = extension;
    this.baseLocation = path.join("./", location);
  }

  abstract createFile(data: any): Promise<string[]>;
  abstract createRelationalFile(resolver: DatasetResolver): Promise<string[]>;

  protected generateRoute(filename: Filename): Route {
    return new Route(filename, this.baseLocation, this.ext);
  }

  protected createZip(): Zip {
    const zip = new AdmZip();
    const zipName = new Filename(`${this.filename}.zip`);

    const zipPath = this.generateRoute(zipName).value();

    return new Zip(zipPath, zip, this);
  }

  async deleteFile(route: Route): Promise<void> {
    await fs.promises.unlink(route.value());
  }

  async writeFile(route: Route, code: string): Promise<void> {
    await fs.promises.writeFile(route.value(), code, "utf-8");
  }
}
