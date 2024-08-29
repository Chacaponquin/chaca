import { modules } from "../../../src";

describe("# Address schema options test", () => {
  it("Country code", () => {
    const value = modules.address.countryCode().getValue();
    const codes = modules.address.constants.countriesCode;

    expect(codes.includes(value)).toBe(true);
  });

  it("Time zone", () => {
    const value = modules.address.timeZone().getValue();
    const constants = modules.address.constants.timeZones;

    expect(constants.includes(value)).toBe(true);
  });

  it("Cardinal direction", () => {
    const value = modules.address.cardinalDirection().getValue();
    const constants = modules.address.constants.cardinalDirections;

    expect(constants.includes(value)).toBe(true);
  });
});
