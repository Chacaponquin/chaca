import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ChacaError } from "../../../../errors";
import { Generator } from "../generator/Generator";
import fs from "fs";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
}

interface GenObjectProps {
  doc: Record<string, any>;
  onArray: boolean;
}

interface GenValueProps {
  value: any;
  onArray: boolean;
}

export class YamlGenerator extends Generator {
  private actualMargin = 0;
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "yaml",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  public async generateFile(data: any): Promise<string> {
    let returnCode = "";

    if (Array.isArray(data)) {
      returnCode += this.generateArray(data);
    } else {
      returnCode += this.object({ doc: data, onArray: false });
    }

    await fs.promises.writeFile(this.route, returnCode, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  public async generateRelationalDataFile(
    resolver: DatasetResolver,
  ): Promise<string> {
    const relationalData = resolver.resolve();
    return await this.generateFile(relationalData);
  }

  private object({ doc, onArray }: GenObjectProps): string {
    let returnCode = `${onArray ? "" : "\n"}`;

    Object.entries(doc).forEach(([key, value], index) => {
      const fieldMargin =
        index === 0 && onArray ? this.actualMargin - 2 : this.actualMargin;
      if (index !== 0 || (index === 0 && !onArray)) {
        for (let i = 0; i < fieldMargin; i++) {
          returnCode += `\t`;
        }
      }

      returnCode += `${key}: ${this.generateValue({
        value: value,
        onArray: false,
      })}`;

      if (index !== Object.entries(this.createKeyName(key)).length - 1) {
        returnCode += "\n";
      }
    });

    return returnCode;
  }

  private createKeyName(key: string): string {
    return key.trim().replace(" ", "_");
  }

  private generateArray(array: Array<any>): string {
    let returnCode = ``;

    for (let i = 0; i < array.length; i++) {
      for (let i = 0; i < this.actualMargin; i++) {
        returnCode += `\t`;
      }

      returnCode += `- ${this.generateValue({
        value: array[i],
        onArray: true,
      })}`;

      if (i !== array.length - 1) {
        returnCode += `\n`;
      }
    }

    return returnCode;
  }

  private generateValue({ onArray, value }: GenValueProps): string {
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
      } else if (value instanceof RegExp) {
        returnValue = `'${value.source}'`;
      } else {
        this.actualMargin++;

        const objectCreated = this.object({
          doc: value,
          onArray: onArray,
        });
        returnValue = objectCreated;

        this.actualMargin--;
      }
    }

    return returnValue;
  }
}
