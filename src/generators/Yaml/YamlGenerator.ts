import { MultiGenerateResolver } from "../../core/helpers/MultiGenerate/classes/MultiGenerateResolver.js";
import { FileConfig } from "../../core/interfaces/export.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator.js";
import fs from "fs";

export class YamlGenerator extends Generator {
  private actualMargin = 0;

  constructor(config: FileConfig) {
    super("yaml", config);
  }

  public async generateFile(data: any): Promise<string> {
    let returnCode = ``;

    if (Array.isArray(data)) {
      returnCode += this.generateArray(data);
    } else {
      returnCode += this.generateObject(data, false);
    }

    await fs.promises.writeFile(this.route, returnCode, "utf-8");

    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const relationalData = resolver.resolve();
    return await this.generateFile(relationalData);
  }

  private generateObject(doc: Record<string, any>, onArray: boolean): string {
    let returnCode = `${onArray ? "" : "\n"}`;

    Object.entries(doc).forEach(([key, value], index) => {
      const fieldMargin =
        index === 0 && onArray ? this.actualMargin - 2 : this.actualMargin;
      if (index !== 0 || (index === 0 && !onArray)) {
        for (let i = 0; i < fieldMargin; i++) {
          returnCode += `\t`;
        }
      }

      returnCode += `${key}: ${this.generateValue(value, false)}`;

      if (index !== Object.entries(doc).length - 1) {
        returnCode += "\n";
      }
    });

    return returnCode;
  }

  private generateArray(array: Array<any>): string {
    let returnCode = ``;

    for (let i = 0; i < array.length; i++) {
      for (let i = 0; i < this.actualMargin; i++) {
        returnCode += `\t`;
      }

      returnCode += `- ${this.generateValue(array[i], true)}`;

      if (i !== array.length - 1) {
        returnCode += `\n`;
      }
    }

    return returnCode;
  }

  private generateValue(value: any, onArray: boolean): string {
    let returnValue = "null";

    if (typeof value === "string") {
      returnValue = `${JSON.stringify(value)}`;
    } else if (typeof value === "number") {
      if (value === Infinity) {
        returnValue = `.inf`;
      } else if (value === -Infinity) {
        returnValue = "-.inf";
      } else if (Number.isNaN(value)) {
        returnValue = ".NAN";
      } else {
        returnValue = `${value}`;
      }
    } else if (typeof value === "boolean") {
      returnValue = `${value}`;
    } else if (typeof value === "undefined") {
      returnValue = "null";
    } else if (typeof value === "bigint") {
      returnValue = `${value.toString()}`;
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function to a yaml file.`);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a yaml file.`);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        this.actualMargin++;
        returnValue = "\n" + this.generateArray(value);
        this.actualMargin--;
      } else if (value === null) {
        returnValue = "null";
      } else if (value instanceof Date) {
        returnValue = `"${JSON.stringify(value)}"`;
      } else {
        this.actualMargin++;

        const objectCreated = this.generateObject(value, onArray);
        returnValue = objectCreated;

        this.actualMargin--;
      }
    }

    return returnValue;
  }
}
