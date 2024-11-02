import { CommandModule, Options } from "yargs";
import { run } from "./core/export";
import { separate } from "./core/separated";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";
import { skipInvalid } from "./core/skip-invalid";
import { declarationOnly } from "./core/declaration-only";

interface Props extends CommonProps {
  indent: number;
  skipInvalid: boolean;
  declarationOnly: boolean;
  package: string;
}

const ipackage: Options = {
  string: true,
  describe:
    "Name of the package in which the classes will be found. Default `chaca.data`",
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const java: CommandModule<{}, Props> = {
  command: "java",
  describe: description("javascript"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
    ...declarationOnly,
    package: ipackage,
  },
  handler: async (argv) => {
    const {
      config,
      count,
      filename,
      output,
      zip,
      indent,
      skipInvalid,
      declarationOnly,
      package: ipackage,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "java",
        zip: zip,
        indent: indent,
        skipInvalid: skipInvalid,
        declarationOnly: declarationOnly,
        package: ipackage,
      },
      output: output,
      route: config,
    });
  },
};
