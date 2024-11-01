import fs from "fs";
import path from "path";
import { Schema } from "../../core/schema";
import { ExportFormat } from "../../core/export/interfaces/export";
import { Dataset } from "../../core/dataset";

interface Props {
  filename: string;
  output: string;
  count: number;
  route: string;
  format: ExportFormat;
}

export async function run({ route, count, filename, output, format }: Props) {
  if (!fs.existsSync(route)) {
    throw Error(`The config file '${route}' not exist's`);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(path.resolve(process.cwd(), route));

    if (config instanceof Schema) {
      await config.export(count, {
        filename: filename,
        format: format,
        location: output,
      });
    } else if (config instanceof Dataset) {
      await config.export({
        filename: filename,
        format: format,
        location: output,
      });
    } else {
      throw new Error(`You must export a schema or a dataset`);
    }
  }
}
