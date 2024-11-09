import { CommandModule } from "yargs";
import { run } from "./core/export";
import { separate } from "./core/separated";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";
import { skipInvalid } from "./core/skip-invalid";

interface Props extends CommonProps {
  separate: boolean;
  indent: number;
  skipInvalid: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const js: CommandModule<{}, Props> = {
  command: "js",
  describe: description("javascript"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
  },
  handler: async (argv) => {
    const {
      config,
      count,
      filename,
      output,
      separate,
      zip,
      indent,
      skipInvalid,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "javascript",
        zip: zip,
        indent: indent,
        separate: separate,
        skipInvalid: skipInvalid,
      },
      output: output,
      route: config,
    });
  },
};
