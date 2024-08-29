import { modules } from "../../../src";

describe("# Person options tests", () => {
  it("Gender test", () => {
    const value = modules.person.gender().getValue();
    expect(modules.person.constants.genders.includes(value));
  });

  it("Job area test", () => {
    const value = modules.person.jobArea().getValue();
    expect(modules.person.constants.jobAreas.includes(value));
  });

  it("Job level test", () => {
    const value = modules.person.jobLevel().getValue();
    expect(modules.person.constants.jobLevels.includes(value));
  });

  it("Language test", () => {
    const value = modules.person.language().getValue();
    expect(modules.person.constants.languages.includes(value));
  });

  it("Prefix test", () => {
    const value = modules.person.prefix().getValue();
    const all = [
      ...modules.person.constants.prefixes.female,
      ...modules.person.constants.prefixes.male,
    ];
    expect(all.includes(value));
  });

  it("Sex test", () => {
    const value = modules.person.sex().getValue();
    expect(["Male", "Female"].includes(value));
  });
});
