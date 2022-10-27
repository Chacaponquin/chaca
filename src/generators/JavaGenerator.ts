import { FileConfig } from '../utils/interfaces/export.interface';
import { Generator } from './Generator';

export class JavaGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, 'java', config);
  }

  public async generateFile(): Promise<string> {
    return this.fileName;
  }
}
