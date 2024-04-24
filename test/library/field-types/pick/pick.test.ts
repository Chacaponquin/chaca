import { chaca, PickFieldDefinitionError } from "../../../../src";

function unique(array: number[]) {
  for (const value of array) {
    expect(array.filter((p: number) => p === value).length).toBe(1);
  }
}

describe("# Pick Field Tests", () => {
  it("Pass values=[] and count=0. Should return an empty array", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [], count: 0 }),
    });

    const data = schema.generateObject();

    expect(data.pick).toHaveLength(0);
  });

  it("Pass values=[1, 2, 3] and count=2. Should return a two elements array", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2, 3], count: 2 }),
    });

    const data = schema.generateObject();

    expect(data.pick).toHaveLength(2);
    unique(data.pick);
  });

  it("Pass count=-1. Should throw an error", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2, 3], count: -1 }),
    });

    expect(() => schema.generateObject()).toThrow(PickFieldDefinitionError);
  });

  it("Pass count=2 and values=[1]. Should throw an error", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1], count: 2 }),
    });

    expect(() => schema.generateObject()).toThrow(PickFieldDefinitionError);
  });

  it("Pass count=2 and values=[1, 2]. Should return [1, 2]", () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2], count: 2 }),
    });

    const data = schema.generateObject();

    expect(data.pick).toHaveLength(2);
    expect(data.pick[0]).toBe(1);
    expect(data.pick[1]).toBe(2);
  });

  it("Pass values=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and count=5. Should return an 5 different elements array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const schema = chaca.schema({
      pick: chaca.pick({ values: array, count: 5 }),
    });

    const data = schema.generateObject();

    expect(data.pick).toHaveLength(5);
    unique(data.pick);
  });
});
