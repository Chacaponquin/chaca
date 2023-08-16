import { ChacaError, EmptySequentialValuesError, chaca } from "../../../src";
import {
  CORRECT_LOOP_SEQUENTIAL_SCHEMA,
  CORRECT_SEQUENTIAL_SCHEMA,
} from "./schemas/correct_schema";
import {
  FEW_VALUES_SEQUENTIAL_SCHEMA,
  NUMBER_SEQUENTIAL_SCHEMA,
  STRING_SEQUENTIAL_SCHEMA,
} from "./schemas/incorrect_schemas";
import { TOO_MUCH_VALUES_SEQUENTIAL_DATA } from "./schemas/too_much_values_schema";

describe("# Sequential Field test", () => {
  it("Correct define of a schema with sequential field", () => {
    const CORRECT_SEQUENTIAL_DATA = CORRECT_SEQUENTIAL_SCHEMA.generate(4);

    expect(CORRECT_SEQUENTIAL_DATA.length).toBe(4);
    expect(CORRECT_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(CORRECT_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(CORRECT_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(CORRECT_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Correct define of a schema with sequential loop field", () => {
    const DATA = CORRECT_LOOP_SEQUENTIAL_SCHEMA.generate(6);

    expect(DATA.length).toBe(6);
    expect(DATA[0].favoriteNumber).toBe(1);
    expect(DATA[1].favoriteNumber).toBe(2);
    expect(DATA[2].favoriteNumber).toBe(3);
    expect(DATA[3].favoriteNumber).toBe(4);
    expect(DATA[4].favoriteNumber).toBe(1);
    expect(DATA[5].favoriteNumber).toBe(2);
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

  it("Pass false in config.loop and generate 10 docuements. Should throw an error", () => {
    const NO_LOOP_SEQUENTIAL_SCHEMA = chaca.schema({
      favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: false }),
    });

    expect(() => NO_LOOP_SEQUENTIAL_SCHEMA.generate(10)).toThrow(ChacaError);
  });
});
