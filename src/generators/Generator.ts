import { FileConfig } from "../utils/interfaces/export.interface";

export abstract class Generator {
  protected ext: string;
  protected config: FileConfig;

  constructor(extension: string, config: FileConfig) {
    this.ext = extension;
    this.config = config;
  }

  public abstract generateFile(): Promise<void>;
}
