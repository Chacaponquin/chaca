const path = require("path");
const fs = require("fs");
const { chaca, Schema } = require("../lib/cjs/index.js");

async function run({ configRoute, format, filename, output, count }) {
  if (!fs.existsSync(configRoute)) {
    throw Error(`The config file '${configRoute}' not exist's`);
  } else {
    const route = path.resolve(process.cwd(), configRoute);
    const config = require(route);

    if (config instanceof Schema) {
      await config.generateAndExport(count, {
        filename: filename,
        format: format,
        location: output,
      });
    } else if (Array.isArray(config)) {
      await chaca.exportFromSchemas(config, {
        filename: filename,
        format: format,
        location: output,
      });
    } else {
      throw new Error(`You must export a schema or an array of schemas.`);
    }
  }
}

module.exports = run;
