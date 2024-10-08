import { chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Nested Object field tests", () => {
  it("Should return an object with user field as an object", () => {
    const schema = chaca.schema({
      id: () => modules.id.uuid(),
      image: () => modules.image.people(),
      user: chaca.schema({
        username: () => modules.internet.username(),
        image: () => modules.image.fashion(),
      }),
    });

    const doc = schema.object();

    expect(doc.user).toHaveProperty("username");
    expect(doc.user).toHaveProperty("image");
  });

  it("Should return an object with a user field with the image field as array of string", () => {
    const schema = chaca.schema({
      user: chaca.schema({
        username: () => modules.internet.username(),
        images: { type: () => modules.image.fashion(), isArray: 10 },
      }),
    });

    const doc = schema.object();

    expect(doc.user.images.length).toBe(10);
  });

  it("Should return an object with a user field as an array of objects with image and username property", () => {
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
  });
});
