import { chaca, schemas } from "../../../../src";

describe("# Array Field tests", () => {
  it("Pass an empty object. Should return an array with length between 1 and 10", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID(), isArray: {} },
    });
    const docs = schema.generateObject();
    const id = docs["id"] as Array<string>;

    expect(id.length).toBeGreaterThanOrEqual(1);
    expect(id.length).toBeLessThanOrEqual(10);
  });

  it("Pass only max parameter. Should return an array with length <= max parameter", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID(), isArray: { max: 8 } },
    });
    const docs = schema.generateObject();
    const id = docs["id"] as Array<String>;

    expect(id.length).toBeLessThanOrEqual(8);
  });

  it("Pass only min parameter. Should return an array with length >= min parameter", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID(), isArray: { min: 3 } },
    });
    const docs = schema.generateObject();
    const id = docs["id"] as Array<String>;

    expect(id.length).toBeGreaterThanOrEqual(3);
  });

  it("Pass min and max parameters. Should return an array with length betwwen min and max parameters", () => {
    const schema = chaca.schema({
      id: {
        type: schemas.id.mongodbID(),
        isArray: { min: 3, max: 10 },
      },
    });
    const docs = schema.generateObject();
    const id = docs["id"] as Array<String>;

    expect(id.length >= 3 && id.length <= 10).toBe(true);
  });

  it("Pass a number as argument. Should return an array of documents with the id property with that number as length", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID(), isArray: 20 },
    });

    const docs = schema.generateObject();
    expect(docs["id"]).toHaveLength(20);
  });

  it("Pass 0 as argument. Should return an array with 0 elements", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID(), isArray: 0 },
    });

    const doc = schema.generateObject();
    expect(doc.id).toHaveLength(0);
  });
});
