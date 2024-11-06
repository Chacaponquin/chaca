import { CommandModule, Options } from "yargs";
import { run } from "./core/export";
import { common, CommonProps } from "./core/common";
import { description } from "./core/description";

type Props = CommonProps & {
  expandNestedObjects: boolean;
  unwindArrays: boolean;
  sortHeader: boolean;
  expandArrayObjects: boolean;
  trimFields: boolean;
  trimHeaders: boolean;
};

const expandNestedObjects: Options = {
  boolean: true,
  describe: "Should nested objects be deep-converted to CSV? Default `true`",
};

const expandArrayObjects: Options = {
  boolean: true,
  describe:
    "Should objects in array values be deep-converted to CSV? Default `false`",
};

const sortHeader: Options = {
  boolean: true,
  describe:
    "Should the header keys be sorted in alphabetical order? Default `false`",
};

const unwindArrays: Options = {
  boolean: true,
  describe:
    'Should array values be "unwound" such that there is one line per value in the array? Default `false`',
};

const trimHeaders: Options = {
  boolean: true,
  describe: "Should the header fields be trimmed? Default `false`",
};

const trimFields: Options = {
  boolean: true,
  describe: "Should the field values be trimmed? Default `false`",
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const csv: CommandModule<{}, Props> = {
  command: "csv",
  describe: description("csv"),
  builder: {
    ...common,
    expandNestedObjects,
    unwindArrays,
    sortHeader,
    expandArrayObjects,
    trimFields,
    trimHeaders,
  },
  handler: async (argv) => {
    const {
      config,
      count,
      filename,
      output,
      zip,
      expandArrayObjects,
      expandNestedObjects,
      sortHeader,
      trimFields,
      trimHeaders,
      unwindArrays,
    } = argv;

    await run({
      count: count,
      filename: filename,
      format: {
        ext: "csv",
        zip: zip,
        trim: { field: trimFields, header: trimHeaders },
        sortHeader: sortHeader,
        unwindArrays: unwindArrays,
        expandArrayObjects: expandArrayObjects,
        expandNestedObjects: expandNestedObjects,
      },
      output: output,
      route: config,
    });
  },
};
