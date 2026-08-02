import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("lorem.word", () => {
  it("no arguments. returns a single word without spaces", () => {
    const value = modules.lorem.word();

    expect(value).toMatch(/^[a-zA-Z]+$/);
    expect(value).not.toContain(" ");
  });
});
