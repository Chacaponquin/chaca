import { MultiGenerateResolver } from "../../core/classes/MultiGenerate/MultiGenerateResolver.js";
import { FileConfig } from "../../core/interfaces/export.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator/Generator.js";
import fs from "fs";

export class PythonGenerator extends Generator {
  private importLibraries = [] as Array<string>;

  constructor(config: FileConfig) {
    super("py", config);
  }

  public async generateFile(data: any): Promise<string> {
    let pythonCode = "";

    pythonCode += `${this.fileName} = ${this.filterValueByType(data)}`;

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
      returnValueCode = `"${value}"`;
    } else if (typeof value === "number") {
      returnValueCode = `${value}`;
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
        const valuesString = [] as Array<string>;

        for (const v of value) {
          valuesString.push(this.filterValueByType(v));
        }

        returnValueCode = `[${valuesString.join(", ")}]`;
      } else if (value instanceof Date) {
        this.insertImportLibrary("datetime");
        returnValueCode = this.createDateCode(value);
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
