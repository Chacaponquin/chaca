import { ChacaError, EmptySequentialValuesError } from "../../../src";
import { CORRECT_SEQUENTIAL_DATA } from "./schemas/correct_schema";
import {
  FEW_VALUES_SEQUENTIAL_SCHEMA,
  NUMBER_SEQUENTIAL_SCHEMA,
  STRING_SEQUENTIAL_SCHEMA,
} from "./schemas/incorrect_schemas";
import { TOO_MUCH_VALUES_SEQUENTIAL_DATA } from "./schemas/too_much_values_schema";

describe("# Sequential Field test", () => {
  it("Correct define of a schema with sequential field", () => {
    expect(CORRECT_SEQUENTIAL_DATA.length).toBe(4);
    expect(CORRECT_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(CORRECT_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(CORRECT_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(CORRECT_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Too much sequential values test", () => {
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA.length).toBe(4);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Not enought values for the generate data. Should return an error", () => {
    expect(() => FEW_VALUES_SEQUENTIAL_SCHEMA.generate(10)).toThrowError(
      EmptySequentialValuesError,
    );
  });

  it("Pass a string as a the sequential values. Should return an error", () => {
    expect(STRING_SEQUENTIAL_SCHEMA).toThrowError(ChacaError);
  });

  it("Pass a number as a the sequential values. Should return an error", () => {
    expect(NUMBER_SEQUENTIAL_SCHEMA).toThrowError(ChacaError);
  });
});
