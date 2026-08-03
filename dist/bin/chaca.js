#!/usr/bin/env node
'use strict';

var yargs = require('yargs');
var fs = require('fs');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var yargs__default = /*#__PURE__*/_interopDefault(yargs);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
async function run({ route, count: count2, filename: filename2, output: output2, format }) {
  if (!fs__default.default.existsSync(route)) {
    throw Error(`The config file '${route}' not exist's`);
  } else {
    const config2 = __require(path__default.default.resolve(process.cwd(), route));
    if (typeof config2?.exportFromCli !== "function") {
      throw new Error(`You must export a schema or a dataset`);
    }
    await config2.exportFromCli(count2, {
      filename: filename2,
      format,
      location: output2,
      verbose: true
    });
  }
}

// src/bin/core/separated.ts
var options = {
  boolean: true,
  describe: "The data of each schema must be separated into separate files. Default `false`"
};
var separate = {
  separate: options
};

// src/bin/core/indent.ts
var options2 = {
  number: true,
  describe: "Indentation width to use (in spaces). Default `3`"
};
var indent = {
  indent: options2
};

// src/bin/core/common.ts
var config = {
  alias: "c",
  describe: "Schemas configuration file location",
  demandOption: true,
  type: "string"
};
var count = {
  describe: "Count of documents to generate. Default `50`",
  type: "number",
  default: 50
};
var filename = {
  alias: "n",
  describe: "Output filename. Default `data`",
  default: "data"
};
var output = {
  describe: "Output file location. Default `project location`",
  default: "",
  alias: "o"
};
var zip = {
  boolean: true,
  default: false,
  describe: "The generated files are stored in a zip file. Default `false`"
};
var common = {
  config,
  count,
  filename,
  output,
  zip
};

// src/bin/core/description.ts
function description(ext) {
  return `Generates and export the data from an schema or dataset into a ${ext} file`;
}

// src/bin/json.ts
var json = {
  command: "json",
  describe: description("json"),
  builder: {
    ...common,
    ...separate,
    ...indent
  },
  handler: async (argv) => {
    const { config: config2, count: count2, filename: filename2, output: output2, separate: separate2, zip: zip2, indent: indent2 } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: { ext: "json", zip: zip2, indent: indent2, separate: separate2 },
      output: output2,
      route: config2
    });
  }
};

// src/bin/csv.ts
var expandNestedObjects = {
  boolean: true,
  describe: "Should nested objects be deep-converted to CSV? Default `true`"
};
var expandArrayObjects = {
  boolean: true,
  describe: "Should objects in array values be deep-converted to CSV? Default `false`"
};
var sortHeader = {
  boolean: true,
  describe: "Should the header keys be sorted in alphabetical order? Default `false`"
};
var unwindArrays = {
  boolean: true,
  describe: 'Should array values be "unwound" such that there is one line per value in the array? Default `false`'
};
var trimHeaders = {
  boolean: true,
  describe: "Should the header fields be trimmed? Default `false`"
};
var trimFields = {
  boolean: true,
  describe: "Should the field values be trimmed? Default `false`"
};
var csv = {
  command: "csv",
  describe: description("csv"),
  builder: {
    ...common,
    expandNestedObjects,
    unwindArrays,
    sortHeader,
    expandArrayObjects,
    trimFields,
    trimHeaders
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      zip: zip2,
      expandArrayObjects: expandArrayObjects2,
      expandNestedObjects: expandNestedObjects2,
      sortHeader: sortHeader2,
      trimFields: trimFields2,
      trimHeaders: trimHeaders2,
      unwindArrays: unwindArrays2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "csv",
        zip: zip2,
        trim: { field: trimFields2, header: trimHeaders2 },
        sortHeader: sortHeader2,
        unwindArrays: unwindArrays2,
        expandArrayObjects: expandArrayObjects2,
        expandNestedObjects: expandNestedObjects2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/yaml.ts
var sortKeys = {
  boolean: true,
  describe: "If `true`, sort keys when dumping YAML. Default `false`"
};
var lineWidth = {
  number: true,
  describe: "Set max line width. Default `80`"
};
var yaml = {
  command: "yaml",
  describe: description("yaml"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    sortKeys,
    lineWidth
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      separate: separate2,
      zip: zip2,
      indent: indent2,
      sortKeys: sortKeys2,
      lineWidth: lineWidth2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "yaml",
        zip: zip2,
        indent: indent2,
        separate: separate2,
        sortKeys: sortKeys2,
        lineWidth: lineWidth2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/core/skip-invalid.ts
var options3 = {
  boolean: true,
  describe: "Do not throw on invalid types. Default `false`"
};
var skipInvalid = {
  skipInvalid: options3
};

// src/bin/js.ts
var js = {
  command: "js",
  describe: description("javascript"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      separate: separate2,
      zip: zip2,
      indent: indent2,
      skipInvalid: skipInvalid2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "javascript",
        zip: zip2,
        indent: indent2,
        separate: separate2,
        skipInvalid: skipInvalid2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/core/declaration-only.ts
var options4 = {
  describe: "Value assignment will not be included in the files. Default `false`",
  boolean: true
};
var declarationOnly = {
  declarationOnly: options4
};

// src/bin/java.ts
var ipackage = {
  string: true,
  describe: "Name of the package in which the classes will be found. Default `chaca.data`"
};
var java = {
  command: "java",
  describe: description("javascript"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
    ...declarationOnly,
    package: ipackage
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      zip: zip2,
      indent: indent2,
      skipInvalid: skipInvalid2,
      declarationOnly: declarationOnly2,
      package: ipackage2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "java",
        zip: zip2,
        indent: indent2,
        skipInvalid: skipInvalid2,
        declarationOnly: declarationOnly2,
        package: ipackage2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/ts.ts
var ts = {
  command: "ts",
  describe: description("typescript"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
    ...declarationOnly
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      separate: separate2,
      zip: zip2,
      indent: indent2,
      skipInvalid: skipInvalid2,
      declarationOnly: declarationOnly2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "typescript",
        zip: zip2,
        indent: indent2,
        separate: separate2,
        skipInvalid: skipInvalid2,
        declarationOnly: declarationOnly2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/postgresql.ts
var generateIds = {
  describe: "Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined",
  boolean: true
};
var postgresql = {
  command: "postgresql",
  describe: description("sql"),
  builder: {
    ...common,
    ...indent,
    ...declarationOnly,
    ...skipInvalid,
    generateIds
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      zip: zip2,
      indent: indent2,
      declarationOnly: declarationOnly2,
      skipInvalid: skipInvalid2,
      generateIds: generateIds4
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "postgresql",
        zip: zip2,
        indent: indent2,
        declarationOnly: declarationOnly2,
        skipInvalid: skipInvalid2,
        generateIds: generateIds4
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/sqlite.ts
var generateIds2 = {
  describe: "Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined",
  boolean: true
};
var sqlite = {
  command: "sqlite",
  describe: description("sql"),
  builder: {
    ...common,
    ...indent,
    ...declarationOnly,
    ...skipInvalid,
    generateIds: generateIds2
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      zip: zip2,
      indent: indent2,
      declarationOnly: declarationOnly2,
      skipInvalid: skipInvalid2,
      generateIds: generateIds4
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "sqlite",
        zip: zip2,
        indent: indent2,
        declarationOnly: declarationOnly2,
        skipInvalid: skipInvalid2,
        generateIds: generateIds4
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/mysql.ts
var generateIds3 = {
  describe: "Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined",
  boolean: true
};
var mysql = {
  command: "mysql",
  describe: description("sql"),
  builder: {
    ...common,
    ...indent,
    ...declarationOnly,
    ...skipInvalid,
    generateIds: generateIds3
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      zip: zip2,
      indent: indent2,
      declarationOnly: declarationOnly2,
      skipInvalid: skipInvalid2,
      generateIds: generateIds4
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "mysql",
        zip: zip2,
        indent: indent2,
        declarationOnly: declarationOnly2,
        skipInvalid: skipInvalid2,
        generateIds: generateIds4
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/python.ts
var python = {
  command: "python",
  describe: description("python"),
  builder: {
    ...common,
    ...separate,
    ...indent,
    ...skipInvalid,
    ...declarationOnly
  },
  handler: async (argv) => {
    const {
      config: config2,
      count: count2,
      filename: filename2,
      output: output2,
      separate: separate2,
      zip: zip2,
      indent: indent2,
      skipInvalid: skipInvalid2,
      declarationOnly: declarationOnly2
    } = argv;
    await run({
      count: count2,
      filename: filename2,
      format: {
        ext: "python",
        zip: zip2,
        indent: indent2,
        separate: separate2,
        skipInvalid: skipInvalid2,
        declarationOnly: declarationOnly2
      },
      output: output2,
      route: config2
    });
  }
};

// src/bin/chaca.ts
yargs__default.default.command(json);
yargs__default.default.command(csv);
yargs__default.default.command(yaml);
yargs__default.default.command(js);
yargs__default.default.command(java);
yargs__default.default.command(ts);
yargs__default.default.command(postgresql);
yargs__default.default.command(sqlite);
yargs__default.default.command(mysql);
yargs__default.default.command(python);
yargs__default.default.parse();
//# sourceMappingURL=chaca.js.map
//# sourceMappingURL=chaca.js.map