import { Generator } from "../generator";
import { JavascriptGenerator } from "../javascript/JavascriptGenerator";
import fs from "fs";
import { TypescriptInterface } from "./core";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { InterfacesToCreate } from "./core/interfaces";

interface Props {
  filename: string;
  location: string;
  zip?: boolean;
}

export class TypescriptGenerator extends Generator {
  private interfaces = new InterfacesToCreate();
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "ts",
      filename: config.filename,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  async createFile(data: any): Promise<string> {
    const javascriptCodeGenerator = new JavascriptGenerator({
      filename: this.filename,
      location: this.location,
    });
    const variableName = this.utils.camelCase(this.filename);

    const javascriptCode = javascriptCodeGenerator.filterTypeValue(data);

    const dataInterface = TypescriptInterface.filterInterface(
      data,
      this.interfaces,
    );
    const codeInterface = dataInterface.getInterface();

    const code = `const ${variableName}: ${codeInterface} = ${javascriptCode}`;
    const finalCode = this.createFinalCode(code);

    await fs.promises.writeFile(this.route, finalCode, "utf8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string> {
    const data = resolver.resolve();
    const route = await this.createFile(data);
    return route;
  }

  private createFinalCode(code: string): string {
    const interfaceCode = this.createInterfaceCode();

    let finalCode: string;
    if (interfaceCode) {
      finalCode = interfaceCode + "\n\n" + code;
    } else {
      finalCode = code;
    }

    return finalCode;
  }

  private createInterfaceCode(): string {
    return this.interfaces
      .interfaces()
      .map((i) => `${i.getInterfaceCode()}`)
      .join("\n\n");
  }
}
