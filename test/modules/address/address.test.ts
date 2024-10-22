import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Address module test", () => {
  it("address.countryCode", () => {
    const value = modules.address.countryCode();
    const codes = modules.address.constants.countriesCode;

    expect(codes.includes(value)).toBe(true);
  });

  it("address.timeZone", () => {
    const value = modules.address.timeZone();
    const constants = modules.address.constants.timeZones;

    expect(constants.includes(value)).toBe(true);
  });

  it("address.cardinalDirection", () => {
    const value = modules.address.cardinalDirection();
    const constants = modules.address.constants.cardinalDirections;

    expect(constants.includes(value)).toBe(true);
  });

  describe("address.zipCode tests", () => {
    it("no arguments. should return a code with 5 numbers", () => {
      const value = modules.address.zipCode();

      expect(value).toHaveLength(5);
    });

    it("format = ###. should return a code with 3 numbers", () => {
      const value = modules.address.zipCode({ format: "###" });
      expect(value).toHaveLength(3);
    });
  });

  it("address.countryCode", () => {
    const value = modules.address.countryCode();

    expect(modules.address.constants.countriesCode.includes(value)).toBe(true);
  });

  it("address.ordinalDirection", () => {
    const value = modules.address.ordinalDirection();

    expect(modules.address.constants.ordinalDirection.includes(value)).toBe(
      true,
    );
  });

  describe("address.country tests", () => {
    it("no params. should return any country", () => {
      const value = modules.address.country();
      const countries = modules.address.constants.countries.map(
        (c) => c.country,
      );
      expect(countries.includes(value)).toBe(true);
    });

    it("continent = 'Europe'. should return a europe country", () => {
      const value = modules.address.country({ continent: "Europe" });
      const countries = modules.address.constants.countries
        .filter((c) => c.continent === "Europe")
        .map((c) => c.country);
      expect(countries.includes(value)).toBe(true);
    });

    it("country = no valid country. should return any country", () => {
      const value = modules.address.country({ continent: "hi" as any });
      const countries = modules.address.constants.countries.map(
        (c) => c.country,
      );
      expect(countries.includes(value)).toBe(true);
    });
  });
});
