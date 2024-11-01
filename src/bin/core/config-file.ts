import { Options } from "yargs";

export const config: Options = {
  alias: "c",
  describe: "Schemas config file location",
  demandOption: true,
  type: "string",
};
