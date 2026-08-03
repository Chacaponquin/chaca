import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.sentence", () => {
  it("no arguments. returns a non-empty sentence ending with a period", () => {
    const value = modules.lorem.sentence();

    expect(value.length).toBeGreaterThan(1);
    expect(value.endsWith(".")).toBe(true);
  });

  it("wordsMin: 3, wordsMax: 5. word count is within [3, 5]", () => {
    const value = modules.lorem.sentence({ wordsMin: 3, wordsMax: 5 });
    const count = value.slice(0, -1).split(" ").length;

    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(5);
  });
});
