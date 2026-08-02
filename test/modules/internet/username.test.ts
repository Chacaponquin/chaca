import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("internet.username", () => {
  it("no arguments. should return a non-empty username without spaces", () => {
    for (let i = 0; i < 100; i++) {
      const username = modules.internet.username();

      expect(username.length).toBeGreaterThan(0);
      expect(username).not.toContain(" ");
    }
  });

  describe("firstName argument", () => {
    it("firstName = 'hector'. should return an username that includes 'hector'", () => {
      const username = modules.internet.username({ firstName: "hector" });
      expect(username.includes("hector")).toBe(true);
    });
  });

  describe("lastName argument", () => {
    it("lastName = 'hector'. should return a username that includes 'hector'", () => {
      const username = modules.internet.username({ lastName: "hector" });
      expect(username.includes("hector")).toBe(true);
    });
  });

  describe("firstName and lastName argument", () => {
    it("firstName = 'hector' & lastName = 'json'", () => {
      const username = modules.internet.username({
        lastName: "hector",
        firstName: "john",
      });

      expect(username.includes("hector")).toBe(true);
      expect(username.includes("john")).toBe(true);
    });
  });
});
