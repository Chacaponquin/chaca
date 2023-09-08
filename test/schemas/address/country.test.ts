import { schemas } from "../../../src";

describe("# Address country tests", () => {
  it("Without params. Should return a country", () => {
    const value = schemas.address.country().getValue();
    const countries = schemas.address.constants.countries.map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });

  it("Country with continent argument", () => {
    const value = schemas.address.country().getValue({ continent: "Europe" });
    const countries = schemas.address.constants.countries
      .filter((c) => c.continent === "Europe")
      .map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });

  it("Country with not valid country argument", () => {
    const value = schemas.address
      .country()
      .getValue({ continent: "Hi" as any });
    const countries = schemas.address.constants.countries.map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });
});
