import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("utils.sumDateRange", () => {
  const base = () => new Date(2020, 0, 15, 10, 30, 20);

  it("range = 'years' & value = 2. should return a date 2 years later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 2,
      range: "years",
    });

    expect(value.getFullYear()).toBe(2022);
    expect(value.getMonth()).toBe(0);
    expect(value.getDate()).toBe(15);
  });

  it("range = 'months' & value = 3. should return a date 3 months later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 3,
      range: "months",
    });

    expect(value.getFullYear()).toBe(2020);
    expect(value.getMonth()).toBe(3);
    expect(value.getDate()).toBe(15);
  });

  it("range = 'days' & value = 20. should return a date 20 days later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 20,
      range: "days",
    });

    expect(value.getFullYear()).toBe(2020);
    expect(value.getMonth()).toBe(1);
    expect(value.getDate()).toBe(4);
  });

  it("range = 'hours' & value = 5. should return a date 5 hours later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 5,
      range: "hours",
    });

    expect(value.getTime()).toBe(base().getTime() + 5 * 3600 * 1000);
  });

  it("range = 'minutes' & value = 45. should return a date 45 minutes later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 45,
      range: "minutes",
    });

    expect(value.getTime()).toBe(base().getTime() + 45 * 60 * 1000);
  });

  it("range = 'seconds' & value = 90. should return a date 90 seconds later", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: 90,
      range: "seconds",
    });

    expect(value.getTime()).toBe(base().getTime() + 90 * 1000);
  });

  it("negative value. should subtract the range", () => {
    const value = chaca.utils.sumDateRange({
      date: base(),
      value: -1,
      range: "years",
    });

    expect(value.getFullYear()).toBe(2019);
  });

  it("should mutate and return the same date instance", () => {
    const date = base();
    const value = chaca.utils.sumDateRange({
      date: date,
      value: 1,
      range: "days",
    });

    expect(value).toBe(date);
  });

  it("invalid range. should throw an error", () => {
    expect(() =>
      chaca.utils.sumDateRange({
        date: base(),
        value: 1,
        range: "weeks" as never,
      }),
    ).toThrow(ChacaError);
  });
});
