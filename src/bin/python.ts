import { CommandModule } from "yargs";
import { run } from "./core/export";
import { separate } from "./core/separated";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";
import { skipInvalid } from "./core/skip-invalid";
import { declarationOnly } from "./core/declaration-only";

interface Props extends CommonProps {
  separate: boolean;
  indent: number;
  skipInvalid: boolean;
  declarationOnly: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const python: CommandModule<{}, Props> = {
  command: "python",
  describe: description("python"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
    ...declarationOnly,
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
      declarationOnly,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "python",
        zip: zip,
        indent: indent,
        separate: separate,
        skipInvalid: skipInvalid,
        declarationOnly: declarationOnly,
      },
      output: output,
      route: config,
    });
  },
};
