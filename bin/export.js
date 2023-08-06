const path = require("path");
const fs = require("fs");
const { chaca, ChacaSchema } = require("../lib/cjs/index.js");

async function run({ configRoute, format, filename, output, count }) {
  if (!fs.existsSync(configRoute)) {
    throw Error(`The config file '${configRoute}' not exist's`);
  } else {
    const route = path.resolve(process.cwd(), configRoute);
    const config = require(route);

    if (config instanceof ChacaSchema) {
      await config.generateAndExport(count, {
        fileName: filename,
        format: format,
        location: output,
      });
    } else if (Array.isArray(config)) {
      await chaca.exportFromSchemas(config, {
        fileName: filename,
        format: format,
        location: output,
      });
    } else {
      throw new Error(`You must export a schema or an array of schemas.`);
    }
  }
}

module.exports = run;
