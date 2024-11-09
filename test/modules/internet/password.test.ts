import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("internet.password", () => {
  describe("length argument", () => {
    it("length = 10. should return an password with length 10", () => {
      const val = modules.internet.password({ length: 10 });

      expect(val.length === 10).toBe(true);
    });
  });

  describe("length argument", () => {
    it("length = 10", () => {
      const val = modules.internet.password({ length: 10 });

      expect(val).toHaveLength(10);
    });
  });
});
