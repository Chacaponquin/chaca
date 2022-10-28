import { FileConfig } from "../utils/interfaces/export.interface";
import path from "path";
import { CHDataError } from "../errors/CHDataError";

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
    if (!(typeof config.fileName === "string") || config.fileName.length === 0)
      throw new CHDataError("A file name is necesary to export the data");
    else if (!(typeof config.location === "string"))
      throw new CHDataError("The file needs a location");
    else if (!(typeof data === "object") || data === null)
      throw new CHDataError("The data must be an array or an object");

    this.ext = extension;
    this.config = config;
    this.fileName = `${config.fileName}.${this.ext}`;
    this.baseLocation = path.join("./", this.config.location);
    this.route = this.generateRoute(config.fileName);
  }

  public abstract generateFile(): Promise<string>;

  protected generateRoute(name: string): string {
    return `${path.join(this.baseLocation, `${name}.${this.ext}`)}`;
  }
}
