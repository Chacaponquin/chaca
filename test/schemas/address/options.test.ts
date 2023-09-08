import { schemas } from "../../../src";

describe("# Address schema options test", () => {
  it("Country code", () => {
    const value = schemas.address.countryCode().getValue();
    const codes = schemas.address.constants.countriesCode;

    expect(codes.includes(value)).toBe(true);
  });

  it("Time zone", () => {
    const value = schemas.address.timeZone().getValue();
    const constants = schemas.address.constants.timeZones;

    expect(constants.includes(value)).toBe(true);
  });

  it("Cardinal direction", () => {
    const value = schemas.address.cardinalDirection().getValue();
    const constants = schemas.address.constants.cardinalDirections;

    expect(constants.includes(value)).toBe(true);
  });
});
