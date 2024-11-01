import { CommandModule } from "yargs";
import { filename } from "./core/filename";
import { config } from "./core/config-file";
import { output } from "./core/output";
import { count } from "./core/count";
import { run } from "./core/export";
import { separated } from "./core/separated";

interface Props {
  count: number;
  filename: string;
  output: string;
  config: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const json: CommandModule<{}, Props> = {
  command: "json",
  describe: "Adds two number",
  builder: {
    config: config,
    filename: filename,
    output: output,
    count: count,
    separated: separated,
  },
  handler: async (argv) => {
    const { config, count, filename, output } = argv;

    await run({
      count: count,
      filename: filename,
      format: { ext: "json" },
      output: output,
      route: config,
    });
  },
};
