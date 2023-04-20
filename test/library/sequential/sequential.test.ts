import { EmptySequentialValuesError } from "../../../src";
import { CORRECT_SEQUENTIAL_DATA } from "./schemas/correctSchema";
import { FEW_VALUES_SEQUENTIAL_SCHEMA } from "./schemas/incorrectSchemas";

describe("# Sequential Field test", () => {
  it("Correct define of a schema with sequential field", () => {
    expect(CORRECT_SEQUENTIAL_DATA.length).toBe(4);
    expect(CORRECT_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(CORRECT_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(CORRECT_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(CORRECT_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Not enought values for the generate data. Should return an error", () => {
    expect(FEW_VALUES_SEQUENTIAL_SCHEMA.generate(10)).toThrow(
      EmptySequentialValuesError,
    );
  });
});
