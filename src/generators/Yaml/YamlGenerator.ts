import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import fs from "fs";

export class YamlGenerator extends Generator {
  private actualMargin = 0;

  constructor(data: any, config: FileConfig) {
    super(data, "yaml", config);
  }

  public async generateFile(): Promise<string> {
    let returnCode = ``;

    if (Array.isArray(this.data)) {
      returnCode += this.generateArray(this.data);
    } else {
      returnCode += this.generateObject(this.data);
    }

    await fs.promises.writeFile(this.route, returnCode, "utf-8");

    return this.route;
  }

  private generateObject(doc: { [key: string]: any }): string {
    let returnObject = ``;

    for (const [key, value] of Object.entries(doc)) {
      returnObject += `${key}: ${this.generateValue(value)}`;
    }

    return returnObject;
  }

  private generateArray(array: Array<any>): string {
    let returnCode = ``;

    for (let i = 0; i < array.length; i++) {
      returnCode += `${this.actualMargin}- ${this.generateValue(array[i])}\n`;
    }

    return returnCode;
  }

  private generateValue(value: any): string {
    let returnValue = "null";

    if (typeof value === "string") returnValue = `"${value}"`;
    else if (typeof value === "number" || typeof value === "boolean") {
      returnValue = `${value}`;
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        returnValue = this.generateArray(value);
      } else {
        if (value === null) {
          returnValue = "null";
        } else if (value instanceof Date) {
          returnValue = `new Date("${value.toISOString()}")`;
        } else {
          returnValue = this.generateObject(value);
        }
      }
    }

    return returnValue;
  }
}
