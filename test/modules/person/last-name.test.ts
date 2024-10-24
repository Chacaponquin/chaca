import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("person.lastName", () => {
  it("no arguments. should return one an english lastnames", () => {
    const value = modules.person.lastName();
    const is = modules.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  describe("language argument", () => {
    it("language = 'es'. should return one of the defined lastnames", () => {
      const value = modules.person.lastName({ language: "es" });
      const is = modules.person.constants.names.es.lastNames.includes(value);

      expect(is).toBe(true);
    });
  });
});
