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

  it("person.sex", () => {
    const value = modules.person.sex();
    expect(modules.person.constants.sexs.includes(value)).toBe(true);
  });

  it("person.zodiacSign", () => {
    const value = modules.person.zodiacSign();
    expect(modules.person.constants.zodiacSigns.includes(value)).toBe(true);
  });
});
