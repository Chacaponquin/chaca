import { Options } from "yargs";

const options: Options = {
  describe:
    "Value assignment will not be included in the files. Default `false`",
  boolean: true,
};

export const declarationOnly = {
  declarationOnly: options,
};
