import { chaca, PickFieldDefinitionError } from "../../../../src";
import { describe, expect, it } from "vitest";

function expectUniqueSubset(array: unknown[], values: unknown[]) {
  for (const value of array) {
    // every picked element comes from the declared values
    expect(values).toContain(value);
    // no element is picked twice
    expect(array.filter((p) => p === value)).toHaveLength(1);
  }
}

describe("Pick field", () => {
  it("values=[] & count=0. should return an empty array", async () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [], count: 0 }),
    });

    const data = await schema.object();

    expect(data.pick).toHaveLength(0);
  });

  it("values=[1, 2, 3] & count=2. should return a two elements array with unique values from the declared ones", async () => {
    const values = [1, 2, 3];
    const schema = chaca.schema({
      pick: chaca.pick({ values: values, count: 2 }),
    });

    const data = await schema.object();

    expect(data.pick).toHaveLength(2);
    expectUniqueSubset(data.pick, values);
  });

  it("count=-1. should throw an error", async () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2, 3], count: -1 }),
    });

    await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
  });

  it("count=2 & values=[1]. should throw an error", async () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1], count: 2 }),
    });

    await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
  });

  it("values is not an array. should throw an error", async () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: "hello" as any, count: 1 }),
    });

    await expect(schema.object()).rejects.toThrow(PickFieldDefinitionError);
  });

  it("count=2 & values=[1, 2]. should return [1, 2]", async () => {
    const schema = chaca.schema({
      pick: chaca.pick({ values: [1, 2], count: 2 }),
    });

    const data = await schema.object();

    expect(data.pick).toHaveLength(2);
    expect(data.pick[0]).toBe(1);
    expect(data.pick[1]).toBe(2);
  });

  it("values=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] & count=5. should return an 5 different elements array", async () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const schema = chaca.schema({
      pick: chaca.pick({ values: array, count: 5 }),
    });

    const data = await schema.object();

    expect(data.pick).toHaveLength(5);
    expectUniqueSubset(data.pick, array);
  });

  it("generate multiple documents. every document respects count and values", async () => {
    const array = [1, 2, 3, 4, 5];

    const schema = chaca.schema({
      pick: chaca.pick({ values: array, count: 3 }),
    });

    const data = await schema.array(10);

    expect(data).toHaveLength(10);

    for (const doc of data) {
      expect(doc.pick).toHaveLength(3);
      expectUniqueSubset(doc.pick, array);
    }
  });
});
