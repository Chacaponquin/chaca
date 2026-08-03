import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("internet.port", () => {
  it("should return an integer between 0 and 65535", () => {
    for (let i = 0; i < 200; i++) {
      const value = modules.internet.port();

      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(65535);
    }
  });
});
