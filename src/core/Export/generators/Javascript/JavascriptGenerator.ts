import { Generator } from "../generator/Generator";
import fs from "fs";
import { ChacaError } from "../../../../errors";
import { DatasetResolver } from "../../../dataset-resolver/resolver";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
}

export class JavascriptGenerator extends Generator {
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "js",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  public async generateRelationalDataFile(
    resolver: DatasetResolver,
  ): Promise<string> {
    const data = resolver.resolve();
    return await this.generateFile(data);
  }

  public async generateFile(data: any): Promise<string> {
    const variableName = this.utils.camelCase(this.filename);
    const returnData = `const ${variableName} = ${this.filterTypeValue(data)}`;

    await fs.promises.writeFile(this.route, returnData, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  public generateSchemaArray(
    schemaObjects: Array<Record<string, any>>,
  ): string {
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
      returnValue = `${JSON.stringify(value)}`;
    } else if (typeof value === "number") {
      if (Number.isNaN(value)) {
        returnValue = `NaN`;
      } else {
        returnValue = `${value}`;
      }
    } else if (typeof value === "boolean") {
      returnValue = `${value}`;
    } else if (typeof value === "undefined") {
      returnValue = "undefined";
    } else if (typeof value === "bigint") {
      returnValue = `${value.toString()}n`;
    } else if (typeof value === "function") {
      throw new ChacaError(
        `You can not export a function to a javascript file.`,
      );
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a javascript file.`);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        returnValue = this.createArrayCode(value);
      } else if (value === null) {
        returnValue = "null";
      } else if (value instanceof Date) {
        returnValue = `new Date(${JSON.stringify(value)})`;
      } else if (value instanceof RegExp) {
        returnValue = `/${value.source}/${value.flags}`;
      } else {
        returnValue = this.createObjectCode(value);
      }
    }

    return returnValue;
  }

  public createObjectCode(doc: Record<string, any>): string {
    let objectData = `{`;
    for (const [key, value] of Object.entries(doc)) {
      const val = this.filterTypeValue(value);
      objectData += `"${key}": ${val},`;
    }
    objectData += "}";

    return objectData;
  }

  private createArrayCode(array: any[]): string {
    let returnArray = "[";
    for (let i = 0; i < array.length; i++) {
      if (i !== array.length - 1) {
        returnArray += `${this.filterTypeValue(array[i])}, `;
      } else {
        returnArray += `${this.filterTypeValue(array[i])}`;
      }
    }
    returnArray += "]";

    return returnArray;
  }
}
