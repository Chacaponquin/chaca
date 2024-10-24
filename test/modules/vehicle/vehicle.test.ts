import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("vehicle modules", () => {
  it("vehicle.bicycle", () => {
    const value = modules.vehicle.bicycle();
    expect(modules.vehicle.constants.bicycles).include(value);
  });

  it("vehicle.manufacturer", () => {
    const value = modules.vehicle.manufacturer();
    expect(modules.vehicle.constants.manufacturers).include(value);
  });

  it("vehicle.model", () => {
    const value = modules.vehicle.model();
    expect(modules.vehicle.constants.models).include(value);
  });

  it("vehicle.type", () => {
    const value = modules.vehicle.type();
    expect(modules.vehicle.constants.vehicleTypes).include(value);
  });

  it("vehicle.fuel", () => {
    const value = modules.vehicle.fuel();
    expect(modules.vehicle.constants.fuels).include(value);
  });
});
