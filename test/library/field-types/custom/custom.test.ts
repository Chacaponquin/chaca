import { chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Custom field", () => {
  it("Custom function return a string", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      custom: {
        type: () => "Foo",
      },
    });

    const docs = await schema.object();
    expect(docs.custom).toBe("Foo");
  });

  it("Async custom function. should resolve and use the awaited value", async () => {
    const schema = chaca.schema({
      custom: () => Promise.resolve("async-value"),
    });

    const doc = await schema.object();

    expect(doc.custom).toBe("async-value");
  });

  it("Custom function receives currentFields and store arguments", async () => {
    let receivedArgs: any = null;

    const schema = chaca.schema({
      a: () => 5,
      b: (args) => {
        receivedArgs = args;
        return "bar";
      },
    });

    const doc = await schema.object();

    expect(doc.b).toBe("bar");
    expect(receivedArgs).not.toBeNull();
    expect(receivedArgs.currentFields).toEqual({ a: 5 });
    expect(receivedArgs.store).toBeDefined();
  });

  describe("null and undefined return values", () => {
    it("Custom function returns null. document field should be null", async () => {
      const schema = chaca.schema({
        custom: () => null,
      });

      const doc = await schema.object();

      expect(doc).toHaveProperty("custom");
      expect(doc.custom).toBeNull();
    });

    it("Custom function returns undefined. document keeps the property with undefined value", async () => {
      const schema = chaca.schema({
        custom: () => undefined,
      });

      const doc = await schema.object();

      expect(Object.keys(doc)).toContain("custom");
      expect(doc.custom).toBeUndefined();
    });
  });

  describe("custom function access to object properties", () => {
    it("custom function trying to access a parent object property", async () => {
      const schema = chaca.schema({
        id: { type: () => modules.id.uuid() },
        custom: {
          type({ currentFields: fields }) {
            return fields.id;
          },
        },
      });

      const docs = await schema.object();

      expect(docs.custom).toBe(docs.id);
    });

    it("custom field depending on a sibling field. values stay consistent across all documents", async () => {
      const schema = chaca.schema({
        a: chaca.sequence(),
        b: ({ currentFields }) => currentFields.a * 2,
      });

      const docs = await schema.array(30);

      expect(docs).toHaveLength(30);

      docs.forEach((doc, index) => {
        expect(doc.a).toBe(index + 1);
        expect(doc.b).toBe(doc.a * 2);
      });
    });

    it("custon function on a nested schema trying to access own object property", async () => {
      const schema = chaca.schema({
        object: chaca.schema({
          id: () => "foo",
          custom: ({ currentFields }) => {
            return currentFields.object.id;
          },
        }),
      });

      const docs = await schema.object();

      expect(docs.object.custom).toBe("foo");
    });
  });

  it("Custom function in a nested schema", async () => {
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

    const doc = await schema.object();

    expect(doc.user.followersInf).toHaveLength(20);

    for (const value of doc.user.followersInf) {
      expect(value).toBe(doc.id);
    }
  });

  it("Custom function in a nested schema inside an other nested schema", async () => {
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

    const doc = await schema.object();

    expect(doc.user.followerInf.foo).toBe(doc.user.image);
  });
});
