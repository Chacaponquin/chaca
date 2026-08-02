import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("internet.url", () => {
  it("no arguments. should return an url starting with a known protocol", () => {
    for (let i = 0; i < 100; i++) {
      const value = modules.internet.url();

      expect(value).toMatch(/^[a-z0-9]+:\/\//);

      const protocol = value.split("://")[0];
      expect(modules.internet.constants.protocols).toContain(protocol);
    }
  });

  describe("secure argument", () => {
    it("secure = true. should return an url starting with https://", () => {
      for (let i = 0; i < 100; i++) {
        const value = modules.internet.url({ secure: true });

        expect(value.startsWith("https://")).toBe(true);
      }
    });

    it("secure = false. should return an url starting with http://", () => {
      for (let i = 0; i < 100; i++) {
        const value = modules.internet.url({ secure: false });

        expect(value.startsWith("http://")).toBe(true);
      }
    });
  });
});
