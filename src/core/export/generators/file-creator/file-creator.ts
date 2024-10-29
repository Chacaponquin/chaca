import AdmZip from "adm-zip";
import { Route } from "./route";
import { Filename } from "./filename";
import { Zip } from "./zip";
import fs from "fs";
import path from "path";

export class FileCreator {
  private readonly baseLocation: string;
  readonly filename: Filename;

  constructor(
    filename: string,
    location: string,
    private readonly ext: string,
  ) {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    this.filename = new Filename(filename);
    this.baseLocation = path.join("./", location);
  }

  generateRoute(filename: Filename): Route {
    return new Route(filename, this.baseLocation, this.ext);
  }

  createZip(): Zip {
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
