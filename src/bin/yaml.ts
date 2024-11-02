import { CommandModule, Options } from "yargs";
import { run } from "./core/export";
import { separate } from "./core/separated";
import { indent } from "./core/indent";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";

interface Props extends CommonProps {
  separate: boolean;
  indent: number;
  sortKeys: boolean;
  lineWidth: number;
}

const sortKeys: Options = {
  boolean: true,
  describe: "If `true`, sort keys when dumping YAML. Default `false`",
};

const lineWidth: Options = {
  number: true,
  describe: "Set max line width. Default `80`",
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const yaml: CommandModule<{}, Props> = {
  command: "yaml",
  describe: description("yaml"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    sortKeys: sortKeys,
    lineWidth: lineWidth,
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
      sortKeys,
      lineWidth,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "yaml",
        zip: zip,
        indent: indent,
        separate: separate,
        sortKeys: sortKeys,
        lineWidth: lineWidth,
      },
      output: output,
      route: config,
    });
  },
};
