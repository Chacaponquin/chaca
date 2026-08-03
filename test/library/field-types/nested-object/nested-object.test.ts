import { chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Nested object field", () => {
  it("define a user nested schema. should return an object with user field as an object", async () => {
    const schema = chaca.schema({
      id: () => modules.id.uuid(),
      user: chaca.schema({
        username: () => modules.internet.username(),
        image: () => modules.image.fashion(),
      }),
    });

    const doc = await schema.object();

    expect(typeof doc.user).toBe("object");
    expect(doc.user).not.toBeNull();
    expect(typeof doc.user.username).toBe("string");
    expect(typeof doc.user.image).toBe("string");
  });

  it("should return an object with a user field with the image field as array of string", async () => {
    const schema = chaca.schema({
      user: chaca.schema({
        username: () => modules.internet.username(),
        images: { type: () => modules.image.fashion(), isArray: 10 },
      }),
    });

    const doc = await schema.object();

    expect(Array.isArray(doc.user.images)).toBe(true);
    expect(doc.user.images).toHaveLength(10);

    for (const image of doc.user.images) {
      expect(typeof image).toBe("string");
    }
  });

  it("define user schema, isArray = 20. should return an object with a user field as an array of objects with image and username property", async () => {
    const schema = chaca.schema({
      user: {
        type: chaca.schema({
          username: () => modules.person.firstName(),
          image: () => modules.image.food(),
        }),
        isArray: 20,
      },
    });

    const doc = await schema.object();

    expect(doc.user).toHaveLength(20);

    for (const user of doc.user) {
      expect(typeof user.username).toBe("string");
      expect(typeof user.image).toBe("string");
    }
  });

  it("nested schema with possibleNull = true. nested field should be null", async () => {
    const schema = chaca.schema({
      user: {
        type: chaca.schema({ username: () => modules.internet.username() }),
        possibleNull: true,
      },
    });

    const doc = await schema.object();

    expect(doc.user).toBeNull();
  });

  it("two levels of nesting. should return the complete nested structure", async () => {
    const schema = chaca.schema({
      user: chaca.schema({
        name: () => "foo",
        address: chaca.schema({
          city: () => "bar",
          country: () => "baz",
        }),
      }),
    });

    const doc = await schema.object();

    expect(doc.user.name).toBe("foo");
    expect(doc.user.address).toEqual({ city: "bar", country: "baz" });
  });
});
