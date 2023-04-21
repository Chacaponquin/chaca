import { FileConfig } from "../core/interfaces/export.interface.js";
import path from "path";
import { ChacaError } from "../errors/ChacaError.js";

export abstract class Generator {
  protected ext: string;
  protected config: FileConfig;
  protected route: string;
  protected fileName: string;
  protected baseLocation: string;

  constructor(
    protected readonly data: any,
    extension: string,
    config: FileConfig,
  ) {
    this.validateData();
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

  private validateData(): void {
    if (typeof this.data === "function") {
      throw new ChacaError("The data can not be a function");
    }
  }

  public abstract generateFile(): Promise<string>;

  protected generateRoute(name: string): string {
    return `${path.join(this.baseLocation, `${name}.${this.ext}`)}`;
  }
}
