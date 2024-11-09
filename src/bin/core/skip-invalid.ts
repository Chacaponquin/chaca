import { Options } from "yargs";

const options: Options = {
  boolean: true,
  describe: "Do not throw on invalid types. Default `false`",
};

export const skipInvalid = {
  skipInvalid: options,
};
