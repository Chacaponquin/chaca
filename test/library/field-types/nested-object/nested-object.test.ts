import { chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Nested object field", () => {
  it("define a user nested schema. should return an object with user field as an object", () => {
    const schema = chaca.schema({
      id: () => modules.id.uuid(),
      user: chaca.schema({
        username: () => modules.internet.username(),
        image: () => modules.image.fashion(),
      }),
    });

    const doc = schema.object();

    expect(doc.user).toHaveProperty("username");
    expect(doc.user).toHaveProperty("image");
  });

  it("should return an object with a user field with the image field as array of string", () => {
    const schema = chaca.schema({
      user: chaca.schema({
        username: () => modules.internet.username(),
        images: { type: () => modules.image.fashion(), isArray: 10 },
      }),
    });

    const doc = schema.object();

    expect(doc.user.images.length).toBe(10);
  });

  it("define user schema, isArray = 10. should return an object with a user field as an array of objects with image and username property", () => {
    const schema = chaca.schema({
      user: {
        type: chaca.schema({
          username: () => modules.person.firstName(),
          image: () => modules.image.food(),
        }),
        isArray: 20,
      },
    });

    const doc = schema.object();

    expect(doc.user.length).toBe(20);

    for (const user of doc.user) {
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("image");
    }
  });
});
