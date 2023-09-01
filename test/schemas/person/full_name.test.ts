import { schemas } from "../../../src";

function expectNames({
  firstNames,
  lastNames,
  value,
}: {
  firstNames: Array<string>;
  lastNames: Array<string>;
  value: string;
}) {
  const sep = value.split(" ");

  if (sep.length === 4) {
    const [firstName, middleName, lastName1, lastName2] = sep;

    expect(firstNames.includes(firstName)).toBe(true);
    expect(firstNames.includes(middleName)).toBe(true);
    expect(lastNames.includes(lastName1)).toBe(true);
    expect(lastNames.includes(lastName2)).toBe(true);
  } else {
    const [firstName, lastName1, lastName2] = sep;

    expect(firstNames.includes(firstName)).toBe(true);
    expect(lastNames.includes(lastName1)).toBe(true);
    expect(lastNames.includes(lastName2)).toBe(true);
  }
}

describe("# Person full name tests", () => {
  const constants = schemas.person.constants;

  it("Pass no arguments. Should return a english full name", () => {
    const value = schemas.person.fullName().getValue();
    const allNames = [...constants.names.en.female, ...constants.names.en.male];

    expectNames({
      value,
      firstNames: allNames,
      lastNames: constants.names.en.lastNames,
    });
  });

  it("Pass language=es. Should return an spanish full name", () => {
    const value = schemas.person.fullName().getValue({ language: "es" });
    const allNames = [...constants.names.es.female, ...constants.names.es.male];

    expectNames({
      value,
      firstNames: allNames,
      lastNames: constants.names.es.lastNames,
    });
  });

  it("Pass language=en. Should return an english full name", () => {
    const value = schemas.person.fullName().getValue({ language: "en" });
    const allNames = [...constants.names.en.female, ...constants.names.en.male];

    expectNames({
      value,
      firstNames: allNames,
      lastNames: constants.names.en.lastNames,
    });
  });

  it("Pass sex=male. Should return an male english full name", () => {
    const value = schemas.person.fullName().getValue({ sex: "male" });
    const allNames = constants.names.en.male;

    expectNames({
      value,
      firstNames: allNames,
      lastNames: constants.names.en.lastNames,
    });
  });

  it("Pass sex=male and language=spanish. Should return an male spanish full name", () => {
    const value = schemas.person
      .fullName()
      .getValue({ sex: "male", language: "es" });
    const allNames = constants.names.es.male;

    expectNames({
      value,
      firstNames: allNames,
      lastNames: constants.names.es.lastNames,
    });
  });
});
