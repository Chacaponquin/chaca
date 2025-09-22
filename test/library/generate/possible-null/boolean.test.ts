import { describe, expect, it } from "vitest";
import { countNulls } from "./core/count-nulls";
import { chaca, modules } from "../../../../src";

describe("Possible null boolean definition", () => {
  it("true. always return null", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: true },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(50);
  });

  it("false. never return false", async () => {
    const schema = chaca.schema({
      null: { type: () => modules.color.cmyk(), possibleNull: false },
    });

    const data = await schema.array(50);

    expect(countNulls(data)).toBe(0);
  });
});
