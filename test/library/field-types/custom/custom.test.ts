import { chaca, schemas } from "../../../../src";

describe("# Custom field tests", () => {
  it("Custom function return a string", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID() },
      custom: {
        type: () => "Foo",
      },
    });

    const docs = schema.generateObject();
    expect(docs["custom"]).toBe("Foo");
  });

  it("Custom function return undefined. Should return null as value", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID() },
      custom: {
        type: () => undefined,
      },
    });

    const docs = schema.generateObject();
    expect(docs["custom"]).toBe(null);
  });

  it("Custom function access to this property", () => {
    const schema = chaca.schema({
      id: { type: schemas.id.mongodbID() },
      custom: {
        type({ currentFields: fields }) {
          return fields.id;
        },
      },
    });

    const docs = schema.generateObject();

    expect(docs["custom"]).toBe(docs["id"]);
  });

  it("Custom function in a nested schema", () => {
    const schema = chaca.schema({
      id: schemas.id.mongodbID(),
      user: chaca.schema({
        image: schemas.science.unit(),
        followersInf: {
          type: ({ currentFields: a }) => {
            return a.id;
          },
          isArray: 20,
        },
      }),
    });

    const doc = schema.generateObject();

    expect(doc["user"]["followersInf"][0]).toBe(doc["id"]);
  });

  it("Custom function in a nested schema inside an other nested schema", () => {
    const schema = chaca.schema({
      id: schemas.id.mongodbID(),
      user: chaca.schema({
        image: schemas.science.unit(),
        custom: ({ currentFields: h }) => h.id,
        followerInf: chaca.schema({
          name: schemas.person.firstName(),
          hola: ({ currentFields }) => {
            return currentFields.user.image;
          },
        }),
      }),
    });

    const doc = schema.generateObject();

    expect(doc["user"]["followerInf"]["hola"]).toBe(doc["user"]["image"]);
  });
});
