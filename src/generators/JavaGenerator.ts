import { FileConfig } from "../utils/interfaces/export.interface";
import { Generator } from "./Generator";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { CHDataError } from "../errors/CHDataError";
import { PrivateUtils } from "../utils/helpers/PrivateUtils";

export class JavaGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "java", config);
  }

  public async generateFile(): Promise<string> {
    await this.generateClass({
      name: PrivateUtils.capitalizeTextUpper(this.config.fileName),
      docExample: Array.isArray(this.data) ? this.data[0] : this.data,
    });

    const zp = new AdmZip();
    const zipName = `${this.config.fileName}.zip`;
    const zipPath = path.join(this.baseLocation, zipName);

    await this.generateMainFile(
      PrivateUtils.capitalizeTextUpper(this.config.fileName),
      this.data,
    );

    try {
      zp.addLocalFile(this.generateRoute(this.config.fileName));
      zp.addLocalFile(this.generateRoute("Main"));
      zp.writeZip(zipPath);
    } catch (error) {
      throw new CHDataError("Error export zip File");
    }

    return zipPath;
  }

  private async generateMainFile(
    className: string,
    docs: Object[],
  ): Promise<void> {
    let classString = "";
    classString += `public class Main {\n`;
    classString += `\tpublic static void main(String[] args){\n\t`;

    const arrayName: string = `${PrivateUtils.capitalizeText(className)}`;
    classString += `ArrayList< ${className} > ${arrayName} =  new ArrayList< ${className} >();\n\t`;

    for (let i = 0; i < docs.length; i++) {
      const variableName: string = `${PrivateUtils.capitalizeText(
        className,
      )}${i}`;

      classString += `${className} ${variableName} = new ${className}(${await this.createParameters(
        docs[i],
      )});\n\n\t`;

      classString += `${arrayName}.add(${variableName});\n\n\t`;
    }

    classString += "}\n";
    classString += "}";

    await fs.promises.writeFile(
      this.generateRoute("Main"),
      classString,
      "utf-8",
    );
  }

  private generateClassName(docEx: Object): string {
    let name = `Object`;
    const keys = Object.keys(docEx);
    for (const key of keys) name += key;
    return name;
  }

  private async generateClass({
    name,
    docExample,
  }: {
    name: string;
    docExample: Object;
  }): Promise<string> {
    let classCode = "public class ";
    classCode += name + "{\n";

    for (const [key, value] of Object.entries(docExample)) {
      classCode += `\tpublic ${await this.filterParentType(value)} ${key};\n`;
    }
    classCode += await this.generateConstructor(name, docExample);
    classCode += "}";

    await fs.promises.writeFile(this.generateRoute(name), classCode, "utf-8");

    return name;
  }

  private createParameters = async (values: {
    [path: string]: any;
  }): Promise<string> => {
    let returnVal = "";
    const keys: string[] = Object.keys(values);

    for (let i = 0; i < keys.length; i++) {
      returnVal +=
        `${await this.filterTypeValue(values[keys[i]])}` +
        (i === keys.length - 1 ? "" : ", ");
    }

    return returnVal;
  };

  private async filterTypeValue(value: any): Promise<string> {
    let returnString: string = "null";

    if (typeof value === "number") returnString = `${value}`;
    else if (typeof value === "string") returnString = `"${value}"`;
    else if (typeof value === "boolean") returnString = `"${value}"`;
    else if (typeof value === "object") {
      if (Array.isArray(value)) {
        const type = await this.filterParentType(value[0]);

        let params = "";
        for (let i = 0; i < value.length; i++) {
          if (i !== value.length - 1) {
            params += `${await this.filterTypeValue(value[i])}, `;
          } else {
            params += `${await this.filterTypeValue(value[i])}`;
          }
        }

        returnString = `new ArrayList< ${type} >().toArray(new ${type}[]{${params}})`;
      } else if (value === null) returnString = "null";
      else if (value instanceof Date) returnString = `"${value.toString()}"`;
      else {
        const className = await this.generateClass({
          docExample: value,
          name: this.generateClassName(value),
        });

        returnString = `new ${className}(${await this.createParameters(
          value,
        )})`;
      }
    }

    return returnString;
  }

  private async filterParentType(value: any): Promise<string> {
    let returnValue = "Object";

    if (typeof value === "number") {
      if (Number.isInteger(value)) returnValue = "Integer";
      else returnValue = "Float";
    } else if (typeof value === "string") returnValue = "String";
    else if (typeof value === "boolean") returnValue = `boolean`;
    else if (typeof value === "object") {
      if (Array.isArray(value))
        returnValue = `ArrayList< ${await this.filterParentType(value[0])} >`;
      else if (value === null) returnValue = "Object";
      else if (value instanceof Date) returnValue = "String";
      else returnValue += `${this.generateClassName(value)}`;
    }

    return returnValue;
  }

  private async generateConstructor(
    className: string,
    doc: Object,
  ): Promise<string> {
    const initializeVar = (): string => {
      let returnVal = "";

      const keys: string[] = Object.keys(doc);
      for (let i = 0; i < keys.length; i++) {
        returnVal += `\tthis.${keys[i]} = ${keys[i]};\n`;
      }

      return returnVal;
    };

    const generateConstructorParameters = async (values: {
      [path: string]: any;
    }): Promise<string> => {
      let returnString = "";
      const keys: string[] = Object.keys(values);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = values[key];

        returnString +=
          `${await this.filterParentType(val)} ${key}` +
          (i === keys.length - 1 ? "" : ", ");
      }

      return returnString;
    };

    let returnString = "";
    returnString += `\tpublic ${className}(${await generateConstructorParameters(
      doc,
    )}){\n\t`;
    returnString += `${initializeVar()}`;
    returnString += "\t}\n";

    return returnString;
  }
}
