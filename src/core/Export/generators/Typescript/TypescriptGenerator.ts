import { Generator } from "../Generator/Generator";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator";
import fs from "fs";
import { TypescriptInterface } from "./classes";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { InterfacesToCreate } from "./classes/InterfacesToCreate";

interface Props {
  fileName: string;
  location: string;
  zip?: boolean;
}

export class TypescriptGenerator extends Generator {
  private interfaces = new InterfacesToCreate();
  private zip: boolean;

  constructor(config: Props) {
    super({
      extension: "ts",
      fileName: config.fileName,
      location: config.location,
    });

    this.zip = Boolean(config.zip);
  }

  public async generateFile(data: any): Promise<string> {
    const javascriptCodeGenerator = new JavascriptGenerator({
      fileName: this.fileName,
      location: this.location,
    });
    const variableName = this.utils.camelCase(this.fileName);

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

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver,
  ): Promise<string> {
    const data = resolver.resolve();
    const route = await this.generateFile(data);
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
