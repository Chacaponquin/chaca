import { CHDataError } from "../../errors/CHDataError";
import {
  CSVGenerator,
  Generator,
  JavascriptGenerator,
  JsonGenerator,
  JavaGenerator,
  TypescriptGenerator,
} from "../../generators";

import { FileConfig } from "../interfaces/export.interface";
import { SchemaToResolve } from "../interfaces/schema.interface";

export abstract class ChacaSchema {
  /**
   *
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'Users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<void>
   */
  public async export(data: any, config: FileConfig): Promise<string> {
    if (config && typeof config.format === "string") {
      let gen: Generator;
      switch (config.format) {
        case "json":
          gen = new JsonGenerator(data, config);
          break;
        case "javascript":
          gen = new JavascriptGenerator(data, config);
          break;
        case "csv":
          gen = new CSVGenerator(data, config);
          break;
        case "java":
          gen = new JavaGenerator(data, config);
          break;
        case "typescript":
          gen = new TypescriptGenerator(data, config);
          break;
        default:
          throw new CHDataError(`Format ${config.format} invalid`);
      }

      return await gen.generateFile();
    } else throw new CHDataError(`Format ${config.format} invalid`);
  }

  public async generateAndExport(
    cant: number,
    configFile: FileConfig,
  ): Promise<void> {
    const data = this.generate(cant);
    await this.export(data, configFile);
  }

  protected resolveSchema(field: any, schema: SchemaToResolve): unknown {
    let retValue: unknown = null;
    const gen = schema.type.resolve(field);

    let stop = false;
    while (!stop) {
      let result = gen.next();
      retValue = result.value;
      if (result.done) {
        stop = true;
      }
    }

    return retValue;
  }

  public abstract generate(cantDocuments: number): any[];
}
