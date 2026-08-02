import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.slug", () => {
  it("no arguments. returns a slug with 3 segments", () => {
    const value = modules.lorem.slug();

    expect(value).toMatch(/^[a-z]+(-[a-z]+)*$/);
    expect(value.split("-")).toHaveLength(3);
  });

  it("wordCount: 5. returns a slug with 5 segments", () => {
    const value = modules.lorem.slug({ wordCount: 5 });

    expect(value).toMatch(/^[a-z]+(-[a-z]+)*$/);
    expect(value.split("-")).toHaveLength(5);
  });
});
