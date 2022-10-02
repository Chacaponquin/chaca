import { FileConfig, ReturnDoc } from "../utils/interfaces/export.interface";
import path from "path";

export abstract class Generator {
  protected ext: string;
  protected config: FileConfig;
  protected data: ReturnDoc[];
  protected route: string;

  constructor(data: ReturnDoc[], extension: string, config: FileConfig) {
    this.ext = extension;
    this.config = config;
    this.data = data;

    this.route = `${path.join(
      "./",
      config.location,
      `${config.nameFile}.${this.ext}`
    )}`;
  }

  public abstract generateFile(): Promise<void>;
}
