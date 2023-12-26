import { chaca, schemas } from "../../../../src";

describe("# Nested Object field tests", () => {
  it("Should return an object with user field as an object", () => {
    const schema = chaca.schema({
      id: schemas.id.mongodbID(),
      image: schemas.image.people(),
      user: chaca.schema({
        username: schemas.internet.username(),
        image: schemas.image.fashion(),
      }),
    });

    const doc = schema.generateObject();

    expect(doc.user).toHaveProperty("username");
    expect(doc.user).toHaveProperty("image");
  });

  it("Should return an object with a user field with the image field as array of string", () => {
    const schema = chaca.schema({
      user: chaca.schema({
        username: schemas.internet.username(),
        images: { type: schemas.image.fashion(), isArray: 10 },
      }),
    });

    const doc = schema.generateObject();

    expect(doc.user.images.length).toBe(10);
  });

  it("Should return an object with a user field as an array of objects with image and username property", () => {
    const schema = chaca.schema({
      user: {
        type: chaca.schema({
          username: schemas.person.firstName(),
          image: schemas.image.food(),
        }),
        isArray: 20,
      },
    });

    const doc = schema.generateObject();

    expect(doc.user.length).toBe(20);
  });
});
