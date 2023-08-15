import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver.js";
import { FileConfig } from "../../interfaces/export.interface.js";
import { ChacaError } from "../../../../errors/ChacaError.js";
import { Generator } from "../Generator/Generator.js";
import fs from "fs";

export class PythonGenerator extends Generator {
  private importLibraries = [] as Array<string>;

  constructor(config: FileConfig) {
    super({ extension: "py", config });
  }

  public async generateFile(data: any): Promise<string> {
    let pythonCode = "";
    const variableName = this.utils.camelCase(this.config.fileName);

    pythonCode += `${variableName} = ${this.filterValueByType(data)}`;

    if (this.importLibraries.length) {
      const importStrings = [] as Array<string>;

      for (const i of this.importLibraries) {
        importStrings.push(`import ${i}`);
      }

      const importCode = importStrings.join("\n");

      pythonCode = importCode + "\n\n" + pythonCode;
    }

    await fs.promises.writeFile(this.route, pythonCode, "utf-8");
    return this.route;
  }

  private insertImportLibrary(lib: string): void {
    if (!this.importLibraries.includes(lib)) {
      this.importLibraries.push(lib);
    }
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    await this.generateFile(resolver.resolve());
    return this.route;
  }

  private filterValueByType(value: any): string {
    let returnValueCode = "None";

    if (typeof value === "string") {
      returnValueCode = `${JSON.stringify(value)}`;
    } else if (typeof value === "number") {
      if (value === Infinity) {
        returnValueCode = `float('inf')`;
      } else if (Number.isNaN(value)) {
        returnValueCode = `float('nan')`;
      } else if (value === -Infinity) {
        returnValueCode = `float('-inf')`;
      } else {
        returnValueCode = `${value}`;
      }
    } else if (typeof value === "boolean") {
      if (value) {
        returnValueCode = "True";
      } else {
        returnValueCode = "False";
      }
    } else if (typeof value === "undefined") {
      returnValueCode = "None";
    } else if (typeof value === "object") {
      if (value === null) {
        returnValueCode = "None";
      } else if (Array.isArray(value)) {
        const valuesString = value.map((v) => this.filterValueByType(v));
        returnValueCode = `[${valuesString.join(", ")}]`;
      } else if (value instanceof Date) {
        this.insertImportLibrary("datetime");
        returnValueCode = this.createDateCode(value);
      } else if (value instanceof RegExp) {
        this.insertImportLibrary("re");
        returnValueCode = `re.compile(r'${value.source}')`;
      } else {
        returnValueCode = this.createObjectCode(value);
      }
    } else if (typeof value === "function") {
      throw new ChacaError(`You can not export a function in a python file.`);
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol in a python file.`);
    } else if (typeof value === "bigint") {
      returnValueCode = value.toString();
    }

    return returnValueCode;
  }

  private createDateCode(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const codigoPython = `datetime.datetime(${year}, ${month}, ${day})`;
    return codigoPython;
  }

  private createObjectCode(object: any): string {
    const keysString = [] as Array<string>;
    for (const [key, value] of Object.entries(object)) {
      keysString.push(`'${key}': ${this.filterValueByType(value)}`);
    }

    return `{${keysString.join(", ")}}`;
  }
}
