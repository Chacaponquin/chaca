import fs from "fs";
import path from "path";
import {
  CliExportable,
  ExportFormat,
} from "../../core/export/interfaces/export";

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
    // The config module is resolved from a user-supplied path at runtime, so it
    // cannot be a static import.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config: Partial<CliExportable> = require(
      path.resolve(process.cwd(), route),
    );

    // A `Schema` and a `Dataset` both implement `exportFromCli`, so the CLI does
    // not need to know which one it received. This also avoids `instanceof`,
    // which is unreliable here because the config file resolves the library
    // through its own `require` (a different module instance than this bundle).
    if (typeof config?.exportFromCli !== "function") {
      throw new Error(`You must export a schema or a dataset`);
    }

    await config.exportFromCli(count, {
      filename: filename,
      format: format,
      location: output,
      verbose: true,
    });
  }
}
