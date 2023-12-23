import path from "path";
import fs from "fs";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { ChacaUtils } from "../../../ChacaUtils/ChacaUtils";
import AdmZip from "adm-zip";

export interface Props {
  extension: string;
  fileName: string;
  location: string;
}

export abstract class Generator {
  protected utils = new ChacaUtils();

  protected fileName: string;
  protected location: string;

  protected ext: string;
  protected route: string;
  protected saveFileName: string;
  protected baseLocation: string;

  constructor({ fileName, location, extension }: Props) {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    this.fileName = fileName;
    this.location = location;

    this.ext = extension;
    this.saveFileName = `${fileName}.${this.ext}`;
    this.baseLocation = path.join("./", location);
    this.route = this.generateRoute(fileName);
  }

  public abstract generateFile(data: any): Promise<string>;
  public abstract generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string>;

  public getRoute() {
    return this.route;
  }

  protected generateRoute(name: string): string {
    return `${path.join(this.baseLocation, `${name}.${this.ext}`)}`;
  }

  protected createZip(name: string) {
    const zip = new AdmZip();
    const zipName = `${name}.zip`;
    const zipPath = path.join(this.baseLocation, zipName);

    return { zip, zipPath };
  }
}
