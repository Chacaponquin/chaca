import { Route } from "./route";
import { Filename } from "./filename";
import { Zip } from "./zip";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

export class FileCreator {
  private readonly baseLocation: string;
  readonly filename: Filename;

  constructor(
    filename: string,
    location: string,
    private readonly ext: string,
  ) {
    if (location && !fs.existsSync(location)) {
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

    const zipPath = new Route(
      new Filename(this.filename.value()),
      this.baseLocation,
      "zip",
    );

    return new Zip(zipPath.value(), zip, this);
  }

  async deleteFile(route: Route): Promise<void> {
    await fs.promises.unlink(route.value());
  }

  async writeFile(route: Route, code: string): Promise<void> {
    await fs.promises.writeFile(route.value(), code, "utf-8");
  }
}
