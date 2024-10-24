import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const VALUES_LIMIT = 1000;

describe("date.between", () => {
  const initDate = new Date(2000, 1, 10);
  const finishDate = new Date(2020, 2, 30);

  it("without arguments. should return a date", () => {
    const value = modules.date.between();

    expect(value).instanceOf(Date);
  });

  it("from = initDate & to = finishDate", () => {
    for (let index = 0; index < VALUES_LIMIT; index++) {
      const value = modules.date.between({ from: initDate, to: finishDate });

      expect(value.getTime()).toBeGreaterThanOrEqual(initDate.getTime());
      expect(value.getTime()).toBeLessThanOrEqual(finishDate.getTime());
    }
  });

  it("from = finishDate & to = initDate. should throw an error", () => {
    expect(() => {
      modules.date.between({ from: finishDate, to: initDate });
    }).toThrow(ChacaError);
  });

  it("from = initDate. should return a Date greater than initDate", () => {
    for (let index = 0; index < VALUES_LIMIT; index++) {
      const value = modules.date.between({ from: initDate });

      expect(initDate.getTime()).toBeLessThanOrEqual(value.getTime());
    }
  });

  it("to = finishDate. should return a Date less than finishDate", () => {
    for (let index = 0; index < VALUES_LIMIT; index++) {
      const value = modules.date.between({ to: finishDate });

      expect(value.getTime()).toBeLessThanOrEqual(finishDate.getTime());
    }
  });
});
