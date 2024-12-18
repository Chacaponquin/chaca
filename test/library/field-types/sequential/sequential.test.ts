import { ChacaError, EmptySequentialValuesError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Sequential Field test", () => {
  it("Try create an array sequential field. Should throw an error", () => {
    expect(() =>
      chaca
        .schema({
          test: { type: chaca.sequential([1, 2, 3]), isArray: 20 },
        })
        .array(50),
    ).toThrow(ChacaError);
  });

  it("Try create an possible null sequential field", () => {
    const schema = chaca.schema({
      test: { type: chaca.sequential([1, 2, 3, 4, 5]), possibleNull: 0.7 },
    });

    const data = schema.array(5);

    expect(data.map((d) => d.test).some((v) => v === null)).toBe(true);
  });

  it("Correct define of a schema with sequential field", () => {
    const CORRECT_SEQUENTIAL_DATA = chaca
      .schema({
        favoriteNumber: chaca.sequential([1, 2, 3, 4]),
      })
      .array(4);

    expect(CORRECT_SEQUENTIAL_DATA.length).toBe(4);
    expect(CORRECT_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(CORRECT_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(CORRECT_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(CORRECT_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Correct define of a schema with sequential loop field", () => {
    const DATA = chaca
      .schema({
        favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: true }),
      })
      .array(6);

    expect(DATA.length).toBe(6);
    expect(DATA[0].favoriteNumber).toBe(1);
    expect(DATA[1].favoriteNumber).toBe(2);
    expect(DATA[2].favoriteNumber).toBe(3);
    expect(DATA[3].favoriteNumber).toBe(4);
    expect(DATA[4].favoriteNumber).toBe(1);
    expect(DATA[5].favoriteNumber).toBe(2);
  });

  it("Too much sequential values test", () => {
    const TOO_MUCH_VALUES_SEQUENTIAL_DATA = chaca
      .schema({
        favoriteNumber: chaca.sequential([
          1, 2, 3, 4, 5, 4, 5, 6, 6, 5, 1, 5, 5,
        ]),
      })
      .array(4);

    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA.length).toBe(4);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[0].favoriteNumber).toBe(1);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[1].favoriteNumber).toBe(2);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[2].favoriteNumber).toBe(3);
    expect(TOO_MUCH_VALUES_SEQUENTIAL_DATA[3].favoriteNumber).toBe(4);
  });

  it("Not enought values for the generate data. Should return an error", () => {
    expect(() =>
      chaca.schema({ test: chaca.sequential([1, 2]) }).array(10),
    ).toThrow(EmptySequentialValuesError);
  });

  it("Pass a string as a the sequential values. Should return an error", () => {
    expect(() => {
      chaca
        .schema({
          favoriteNumber: chaca.sequential("" as any),
        })
        .object();
    }).toThrow(EmptySequentialValuesError);
  });

  it("Pass a number as a the sequential values. Should return an error", () => {
    expect(() => {
      chaca
        .schema({
          favoriteNumber: chaca.sequential(5 as any),
        })
        .array(5);
    }).toThrow(EmptySequentialValuesError);
  });

  it("Pass false in config.loop and generate 10 docuements. Should throw an error", () => {
    const NO_LOOP_SEQUENTIAL_SCHEMA = chaca.schema({
      favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: false }),
    });

    expect(() => NO_LOOP_SEQUENTIAL_SCHEMA.array(10)).toThrow(ChacaError);
  });

  it("Pass an empty array as sequential values. Should return an error", () => {
    expect(() => {
      chaca
        .schema({
          favoriteNumber: chaca.sequential([]),
        })
        .array(5);
    }).toThrow(EmptySequentialValuesError);
  });
});
