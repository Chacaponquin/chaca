import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator.js";
import fs from "fs";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";

type DataObject = { [key: string]: any };
export class TypescriptGenerator extends Generator {
  private interfacesCode = "";
  private interfacesCreated: string[] = [];

  constructor(data: any, config: FileConfig) {
    super(data, "ts", config);
  }

  public async generateFile(): Promise<string> {
    let allCode = "";
    let javascriptCode = "";
    let code = "";

    const nameCapitalizaed = PrivateUtils.camelCaseText(this.config.fileName);

    if (Array.isArray(this.data)) {
      javascriptCode = new JavascriptGenerator(
        this.data,
        this.config,
      ).generateSchemaArray(this.data);
      code = `const ${nameCapitalizaed} :  ${this.generateSchemaInterface()}[] = ${javascriptCode};\n`;
    } else {
      javascriptCode = javascriptCode = new JavascriptGenerator(
        this.data,
        this.config,
      ).generateObject(this.data);
      code = `const ${nameCapitalizaed} :  ${this.generateObjectInterface(
        PrivateUtils.capitalizeCamelCase(this.config.fileName),
        this.data,
      )} = ${javascriptCode};\n`;
    }

    allCode += code;

    await fs.promises.writeFile(
      this.route,
      this.interfacesCode + allCode,
      "utf8",
    );

    return this.route;
  }

  private generateSchemaInterface(): string {
    const interfaceName = `I${PrivateUtils.capitalizeCamelCase(
      this.config.fileName,
    )}`;
    let interfaceCode = `interface ${interfaceName}{\n`;

    for (const key of Object.keys(this.data[0])) {
      const allValues = this.data.map((el: any) => el[key]);

      const retInt: string[] = [];
      for (const val of allValues) {
        if (Array.isArray(val)) retInt.push(this.generateArrayInterface(val));
        else retInt.push(this.generateInterfaceByValue(val));
      }

      const uniqueInt = new Set(retInt);
      const uniqueValues: string[] = [];
      uniqueInt.forEach((el) => uniqueValues.push(el));

      let keyInterface: string;
      if (uniqueValues.length <= 1) keyInterface = `${uniqueValues[0]}`;
      else {
        const str = "(" + uniqueValues.join(" | ") + ")";
        keyInterface = str;
      }

      interfaceCode += `${key}: ${keyInterface};`;
    }

    interfaceCode += "}\n";
    this.interfacesCode += interfaceCode;

    return interfaceName;
  }

  private generateObjectInterface(
    interfaceName: string,
    doc: DataObject,
  ): string {
    const foundInterface = this.interfacesCreated.find(
      (el) => el === interfaceName,
    );

    if (!foundInterface) {
      let interfaceCode = `interface ${interfaceName}{\n\t`;
      const similiarObjects = this.searchSimilarObjects(doc);

      if (similiarObjects.length > 0) {
        for (const key of Object.keys(doc)) {
          const allKeysValues = similiarObjects.map((el) => {
            return el[key];
          });

          const allTypes = allKeysValues.map((el) =>
            this.generateInterfaceByValue(el),
          );
          const uniqueTypes = new Set(allTypes);

          let type: string;
          if (uniqueTypes.size <= 1) {
            type = `${allTypes[0]}`;
          } else {
            const unique: string[] = [];
            uniqueTypes.forEach((el) => unique.push(el));
            const str = "(" + unique.join(" | ") + ")";
            type = `${str}`;
          }

          interfaceCode += `${key}: ${type};`;
        }
      } else {
        for (const [key, value] of Object.entries(doc)) {
          interfaceCode += `${key}: ${this.generateInterfaceByValue(value)};`;
        }
      }

      interfaceCode += "}\n";
      this.interfacesCode += interfaceCode;
      this.interfacesCreated.push(interfaceName);
    }

    return interfaceName;
  }

  private searchSimilarObjects(object: DataObject): Array<DataObject> {
    const retArray = [] as DataObject[];

    const objectCompare = (val: any) => {
      if (Array.isArray(val)) {
        for (const v of val) {
          if (PrivateUtils.isSimilarObjects(object, v)) {
            retArray.push(v as DataObject);
          }

          if (v instanceof Object) {
            for (const valAnid of Object.values(val)) {
              objectCompare(valAnid);
            }
          }
        }
      } else {
        if (PrivateUtils.isSimilarObjects(object, val)) {
          retArray.push(val as DataObject);
        }

        if (val instanceof Object) {
          for (const valAnid of Object.values(val)) {
            objectCompare(valAnid);
          }
        }
      }
    };

    if (Array.isArray(this.data)) {
      for (const doc of this.data) {
        for (const val of Object.values(doc)) {
          objectCompare(val);
        }
      }
    }

    return retArray;
  }

  private generateInterfaceByValue(value: any): string {
    let returnValue = "undefined";

    if (typeof value == "string") returnValue = "string";
    else if (typeof value === "number") returnValue = "number";
    else if (typeof value === "boolean") returnValue = "boolean";
    else if (value === null) returnValue = "null";
    else if (typeof value == "object") {
      if (Array.isArray(value)) {
        returnValue = this.generateArrayInterface(value);
      } else if (value instanceof Date) returnValue = "Date";
      else {
        let name = `Object`;
        const keys = Object.keys(value);
        for (const key of keys) name += key;
        returnValue = this.generateObjectInterface(name, value);
      }
    }

    return returnValue;
  }

  private generateArrayInterface(array: Array<any>): string {
    let interfaceCode = ``;

    const allTypes = array.map((el) => this.generateInterfaceByValue(el));
    const uniqueTypes = new Set(allTypes);

    if (uniqueTypes.size <= 1) {
      interfaceCode += `${allTypes[0]}`;
    } else {
      const unique: string[] = [];
      uniqueTypes.forEach((el) => unique.push(el));

      const str = "(" + unique.join(" | ") + ")";

      interfaceCode += `${str}`;
    }

    interfaceCode += `[]`;

    return interfaceCode;
  }
}
