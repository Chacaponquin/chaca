import { describe, expect, it } from "vitest";
import { exec } from "shelljs";

describe("Dataset CLI", () => {
  it("export dataset example. should return an empty string", () => {
    const result = exec(
      "node ./lib/bin/index.js json --count 50 --filename dataset --output data/cli/dataset --config test/cli/dataset/dataset.js",
    );

    expect(result.code).toBe(0);
  });

  it("dataset with empty schema name. should throw an error", () => {
    const result = exec(
      "node ./lib/bin/index.js json --count 50 --filename data-test --output data/cli/dataset --config test/cli/dataset/wrong-dataset.js",
    );

    expect(result.code).toBe(1);
  });
});
