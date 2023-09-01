import { schemas } from "../../../src";

describe("# Person last name tests", () => {
  it("Pass no arguments. Should return one an english lastnames", () => {
    const value = schemas.person.lastName().getValue();
    const is = schemas.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass a not valid language argument. Should return an english lastnames", () => {
    const value = schemas.person.lastName({ language: "" as any }).getValue();
    const is = schemas.person.constants.names.en.lastNames.includes(value);

    expect(is).toBe(true);
  });

  it("Pass language=es. Should return one of the defined lastnames", () => {
    const value = schemas.person.lastName({ language: "es" }).getValue();
    const is = schemas.person.constants.names.es.lastNames.includes(value);

    expect(is).toBe(true);
  });
});
