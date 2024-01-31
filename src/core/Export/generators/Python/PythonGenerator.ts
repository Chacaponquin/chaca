import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { ChacaError } from "../../../../errors";
import { Generator } from "../Generator/Generator";
import fs from "fs";

interface Props {
  fileName: string;
  location: string;
  zip?: boolean;
}

export class PythonGenerator extends Generator {
  private importLibraries = [] as Array<string>;
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "py",
      fileName: config.fileName,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  public async generateFile(data: any): Promise<string> {
    const pythonCode = this.createDataCode(this.fileName, data);
    const finalCode = this.buildFinalCode(pythonCode);

    await fs.promises.writeFile(this.route, finalCode, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const allDeclarations = [] as Array<string>;
    resolver.getResolvers().forEach((r) => {
      const pythonCode = this.createDataCode(r.getSchemaName(), r.resolve());
      allDeclarations.push(pythonCode);
    });

    const code = allDeclarations.join("\n\n");

    const finalCode = this.buildFinalCode(code);
    await fs.promises.writeFile(this.route, finalCode, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  private buildFinalCode(pythonCode: string): string {
    let code = pythonCode;
    const importCode = this.createImportCode();

    if (importCode) {
      code = importCode + "\n\n" + pythonCode;
    }

    return code;
  }

  private createImportCode(): string {
    if (this.importLibraries.length) {
      const importStrings = this.importLibraries.map((i) => `import ${i}`);
      const importCode = importStrings.join("\n");

      return importCode;
    } else {
      return "";
    }
  }

  private createDataCode(name: string, data: any): string {
    const variableName = this.utils.camelCase(name);
    const pythonCode = `${variableName} = ${this.filterValueByType(data)}`;

    return pythonCode;
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

  private insertImportLibrary(lib: string): void {
    if (!this.importLibraries.includes(lib)) {
      this.importLibraries.push(lib);
    }
  }
}
