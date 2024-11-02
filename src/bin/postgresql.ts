import { CommandModule } from "yargs";
import { run } from "./core/export";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";
import { declarationOnly } from "./core/declaration-only";
import { skipInvalid } from "./core/skip-invalid";

interface Props extends CommonProps {
  indent: number;
  declarationOnly: boolean;
  skipInvalid: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const postgresql: CommandModule<{}, Props> = {
  command: "postgresql",
  describe: description("sql"),
  builder: {
    ...common,
    ...indent,
    ...declarationOnly,
    ...skipInvalid,
  },
  handler: async (argv) => {
    const {
      config,
      count,
      filename,
      output,
      zip,
      indent,
      declarationOnly,
      skipInvalid,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "postgresql",
        zip: zip,
        indent: indent,
        declarationOnly: declarationOnly,
        skipInvalid: skipInvalid,
      },
      output: output,
      route: config,
    });
  },
};
