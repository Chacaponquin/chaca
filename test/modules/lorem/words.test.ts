import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.words", () => {
  it("no arguments. returns between 5 and 10 words", () => {
    const value = modules.lorem.words();
    const count = value.split(" ").length;

    expect(count).toBeGreaterThanOrEqual(5);
    expect(count).toBeLessThanOrEqual(10);
  });

  it("count: 3. returns exactly 3 words", () => {
    const value = modules.lorem.words({ count: 3 });

    expect(value.split(" ")).toHaveLength(3);
  });

  it("count: 0. falls back to the library default word count (5 to 15 words)", () => {
    const value = modules.lorem.words({ count: 0 });
    const count = value.split(" ").length;

    expect(value.length).toBeGreaterThan(0);
    expect(count).toBeGreaterThanOrEqual(5);
    expect(count).toBeLessThanOrEqual(15);
  });
});
