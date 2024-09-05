import { modules } from "../../../src";

describe("# Address schema options test", () => {
  it("Country code", () => {
    const value = modules.address.countryCode();
    const codes = modules.address.constants.countriesCode;

    expect(codes.includes(value)).toBe(true);
  });

  it("Time zone", () => {
    const value = modules.address.timeZone();
    const constants = modules.address.constants.timeZones;

    expect(constants.includes(value)).toBe(true);
  });

  it("Cardinal direction", () => {
    const value = modules.address.cardinalDirection();
    const constants = modules.address.constants.cardinalDirections;

    expect(constants.includes(value)).toBe(true);
  });
});
