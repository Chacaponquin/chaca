import { CommandModule, Options } from "yargs";
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
  generateIds: boolean;
}

const generateIds: Options = {
  describe:
    "Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined",
  boolean: true,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const postgresql: CommandModule<{}, Props> = {
  command: "postgresql",
  describe: description("sql"),
  builder: {
    ...common,
    ...indent,
    ...declarationOnly,
    ...skipInvalid,
    generateIds: generateIds,
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
      generateIds,
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
        generateIds: generateIds,
      },
      output: output,
      route: config,
    });
  },
};
