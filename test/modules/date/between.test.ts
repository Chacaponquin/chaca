import { ChacaError, modules } from "../../../src";
import { describe, expect, it } from "vitest";

const TEST_COUNT_VALUES = 1000;

describe("# Date between test", () => {
  const initDate = new Date(2000, 1, 10);
  const finishDate = new Date(2020, 2, 30);

  it("With two logical dates", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.between({ from: initDate, to: finishDate }),
    );

    expect(
      allDates.every(
        (d) =>
          initDate.getTime() <= d.getTime() &&
          d.getTime() <= finishDate.getTime(),
      ),
    ).toBe(true);
  });

  it("Init date greater than from date. Should throw an error", () => {
    expect(() => {
      modules.date.between({ from: finishDate, to: initDate });
    }).toThrow(ChacaError);
  });

  it("Pass only from date", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.between({ from: initDate }),
    );

    expect(allDates.every((d) => initDate.getTime() <= d.getTime())).toBe(true);
  });

  it("Pass only to date", () => {
    const allDates = Array.from({ length: TEST_COUNT_VALUES }).map((v) =>
      modules.date.between({ to: initDate }),
    );

    expect(allDates.every((d) => d.getTime() <= finishDate.getTime())).toBe(
      true,
    );
  });
});
