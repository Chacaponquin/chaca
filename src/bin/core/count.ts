import { Options } from "yargs";

export const count: Options = {
  describe: "Count of documents to generate",
  type: "number",
  default: 50,
};
