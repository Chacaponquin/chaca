import { Schema, chaca } from "../../../../src";
import { describe, expect, it } from "vitest";

async function valid(schema: Schema, step: number): Promise<boolean> {
  const data = await schema.array(10);

  let valid = true;
  let req = 1;

  for (let i = 0; i < data.length && valid; i++) {
    if (data[i].test !== req) {
      valid = false;
    }

    req += step;
  }

  return valid;
}

describe("# Sequence field step config tests", () => {
  it("Define step = 5", async () => {
    const schema = chaca.schema({ test: chaca.sequence({ step: 5 }) });

    expect(await valid(schema, 5)).toBe(true);
  });

  it("Define step as no number argument. Should set step = 1", async () => {
    const schema = chaca.schema({ test: chaca.sequence({ step: "" as any }) });

    expect(await valid(schema, 1)).toBe(true);
  });

  it("Define step = -1. Values should decrease on each document", async () => {
    const schema = chaca.schema({ test: chaca.sequence({ step: -1 }) });

    const data = await schema.array(4);

    expect(data.map((o) => o.test)).toEqual([1, 0, -1, -2]);
  });
});
