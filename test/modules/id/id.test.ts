import { describe, expect, it } from "vitest";
import { modules } from "../../../src";
import { validate } from "uuid";
import { isCuid } from "@paralleldrive/cuid2";

describe("# Id modules test", () => {
  it("id.uuid", () => {
    const value = modules.id.uuid();

    expect(validate(value)).toBe(true);
  });

  it("id.cuid", () => {
    const value = modules.id.cuid();

    expect(isCuid(value)).toBe(true);
  });

  it("id.mongodbId", () => {
    const value = modules.id.mongodbId();

    expect(typeof value).toBe("string");
  });

  it("id.ulid", () => {
    const value = modules.id.ulid();

    expect(typeof value).toBe("string");
  });

  describe("id.nanoid", () => {
    it("no params. Should return a string with length 20", () => {
      const value = modules.id.nanoid();

      expect(value).toHaveLength(20);
    });

    it("length = 10. Should return a string with length 10", () => {
      const value = modules.id.nanoid({ length: 10 });

      expect(value).toHaveLength(10);
    });

    it("length = -5. Should return a string with length 20", () => {
      const value = modules.id.nanoid({ length: -5 });

      expect(value).toHaveLength(20);
    });

    it("length = 0. Should return a string with length 0", () => {
      const value = modules.id.nanoid({ length: 0 });

      expect(value).toHaveLength(0);
    });

    it("length = undefined. Should return a string with length 20", () => {
      const value = modules.id.nanoid({ length: undefined });

      expect(value).toHaveLength(20);
    });
  });
});
