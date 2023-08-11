import { FileConfig } from "../../core/interfaces/export.interface.js";
import path from "path";
import { MultiGenerateResolver } from "../../core/classes/MultiGenerate/MultiGenerateResolver.js";
import { ChacaUtils } from "../../core/classes/ChacaUtils/ChacaUtils.js";

export abstract class Generator {
  protected utils = new ChacaUtils();

  protected ext: string;
  protected config: FileConfig;
  protected route: string;
  protected fileName: string;
  protected baseLocation: string;

  constructor(extension: string, config: FileConfig) {
    this.ext = extension;
    this.config = config;
    this.fileName = `${this.config.fileName}.${this.ext}`;
    this.baseLocation = path.join("./", this.config.location);
    this.route = this.generateRoute(this.config.fileName);
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
}
