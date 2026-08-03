import { describe, expect, it } from "vitest";
import { chaca, modules } from "../../../src";

describe("possibleNull and isArray interaction", () => {
  it("possibleNull = true & isArray = 10. the whole field should be null, not an array of nulls", async () => {
    const schema = chaca.schema({
      values: {
        type: () => modules.id.uuid(),
        possibleNull: true,
        isArray: 10,
      },
    });

    const doc = await schema.object();

    expect(doc.values).toBeNull();
  });

  it("possibleNull = false & isArray = 10. should return an array with 10 elements", async () => {
    const schema = chaca.schema({
      values: {
        type: () => modules.id.uuid(),
        possibleNull: false,
        isArray: 10,
      },
    });

    const doc = await schema.object();

    expect(doc.values).toHaveLength(10);
  });
});
