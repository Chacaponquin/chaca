import path from "path";
import fs from "fs";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ChacaUtils } from "../../../utils";
import AdmZip from "adm-zip";

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
  protected route: string;
  protected saveFileName: string;
  protected baseLocation: string;

  constructor({ filename, location, extension }: Props) {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    this.filename = filename;
    this.location = location;

    this.ext = extension;
    this.saveFileName = `${filename}.${this.ext}`;
    this.baseLocation = path.join("./", location);
    this.route = this.generateRoute(filename);
  }

  public abstract generateFile(data: any): Promise<string>;
  public abstract generateRelationalDataFile(
    resolver: DatasetResolver,
  ): Promise<string>;

  public getRoute() {
    return this.route;
  }

  protected generateRoute(name: string): string {
    return `${path.join(this.baseLocation, `${name}.${this.ext}`)}`;
  }

  protected createZip() {
    const zip = new AdmZip();
    const zipName = `${this.filename}.zip`;
    const zipPath = path.join(this.baseLocation, zipName);

    return { zip, zipPath };
  }

  protected async createFileZip(): Promise<string> {
    const { zip, zipPath } = this.createZip();

    zip.addLocalFile(this.route);
    zip.writeZip(zipPath);

    await fs.promises.unlink(this.route);

    return zipPath;
  }
}
