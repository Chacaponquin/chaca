import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import fs from "fs";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";

export class JavascriptGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "js", config);
  }

  public async generateFile(): Promise<string> {
    let returnData = ``;

    const variableName = PrivateUtils.camelCaseText(this.config.fileName);

    if (Array.isArray(this.data)) {
      returnData += `const ${variableName} = ${this.generateSchemaArray(
        this.data,
      )};\n`;
    } else {
      returnData += `const ${variableName} = ${this.filterTypeValue(
        this.data,
      )}`;
    }

    await fs.promises.writeFile(this.route, returnData, "utf-8");

    return this.route;
  }

  public generateSchemaArray(schemaObjects: { [path: string]: any }[]): string {
    let returnArray = `[`;

    for (let i = 0; i < schemaObjects.length; i++) {
      if (i !== schemaObjects.length - 1)
        returnArray += `${this.filterTypeValue(schemaObjects[i])}, `;
      else {
        returnArray += `${this.filterTypeValue(schemaObjects[i])}`;
      }
    }

    returnArray += "]\n";

    return returnArray;
  }

  public filterTypeValue(value: any): string {
    let returnValue = "undefined";

    if (typeof value === "string") {
      returnValue = `"${value}"`;
    } else if (typeof value === "number" || typeof value === "boolean") {
      returnValue = `${value}`;
    } else if (typeof value === "object") {
      if (Array.isArray(value)) returnValue = this.generateArray(value);
      else {
        if (value === null) returnValue = "null";
        else if (value instanceof Date) {
          returnValue = `new Date("${value.toISOString()}")`;
        } else {
          returnValue = this.generateObject(value);
        }
      }
    }

    return returnValue;
  }

  public generateObject(doc: { [key: string]: any }): string {
    let objectData = `{`;
    for (const [key, value] of Object.entries(doc)) {
      const val = this.filterTypeValue(value);
      objectData += `"${key}": ${val},`;
    }
    objectData += "}";

    return objectData;
  }

  private generateArray(array: any[]): string {
    let returnArray = "[";
    for (let i = 0; i < array.length; i++) {
      if (i !== array.length - 1) {
        returnArray += `${this.filterTypeValue(array[i])}, `;
      } else returnArray += `${this.filterTypeValue(array[i])}`;
    }
    returnArray += "]";

    return returnArray;
  }
}
