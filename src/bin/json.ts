import { CommandModule } from "yargs";
import { run } from "./core/export";
import { separate } from "./core/separated";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";

interface Props extends CommonProps {
  separate: boolean;
  indent: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const json: CommandModule<{}, Props> = {
  command: "json",
  describe: description("json"),
  builder: {
    ...common,
    ...separate,
    ...indent,
  },
  handler: async (argv) => {
    const { config, count, filename, output, separate, zip, indent } = argv;

    await run({
      count: count,
      filename: filename,
      format: { ext: "json", zip: zip, indent: indent, separate: separate },
      output: output,
      route: config,
    });
  },
};
