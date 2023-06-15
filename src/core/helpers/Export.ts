import { ChacaError } from "../../errors/ChacaError.js";
import {
  CSVGenerator,
  JavaGenerator,
  JavascriptGenerator,
  JsonGenerator,
  TypescriptGenerator,
  Generator,
  YamlGenerator,
  SQLGenerator,
} from "../../generators/index.js";
import { FileConfig } from "../interfaces/export.interface.js";

/**
 * Export the data to a selected code format
 * @param data Data you want to export
 * @param config Configuration of the file you want to export (name, location, format, etc.)
 * @param config.location location of the file
 * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'`)
 *
 *  - `'java'`
 * Export a zip file with the classes files and the main java file with the initialization of data
 *
 * - `'csv'`
 * Export a csv file with the data created
 *
 * - `'typescript'`
 * Export a ts file with the data created
 *
 * - `'javascript'`
 * Export a js file with the data created
 *
 * - `'json'`
 * Export a json file with the data created
 *
 * @example
 * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
 * const config = {fileName: 'Users', format: 'json', location: '../../data'}
 * await schema.export(data, config)
 *
 * @returns
 * Promise<string>
 */
export async function Export(data: any, config: FileConfig): Promise<string> {
  if (config && typeof config.format === "string") {
    let gen: Generator;
    switch (config.format) {
      case "json":
        gen = new JsonGenerator(config);
        break;
      case "javascript":
        gen = new JavascriptGenerator(config);
        break;
      case "csv":
        gen = new CSVGenerator(config);
        break;
      case "java":
        gen = new JavaGenerator(config);
        break;
      case "typescript":
        gen = new TypescriptGenerator(config);
        break;
      case "yaml":
        gen = new YamlGenerator(config);
        break;
      case "postgresql":
        gen = new SQLGenerator(config);
        break;
      default:
        throw new ChacaError(`Format '${String(config.format)}' invalid`);
    }

    return await gen.generateFile(data);
  } else throw new ChacaError(`Format '${String(config.format)}' invalid`);
}
