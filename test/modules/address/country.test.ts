import { modules } from "../../../src";

describe("# Address country tests", () => {
  it("Without params. Should return a country", () => {
    const value = modules.address.country().getValue();
    const countries = modules.address.constants.countries.map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });

  it("Country with continent argument", () => {
    const value = modules.address.country().getValue({ continent: "Europe" });
    const countries = modules.address.constants.countries
      .filter((c) => c.continent === "Europe")
      .map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });

  it("Country with not valid country argument", () => {
    const value = modules.address
      .country()
      .getValue({ continent: "Hi" as any });
    const countries = modules.address.constants.countries.map((c) => c.country);
    expect(countries.includes(value)).toBe(true);
  });
});
