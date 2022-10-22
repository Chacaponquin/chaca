import { FileConfig } from '../utils/interfaces/export.interface';
import path from 'path';
import { CHDataError } from '../errors/CHDataError';

export abstract class Generator {
  protected ext: string;
  protected config: FileConfig;
  protected data: any;
  protected route: string;
  protected fileName: string;

  constructor(data: any, extension: string, config: FileConfig) {
    if (!(typeof config.fileName === 'string') || config.fileName.length === 0)
      throw new CHDataError('A file name is necesary to export the data');
    else if (!(typeof config.location === 'string'))
      throw new CHDataError('The file needs a location');
    else if (!(typeof data === 'object') || data === null)
      throw new CHDataError('The data must be an array or an object');

    this.ext = extension;
    this.config = config;
    this.data = data;
    this.fileName = `${config.fileName}.${this.ext}`;

    this.route = `${path.join(
      './',
      config.location,
      `${config.fileName}.${this.ext}`,
    )}`;
  }

  public abstract generateFile(): Promise<string>;
}
