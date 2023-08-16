import { FileConfig } from "../../../Export/interfaces/export.interface.js";
import { Generator } from "../Generator/Generator.js";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator.js";
import fs from "fs";
import { TypescriptInterface } from "./classes/index.js";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver.js";
import { InterfacesToCreate } from "./classes/InterfacesToCreate.js";

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
    const interfaceCode = this.createInterfaceCode();

    await fs.promises.writeFile(
      this.route,
      interfaceCode + "\n\n" + code,
      "utf8",
    );

    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    const data = resolver.resolve();
    const route = await this.generateFile(data);
    return route;
  }

  private createInterfaceCode(): string {
    return this.interfaces
      .interfaces()
      .map((i) => `${i.getInterfaceCode()}`)
      .join("\n\n");
  }
}
