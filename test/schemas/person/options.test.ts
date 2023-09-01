import { schemas } from "../../../src";

describe("# Person options tests", () => {
  it("Gender test", () => {
    const value = schemas.person.gender().getValue();
    expect(schemas.person.constants.genders.includes(value));
  });

  it("Job area test", () => {
    const value = schemas.person.jobArea().getValue();
    expect(schemas.person.constants.jobAreas.includes(value));
  });

  it("Job level test", () => {
    const value = schemas.person.jobLevel().getValue();
    expect(schemas.person.constants.jobLevels.includes(value));
  });

  it("Language test", () => {
    const value = schemas.person.language().getValue();
    expect(schemas.person.constants.languages.includes(value));
  });

  it("Prefix test", () => {
    const value = schemas.person.prefix().getValue();
    const all = [
      ...schemas.person.constants.prefixes.female,
      ...schemas.person.constants.prefixes.male,
    ];
    expect(all.includes(value));
  });

  it("Sex test", () => {
    const value = schemas.person.sex().getValue();
    expect(["Male", "Female"].includes(value));
  });
});
