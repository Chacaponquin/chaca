import { ChacaError, EmptySequentialValuesError, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Sequential Field test", () => {
  it("Try create an array sequential field. Should throw an error", async () => {
    const schema = chaca.schema({
      test: { type: chaca.sequential([1, 2, 3]), isArray: 20 },
    });

    await expect(schema.array(50)).rejects.toThrow(ChacaError);
  });

  it("Try create an possible null sequential field", async () => {
    const schema = chaca.schema({
      test: { type: chaca.sequential([1, 2, 3, 4, 5]), possibleNull: 0.7 },
    });

    const data = await schema.array(5);

    expect(data.map((d) => d.test).some((v) => v === null)).toBe(true);
  });

  it("Correct define of a schema with sequential field", async () => {
    const data = await chaca
      .schema({
        favoriteNumber: chaca.sequential([1, 2, 3, 4]),
      })
      .array(4);

    expect(data.map((d) => d.favoriteNumber)).toEqual([1, 2, 3, 4]);
  });

  it("Correct define of a schema with sequential loop field", async () => {
    const data = await chaca
      .schema({
        favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: true }),
      })
      .array(6);

    expect(data.map((d) => d.favoriteNumber)).toEqual([1, 2, 3, 4, 1, 2]);
  });

  it("Loop field with more documents than several full cycles", async () => {
    const data = await chaca
      .schema({
        favoriteNumber: chaca.sequential([1, 2], { loop: true }),
      })
      .array(7);

    expect(data.map((d) => d.favoriteNumber)).toEqual([1, 2, 1, 2, 1, 2, 1]);
  });

  it("Too much sequential values test", async () => {
    const data = await chaca
      .schema({
        favoriteNumber: chaca.sequential([
          1, 2, 3, 4, 5, 4, 5, 6, 6, 5, 1, 5, 5,
        ]),
      })
      .array(4);

    expect(data.map((d) => d.favoriteNumber)).toEqual([1, 2, 3, 4]);
  });

  it("Not enought values for the generate data. Should return an error", async () => {
    const schema = chaca.schema({ test: chaca.sequential([1, 2]) });

    await expect(schema.array(10)).rejects.toThrow(EmptySequentialValuesError);
  });

  it("Pass a string as a the sequential values. Should return an error", async () => {
    const schema = chaca.schema({
      favoriteNumber: chaca.sequential("" as any),
    });

    await expect(schema.object()).rejects.toThrow(EmptySequentialValuesError);
  });

  it("Pass a number as a the sequential values. Should return an error", async () => {
    const schema = chaca.schema({
      favoriteNumber: chaca.sequential(5 as any),
    });

    await expect(schema.array(5)).rejects.toThrow(EmptySequentialValuesError);
  });

  it("Pass false in config.loop and generate 10 docuements. Should throw an error", async () => {
    const schema = chaca.schema({
      favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: false }),
    });

    await expect(schema.array(10)).rejects.toThrow(ChacaError);
  });

  it("Pass an empty array as sequential values. Should return an error", async () => {
    const schema = chaca.schema({
      favoriteNumber: chaca.sequential([]),
    });

    await expect(schema.array(5)).rejects.toThrow(EmptySequentialValuesError);
  });
});
