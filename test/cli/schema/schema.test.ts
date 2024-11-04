import { exec } from "shelljs";
import { describe, expect, it } from "vitest";

describe("Schema CLI", () => {
  it("export 50 objects from schema", () => {
    const result = exec(
      "node ./lib/bin/index.js json --count 50 --filename schema-array --output data/cli/schema --config test/cli/dataset/schema.js",
    );

    expect(result.code).toBe(0);
  });
});
