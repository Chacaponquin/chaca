import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator.js";
import fs from "fs";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";
import { Schemas } from "../../schemas/index.js";

interface ObjectInterface {
  name: string;
  fields: Array<{
    fieldName: string;

    types: Array<string>;
  }>;
}

export class TypescriptGenerator extends Generator {
  private interfaceCode: Array<ObjectInterface> = [];

  constructor(data: any, config: FileConfig) {
    super(data, "ts", config);
  }

  public async generateFile(): Promise<string> {
    let allCode = "";
    let javascriptCode = "";
    let code = "";

    const variableName = PrivateUtils.camelCaseText(this.config.fileName);

    if (Array.isArray(this.data)) {
      javascriptCode = new JavascriptGenerator(
        this.data,
        this.config,
      ).filterTypeValue(this.data);

      code = `const ${variableName} : ${this.generateArrayInterface(
        this.data,
      )} = ${javascriptCode};\n`;
    } else {
      javascriptCode = new JavascriptGenerator(
        this.data,
        this.config,
      ).filterTypeValue(this.data);

      code = `const ${variableName} = ${javascriptCode};\n`;
    }

    allCode += code;

    await fs.promises.writeFile(
      this.route,
      this.transformInterfacesToCode() + allCode,
      "utf8",
    );

    return this.route;
  }

  private transformInterfacesToCode(): string {
    let returnInterfaces = "";

    this.interfaceCode.forEach((i) => {
      returnInterfaces += `interface ${i.name}{`;

      i.fields.forEach((f) => {
        returnInterfaces += `${f.fieldName}: ${f.types.join(" | ")};`;
      });

      returnInterfaces += "}\n";
    });

    return returnInterfaces;
  }

  private generateArrayInterface(array: Array<any>): string {
    const arrayTypes = [] as Array<string>;

    for (const value of array) {
      const t = this.filterTypeValue(value);

      if (!arrayTypes.includes(t)) {
        arrayTypes.push(t);
      }
    }

    const interfaceName = `Array< ${arrayTypes.join(" | ")} > `;

    return interfaceName;
  }

  filterTypeValue(value: any): string {
    let t = "null";

    if (typeof value === "string") {
      t = "string";
    } else if (typeof value === "number") {
      t = "number";
    } else if (typeof value === "boolean") {
      t = "boolean";
    } else if (typeof value === "undefined") {
      t = "undefined";
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        t = this.generateArrayInterface(value);
      } else if (value instanceof Date) {
        t = "Date";
      } else if (value === null) {
        t = "null";
      } else {
        t = this.generateObjectInterface(value);
      }
    }

    return t;
  }

  private generateObjectInterface(doc: any): string {
    let interfaceName = `Object${Schemas.id.mongodbID().getValue()}`;

    // Buscar si el objeto ya fue creado
    let exists = false;
    Object.keys(doc).forEach((key) => {
      for (let i = 0; i < this.interfaceCode.length && !exists; i++) {
        const int = this.interfaceCode[i];

        for (let j = 0; j < int.fields.length; j++) {
          if (int.fields[j].fieldName === key) {
            exists = true;
            interfaceName = int.name;
          }
        }
      }
    });

    // Si existe solo se cambia en la interfaz creada
    if (exists) {
      this.interfaceCode.forEach((i) => {
        if (i.name === interfaceName) {
          Object.entries(doc).forEach(([key, value]) => {
            const foundKey = i.fields.find((subI) => subI.fieldName === key);

            if (foundKey) {
              const valueType = this.filterTypeValue(value);
              const existsType = foundKey.types.some((t) => t === valueType);

              if (!existsType) {
                foundKey.types.push(valueType);
              }
            }
          });
        }
      });

      // En caso de no existir se crea la interfaz
    } else {
      const newInterface: ObjectInterface = {
        name: interfaceName,
        fields: [],
      };

      Object.entries(doc).forEach(([key, value]) => {
        newInterface.fields.push({
          fieldName: key,
          types: [this.filterTypeValue(value)],
        });
      });

      this.interfaceCode.push(newInterface);
    }

    return interfaceName;
  }
}
