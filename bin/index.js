const yargs = require("yargs");
const run = require("./export");

yargs.command({
  command: "export",
  describe: "Adds two number",
  builder: {
    format: {
      describe:
        "Export file export format ('java' | 'yaml' | 'postgresql' | 'javascript' | 'typescript' | 'json' | 'csv' | 'python')",
      type: "string",
      default: "json",
    },
    config: {
      alias: "c",
      describe: "Schemas config file location",
      demandOption: true,
      type: "string",
    },
    filename: {
      alias: "n",
      describe: "Output file name",
      default: "data",
    },
    output: {
      describe: "Output file location",
      default: "",
      alias: "o",
    },
    count: {
      describe: "Count of documents to generate",
      type: "number",
      default: 50,
    },
  },

  // Function for your command
  handler: async (argv) => {
    const { config, count, filename, format, output } = argv;
    await run({ configRoute: config, count, filename, format, output });
  },
});

yargs.parse();
