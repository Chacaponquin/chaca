import { chaca, modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Array field tests", () => {
  it("Pass an empty object. Should return an array with length between 0 and 10", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.mongodbId(), isArray: {} },
    });
    const docs = schema.object();
    const id = docs.id;

    expect(id.length).toBeGreaterThanOrEqual(0);
    expect(id.length).toBeLessThanOrEqual(10);
  });

  it("Pass only max parameter. Should return an array with length <= max parameter", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.mongodbId(), isArray: { max: 8 } },
    });
    const docs = schema.object();
    const id = docs.id;

    expect(id.length).toBeLessThanOrEqual(8);
  });

  it("Pass only min parameter. Should return an array with length >= min parameter", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: { min: 3 } },
    });
    const docs = schema.object();
    const id = docs["id"];

    expect(id.length).toBeGreaterThanOrEqual(3);
  });

  it("Pass min and max parameters. Should return an array with length betwwen min and max parameters", () => {
    const schema = chaca.schema({
      id: {
        type: () => modules.id.uuid(),
        isArray: { min: 3, max: 10 },
      },
    });
    const docs = schema.object();
    const id = docs.id;

    expect(id.length >= 3 && id.length <= 10).toBe(true);
  });

  it("Pass 20 as argument. Should return an array of documents with the id property with 20 values", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: 20 },
    });

    const doc = schema.object();
    expect(doc.id).toHaveLength(20);
  });

  it("Pass 0 as argument. Should return an array with 0 elements", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid(), isArray: 0 },
    });

    const doc = schema.object();
    expect(doc.id).toHaveLength(0);
  });
});
