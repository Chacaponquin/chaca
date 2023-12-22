import { ChacaError, chaca } from "../../../../src";

describe("# Probability Field Tests", () => {
  it("Create a schema with a probability field without values. Should throw an error", () => {
    const schema = chaca.schema({
      prob: chaca.probability([]),
    });

    expect(() => schema.generate(10)).toThrow(ChacaError);
  });

  it("Create a schema with a probability field with 3 elements", () => {
    const schema = chaca.schema({
      prob: chaca.probability([
        { chance: 0.8, value: 10 },
        { chance: 0.1, value: 5 },
        { chance: 0.1, value: 1 },
      ]),
    });

    const data = schema.generate(50);

    let count = 0;
    for (const dat of data) {
      if (dat.prob === 10) {
        count++;
      }
    }

    expect(count).toBeGreaterThanOrEqual(30);
  });
});
