import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("internet.mac", () => {
  it("should return 6 colon-separated pairs of lowercase hex-like characters", () => {
    for (let i = 0; i < 200; i++) {
      const value = modules.internet.mac();

      expect(value).toMatch(/^([0-9a-z]{2}:){5}[0-9a-z]{2}$/);
    }
  });
});
