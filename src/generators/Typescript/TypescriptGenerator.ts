import { FileConfig } from "../../core/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator.js";
import fs from "fs";
import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
import { ObjectInterface, TypescriptInterface } from "./classes/index.js";
import { MultiGenerateResolver } from "../../core/helpers/MultiGenerate/classes/MultiGenerateResolver.js";

export class TypescriptGenerator extends Generator {
  constructor(config: FileConfig) {
    super("ts", config);
  }

  public async generateFile(data: any): Promise<string> {
    const variableName = PrivateUtils.camelCaseText(this.config.fileName);

    const javascriptCode = new JavascriptGenerator(this.config).filterTypeValue(
      data,
    );

    const codeInterface =
      TypescriptInterface.filterInterface(data).getInterface();

    const code = `const ${variableName}: ${codeInterface} = ${javascriptCode}`;
    const interfaceCode = this.createInterfaceCode();

    ObjectInterface.cleanObjectsToCreate();

    await fs.promises.writeFile(this.route, interfaceCode + code, "utf8");

    return this.route;
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    const data = resolver.resolve();
    return await this.generateFile(data);
  }

  private createInterfaceCode(): string {
    return ObjectInterface.getObjectsToCreate()
      .map((i) => `${i.getInterfaceCode()}`)
      .join("\n\n");
  }
}
