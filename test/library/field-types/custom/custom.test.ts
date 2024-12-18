import { chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Custom field", () => {
  it("Custom function return a string", () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      custom: {
        type: () => "Foo",
      },
    });

    const docs = schema.object();
    expect(docs.custom).toBe("Foo");
  });

  describe("custom function access to object properties", () => {
    it("custom function trying to access a parent object property", () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid() },
        custom: {
          type({ currentFields: fields }) {
            return fields.id;
          },
        },
      });

      const docs = schema.object();

      expect(docs.custom).toBe(docs.id);
    });

    it("custon function on a nested schema trying to access own object property", () => {
      const schema = chaca.schema({
        object: chaca.schema({
          id: () => "foo",
          custom: ({ currentFields }) => {
            return currentFields.object.id;
          },
        }),
      });

      const docs = schema.object();

      expect(docs.object.custom).toBe("foo");
    });
  });

  it("Custom function in a nested schema", () => {
    const schema = chaca.schema({
      id: () => modules.id.uuid(),
      user: chaca.schema({
        image: () => modules.image.people(),
        followersInf: {
          type: ({ currentFields: a }) => {
            return a.id;
          },
          isArray: 20,
        },
      }),
    });

    const doc = schema.object();

    expect(doc.user.followersInf[0]).toBe(doc.id);
  });

  it("Custom function in a nested schema inside an other nested schema", () => {
    const schema = chaca.schema({
      user: chaca.schema({
        image: () => modules.image.people(),
        followerInf: chaca.schema({
          name: () => modules.person.firstName(),
          foo: ({ currentFields }) => {
            return currentFields.user.image;
          },
        }),
      }),
    });

    const doc = schema.object();

    expect(doc.user.followerInf.foo).toBe(doc.user.image);
  });
});
