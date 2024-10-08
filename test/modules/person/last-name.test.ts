import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Person last name tests", () => {
  it("Pass no arguments. Should return one an english lastnames", () => {
    const value = modules.person.lastName();
    const is = modules.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass a not valid language argument. Should return an english lastnames", () => {
    const value = modules.person.lastName({ language: "" as any });
    const is = modules.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass language=es. Should return one of the defined lastnames", () => {
    const value = modules.person.lastName({ language: "es" });
    const is = modules.person.constants.names.es.lastNames.includes(value);

    expect(is).toBe(true);
  });
});
