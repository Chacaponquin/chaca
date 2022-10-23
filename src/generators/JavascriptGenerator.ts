import { FileConfig } from '../utils/interfaces/export.interface';
import { Generator } from './Generator';
import fs from 'fs';
import { CHDataUtils } from '../utils/CHDataUtils';
import { ReturnValue } from '../utils/interfaces/value.interface';

export class JavascriptGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, 'js', config);
  }

  public async generateFile(): Promise<string> {
    let returnData = ``;

    if (Array.isArray(this.data)) {
      returnData += `const ${CHDataUtils.capitalizeText(
        this.config.fileName,
      )} = ${this.generateSchemaArray(this.data)};\n`;
    } else {
      returnData += `const ${CHDataUtils.capitalizeText(
        this.config.fileName,
      )} = ${this.generateObject(this.data)}`;
    }

    await fs.promises.writeFile(this.route, returnData, 'utf-8');

    return this.fileName;
  }

  public generateSchemaArray(
    schemaObjects: { [path: string]: ReturnValue | ReturnValue[] }[],
  ): string {
    let returnArray = `[`;

    for (let i = 0; i < schemaObjects.length; i++) {
      if (
        typeof schemaObjects[i] === 'object' &&
        !Array.isArray(schemaObjects[i])
      ) {
        if (i !== schemaObjects.length - 1)
          returnArray += `${this.generateObject(schemaObjects[i])}, `;
        else returnArray += `${this.generateObject(schemaObjects[i])}`;
      }
    }

    returnArray += ']\n';

    return returnArray;
  }

  private filterTypeValue(value: ReturnValue | ReturnValue[]): string {
    let returnValue = 'undefined';

    if (typeof value === 'string') returnValue = `"${value}"`;
    else if (typeof value === 'number' || typeof value === 'boolean')
      returnValue = `${value}`;
    else if (typeof value === 'object') {
      if (Array.isArray(value)) returnValue = this.generateArray(value);
      else {
        if (value === null) returnValue = 'null';
        else if (value instanceof Date) returnValue = `${value.toString()}`;
        else returnValue = this.generateObject(value);
      }
    }

    return returnValue;
  }

  public generateObject(doc: {
    [key: string]: ReturnValue | ReturnValue[];
  }): string {
    let objectData = `{`;
    for (const [key, value] of Object.entries(doc)) {
      const val = this.filterTypeValue(value);
      objectData += `${key}: ${val},`;
    }
    objectData += '}';

    return objectData;
  }

  private generateArray(array: ReturnValue[]): string {
    let returnArray = '[';
    for (let i = 0; i < array.length; i++) {
      if (i !== array.length - 1) {
        returnArray += `${this.filterTypeValue(array[i])}, `;
      } else returnArray += `${this.filterTypeValue(array[i])}`;
    }
    returnArray += ']';

    return returnArray;
  }
}
