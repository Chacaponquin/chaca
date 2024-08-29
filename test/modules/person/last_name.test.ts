import { modules } from "../../../src";

describe("# Person last name tests", () => {
  it("Pass no arguments. Should return one an english lastnames", () => {
    const value = modules.person.lastName().getValue();
    const is = modules.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass a not valid language argument. Should return an english lastnames", () => {
    const value = modules.person.lastName({ language: "" as any }).getValue();
    const is = modules.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass language=es. Should return one of the defined lastnames", () => {
    const value = modules.person.lastName({ language: "es" }).getValue();
    const is = modules.person.constants.names.es.lastNames.includes(value);

    expect(is).toBe(true);
  });
});
