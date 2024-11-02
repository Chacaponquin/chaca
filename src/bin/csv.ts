import { CommandModule } from "yargs";
import { run } from "./core/export";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";

type Props = CommonProps;

// eslint-disable-next-line @typescript-eslint/ban-types
export const csv: CommandModule<{}, Props> = {
  command: "csv",
  describe: description("csv"),
  builder: {
    ...common,
  },
  handler: async (argv) => {
    const { config, count, filename, output, zip } = argv;

    await run({
      count: count,
      filename: filename,
      format: { ext: "csv", zip: zip },
      output: output,
      route: config,
    });
  },
};
