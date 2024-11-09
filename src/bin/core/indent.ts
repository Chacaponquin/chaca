import { Options } from "yargs";

export const options: Options = {
  number: true,
  describe: "Indentation width to use (in spaces). Default `3`",
};

export const indent = {
  indent: options,
};
