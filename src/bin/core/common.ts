import { Options } from "yargs";

export interface CommonProps {
  count: number;
  filename: string;
  output: string;
  config: string;
  zip: boolean;
}

const config: Options = {
  alias: "c",
  describe: "Schemas configuration file location",
  demandOption: true,
  type: "string",
};

const count: Options = {
  describe: "Count of documents to generate. Default `50`",
  type: "number",
  default: 50,
};

const filename: Options = {
  alias: "n",
  describe: "Output filename. Default `data`",
  default: "data",
};

const output: Options = {
  describe: "Output file location. Default `project location`",
  default: "",
  alias: "o",
};

const zip: Options = {
  boolean: true,
  default: false,
  describe: "The generated files are stored in a zip file. Default `false`",
};

export const common = {
  config: config,
  count: count,
  filename: filename,
  output: output,
  zip: zip,
};
