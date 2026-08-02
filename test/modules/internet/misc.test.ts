import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("internet.userAgent", () => {
  it("should return a non-empty user agent string starting with Mozilla/5.0 or Opera/", () => {
    for (let i = 0; i < 100; i++) {
      const value = modules.internet.userAgent();

      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
      expect(value).toMatch(/^(Mozilla\/5\.0|Opera\/\d)/);
    }
  });
});

describe("internet.domainName", () => {
  it("should return a non-empty word, optionally followed by '.' or '-' and another word", () => {
    for (let i = 0; i < 100; i++) {
      const value = modules.internet.domainName();

      expect(value.length).toBeGreaterThan(0);
      expect(value).not.toContain(" ");
    }
  });
});

describe("internet.httpStatusCode", () => {
  it("should return a number belonging to one of the http status groups", () => {
    const allCodes = Object.values(
      modules.internet.constants.httpStatus,
    ).flat();

    for (let i = 0; i < 100; i++) {
      const value = modules.internet.httpStatusCode();

      expect(typeof value).toBe("number");
      expect(allCodes).toContain(value);
    }
  });
});
