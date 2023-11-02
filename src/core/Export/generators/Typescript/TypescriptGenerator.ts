import { FileConfig } from "../../interfaces/export";
import { Generator } from "../Generator/Generator";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator";
import fs from "fs";
import { TypescriptInterface } from "./classes";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";
import { InterfacesToCreate } from "./classes/InterfacesToCreate";

export class TypescriptGenerator extends Generator {
  private interfaces = new InterfacesToCreate();

  constructor(config: FileConfig) {
    super({ extension: "ts", config });
  }

  public async generateFile(data: any): Promise<string> {
    const javascriptCodeGenerator = new JavascriptGenerator(this.config);
    const variableName = this.utils.camelCase(this.config.fileName);

    const javascriptCode = javascriptCodeGenerator.filterTypeValue(data);

    const dataInterface = TypescriptInterface.filterInterface(
      data,
      this.interfaces,
    );

    const codeInterface = dataInterface.getInterface();

    const code = `const ${variableName}: ${codeInterface} = ${javascriptCode}`;
    const finalCode = this.createFinalCode(code);

    await fs.promises.writeFile(this.route, finalCode, "utf8");

    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
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
