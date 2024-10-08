import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Person first name tests", () => {
  it("No pass arguments. Should return one of the defined english first names", () => {
    const value = modules.person.firstName();

    const constants = modules.person.constants;
    const allNames = [...constants.names.en.female, ...constants.names.en.male];
    const is = allNames.includes(value);
    expect(is).toBe(true);
  });

  it("Pass 'es' as language argument. Should return an spanish first name", () => {
    const value = modules.person.firstName({ language: "es" });

    const constants = modules.person.constants;
    const allNames = [...constants.names.es.female, ...constants.names.es.male];
    const is = allNames.includes(value);
    expect(is).toBe(true);
  });

  it("Pass 'en' as language argument. Should return an english first name", () => {
    const value = modules.person.firstName({ language: "en" });

    const constants = modules.person.constants;
    const allNames = [...constants.names.en.female, ...constants.names.en.male];
    const is = allNames.includes(value);
    expect(is).toBe(true);
  });

  it("Pass a not valid language argument. Should return an english first name", () => {
    const value = modules.person.firstName({ language: 5 as any });

    const constants = modules.person.constants;
    const allNames = [...constants.names.en.female, ...constants.names.en.male];
    const is = allNames.includes(value);
    expect(is).toBe(true);
  });

  it("Pass a not valid sex argument. Should return a english first name", () => {
    const value = modules.person.firstName({ sex: 5 as any });

    const constants = modules.person.constants;
    const allNames = [...constants.names.en.female, ...constants.names.en.male];
    const is = allNames.includes(value);
    expect(is).toBe(true);
  });

  it('Pass "male" as sex argument. Should return a english male first name', () => {
    const value = modules.person.firstName({ sex: "male" });
    const is = modules.person.constants.names.en.male.includes(value);
    expect(is).toBe(true);
  });

  it('Pass "female" as sex argument. Should return a english female first name', () => {
    const value = modules.person.firstName({ sex: "female" });
    const is = modules.person.constants.names.en.female.includes(value);
    expect(is).toBe(true);
  });

  it("Pass sex=male and language=es. Should return a male spanish first name", () => {
    const value = modules.person.firstName({ sex: "male", language: "es" });
    const is = modules.person.constants.names.es.male.includes(value);
    expect(is).toBe(true);
  });
});
