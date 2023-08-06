import { FileConfig } from "../core/interfaces/export.interface.js";
import path from "path";
import { ChacaError } from "../errors/ChacaError.js";
import { MultiGenerateResolver } from "../core/classes/MultiGenerate/MultiGenerateResolver.js";
import { ChacaUtils } from "../core/classes/ChacaUtils/ChacaUtils.js";

export abstract class Generator {
  protected utils = new ChacaUtils();

  protected ext: string;
  protected config: FileConfig;
  protected route: string;
  protected fileName: string;
  protected baseLocation: string;

  constructor(extension: string, config: FileConfig) {
    if (!(typeof config.fileName === "string") || config.fileName.length === 0)
      throw new ChacaError("A file name is necesary to export the data");
    else if (!(typeof config.location === "string"))
      throw new ChacaError("The file needs a location");

    this.ext = extension;
    this.config = config;
    this.fileName = `${config.fileName}.${this.ext}`;
    this.baseLocation = path.join("./", this.config.location);
    this.route = this.generateRoute(config.fileName);
  }

  public abstract generateFile(data: any): Promise<string>;
  public abstract generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string>;

  public getRoute() {
    return this.route;
  }

  protected generateRoute(name: string): string {
    return `${path.join(this.baseLocation, `${name}.${this.ext}`)}`;
  }
}
