import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.paragraphs", () => {
  it("no arguments. returns 3 paragraphs separated by '\\n'", () => {
    const value = modules.lorem.paragraphs();
    const parts = value.split("\n").filter((p) => p.trim().length > 0);

    expect(parts).toHaveLength(3);
  });

  it("paragraphsCount: 2, separator: '|'. returns 2 paragraphs joined by the separator", () => {
    const value = modules.lorem.paragraphs({
      paragraphsCount: 2,
      separator: "|",
    });
    const parts = value.split("|").filter((p) => p.trim().length > 0);

    expect(parts).toHaveLength(2);
  });
});
