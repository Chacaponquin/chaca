import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("person modules", () => {
  it("person.gender", () => {
    const value = modules.person.gender();
    expect(modules.person.constants.genders.includes(value)).toBe(true);
  });

  it("person.jobArea", () => {
    const value = modules.person.jobArea();
    expect(modules.person.constants.jobAreas.includes(value)).toBe(true);
  });

  it("person.jobLevel", () => {
    const value = modules.person.jobLevel();
    expect(modules.person.constants.jobLevels.includes(value)).toBe(true);
  });

  it("person.language", () => {
    const value = modules.person.language();
    expect(modules.person.constants.languages.includes(value)).toBe(true);
  });

  it("person.prefix", () => {
    const value = modules.person.prefix();
    const all = [
      ...modules.person.constants.prefixes.female,
      ...modules.person.constants.prefixes.male,
    ];
    expect(all.includes(value)).toBe(true);
  });

  it("person.prefix with sex = 'male'", () => {
    const value = modules.person.prefix({ sex: "male" });
    expect(modules.person.constants.prefixes.male.includes(value)).toBe(true);
  });

  it("person.prefix with sex = 'female'", () => {
    const value = modules.person.prefix({ sex: "female" });
    expect(modules.person.constants.prefixes.female.includes(value)).toBe(true);
  });

  it("person.sex", () => {
    const value = modules.person.sex();
    expect(modules.person.constants.sexs.includes(value)).toBe(true);
  });

  it("person.zodiacSign", () => {
    const value = modules.person.zodiacSign();
    expect(modules.person.constants.zodiacSigns.includes(value)).toBe(true);
  });
});
