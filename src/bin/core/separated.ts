import { Options } from "yargs";

export const options: Options = {
  boolean: true,
  describe:
    "The data of each schema must be separated into separate files. Default `false`",
};

export const separate = {
  separate: options,
};
