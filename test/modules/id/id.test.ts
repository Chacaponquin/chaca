import { describe, expect, it } from "vitest";
import { modules } from "../../../src";
import { validate, version } from "uuid";
import { isCuid } from "@paralleldrive/cuid2";

describe("# Id modules test", () => {
  it("id.uuid", () => {
    const value = modules.id.uuid();

    expect(validate(value)).toBe(true);
    expect(version(value)).toBe(4);
  });

  it("id.cuid", () => {
    const value = modules.id.cuid();

    expect(isCuid(value)).toBe(true);
  });

  it("id.mongodbId", () => {
    const value = modules.id.mongodbId();

    expect(value).toMatch(/^[0-9a-f]{24}$/);
  });

  it("id.ulid", () => {
    const value = modules.id.ulid();

    expect(value).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/);
  });

  describe("id.nanoid", () => {
    const NANOID_ALPHABET = /^[A-Za-z0-9_-]+$/;

    it.each([
      { name: "no params", args: undefined },
      { name: "length = undefined", args: { length: undefined } },
      { name: "length = -5", args: { length: -5 } },
    ])("$name. Should return a string with length 20", ({ args }) => {
      const value = modules.id.nanoid(args);

      expect(value).toHaveLength(20);
      expect(value).toMatch(NANOID_ALPHABET);
    });

    it("length = 10. Should return a string with length 10", () => {
      const value = modules.id.nanoid({ length: 10 });

      expect(value).toHaveLength(10);
      expect(value).toMatch(NANOID_ALPHABET);
    });

    it("length = 0. Should return an empty string", () => {
      const value = modules.id.nanoid({ length: 0 });

      expect(value).toHaveLength(0);
    });
  });
});
