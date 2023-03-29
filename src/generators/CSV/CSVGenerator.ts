import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "./../Generator.js";
import fs from "fs";
import { ChacaError } from "../../errors/ChacaError.js";

export class CSVGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "csv", config);
  }

  public async generateFile(): Promise<string> {
    let content = "";

    if (Array.isArray(this.data)) {
      content = this.generateArrayObjectsContent(this.data);
    } else {
      if (typeof this.data === "object" && this.data !== null) {
        content = this.generateArrayObjectsContent([this.data]);
      }
    }

    await fs.promises.writeFile(this.route, content, "utf-8");
    return this.route;
  }

  private generateArrayObjectsContent(objects: Array<any>): string {
    let content = "";

    const allProperties = this.getAllProperties(this.data);

    allProperties.forEach((p, i) => {
      if (i !== allProperties.length - 1) {
        content += `${p},`;
      } else {
        content += `${p}\n`;
      }
    });

    for (const obj of objects) {
      const values = [] as Array<string>;

      for (let i = 0; i < allProperties.length; i++) {
        const prop = allProperties[i];

        if (prop in obj) {
          values.push(this.filterValue(obj[prop]));
        } else {
          values.push("NULL");
        }
      }

      values.forEach((v, i) => {
        content += `${v}`;

        if (i !== values.length - 1) {
          content += ",";
        } else {
          content += "\n";
        }
      });
    }

    return content;
  }

  private filterValue(value: any): string {
    let retString = "";

    if (value == null) {
      retString = `NULL`;
    } else {
      retString = JSON.stringify(value);
    }

    return retString;
  }

  private getAllProperties(objects: Array<any>): Array<string> {
    const returnProperties = [] as Array<string>;

    for (const obj of objects) {
      if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((p) => {
          const exists = returnProperties.some((rp) => rp === p);

          if (!exists) {
            returnProperties.push(p);
          }
        });
      } else {
        throw new ChacaError(`${obj} is not an object`);
      }
    }

    return returnProperties;
  }
}
