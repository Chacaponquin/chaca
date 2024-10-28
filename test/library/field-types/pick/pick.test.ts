import { chaca, PickFieldDefinitionError } from "../../../../src";
import { describe, expect, it } from "vitest";

function unique(array: number[]) {
  for (const value of array) {
    expect(array.filter((p: number) => p === value).length).toBe(1);
  }
}

describe("Pick field", () => {
  it("values=[] & count=0. should return an empty array", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [], count: 0 }),
    });

    const data = schema.object();

    expect(data.pick).toHaveLength(0);
  });

  it("values=[1, 2, 3] & count=2. should return a two elements array", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2, 3], count: 2 }),
    });

    const data = schema.object();

    expect(data.pick).toHaveLength(2);
    unique(data.pick);
  });

  it("count=-1. should throw an error", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2, 3], count: -1 }),
    });

    expect(() => schema.object()).toThrow(PickFieldDefinitionError);
  });

  it("count=2 & values=[1]. should throw an error", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1], count: 2 }),
    });

    expect(() => schema.object()).toThrow(PickFieldDefinitionError);
  });

  it("count=2 & values=[1, 2]. should return [1, 2]", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2], count: 2 }),
    });

    const data = schema.object();

    expect(data.pick).toHaveLength(2);
    expect(data.pick[0]).toBe(1);
    expect(data.pick[1]).toBe(2);
  });

  it("values=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] & count=5. should return an 5 different elements array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const schema = chaca.schema({
      pick: chaca.pick({ values: array, count: 5 }),
    });

    const data = schema.object();

    expect(data.pick).toHaveLength(5);
    unique(data.pick);
  });
});
