import { FileConfig } from "../../utils/interfaces/export.interface.js";
import { Generator } from "../Generator.js";
import { JavascriptGenerator } from "../Javascript/JavascriptGenerator.js";
import fs from "fs";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";
import { ObjectInterface, TypescriptInterface } from "./classes/index.js";

export class TypescriptGenerator extends Generator {
  constructor(data: any, config: FileConfig) {
    super(data, "ts", config);
  }

  public async generateFile(): Promise<string> {
    const variableName = PrivateUtils.camelCaseText(this.config.fileName);

    const javascriptCode = new JavascriptGenerator(
      this.data,
      this.config,
    ).filterTypeValue(this.data);

    const codeInterface = TypescriptInterface.filterInterface(
      this.data,
    ).getInterface();

    const code = `const ${variableName}: ${codeInterface} = ${javascriptCode}`;
    const interfaceCode = this.createInterfaceCode();

    ObjectInterface.cleanObjectsToCreate();

    await fs.promises.writeFile(this.route, interfaceCode + code, "utf8");

    return this.route;
  }

  private createInterfaceCode(): string {
    return ObjectInterface.getObjectsToCreate()
      .map((i) => `${i.getInterfaceCode()}`)
      .join("\n");
  }
}
