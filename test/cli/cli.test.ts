import { exec } from "shelljs";
import { describe, expect, it } from "vitest";

describe("CLI", () => {
  it("missing --filename. should fail", () => {
    const result = exec(
      "node ./lib/bin/chaca.js json --count 50 --output data/cli/dataset --config test/cli/dataset/wrong-dataset.js",
    );

    expect(result.code).toBe(1);
  });

  it("missing --config. should fail", () => {
    const result = exec(
      "node ./lib/bin/chaca.js json --filename dataset-test --count 50 --output data/cli/dataset",
    );

    expect(result.code).toBe(1);
  });
});
