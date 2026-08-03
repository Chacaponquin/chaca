import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.paragraph", () => {
  it("no arguments. returns a non-empty paragraph", () => {
    const value = modules.lorem.paragraph();

    expect(typeof value).toBe("string");
    expect(value.length).toBeGreaterThan(0);
  });

  it("count: 5. returns a paragraph with exactly 5 sentences", () => {
    const value = modules.lorem.paragraph({ count: 5 });
    const periods = value.match(/\./g) ?? [];

    expect(periods).toHaveLength(5);
  });
});
