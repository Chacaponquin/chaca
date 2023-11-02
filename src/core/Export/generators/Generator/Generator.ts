import { FileConfig } from "../../interfaces/export";
import path from "path";
import fs from "fs";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { ChacaUtils } from "../../../ChacaUtils/ChacaUtils";

export interface GeneratorProps {
  extension: string;
  config: FileConfig;
}

export abstract class Generator {
  protected utils = new ChacaUtils();

  protected ext: string;
  protected config: FileConfig;
  protected route: string;
  protected fileName: string;
  protected baseLocation: string;

  constructor({ config, extension }: GeneratorProps) {
    if (!fs.existsSync(config.location)) {
      fs.mkdirSync(config.location, { recursive: true });
    }

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
