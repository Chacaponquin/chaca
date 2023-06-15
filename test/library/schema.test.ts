import { chaca, schemas } from "../../src";
import { ChacaError } from "../../src/errors/ChacaError";

describe("#Schema Creation Test", () => {
  describe("create own schema fields", () => {
    it("pass empty string as schema name. Should throw an error", () => {
      try {
        const schema = chaca.defineSchemaField<{ lenght: number }>("", (a) => {
          return "a";
        });
      } catch (e) {
        expect(e instanceof ChacaError).toBe(true);
      }
    });

    it("create an schema and use it in creation of data. Should return always 'a'", () => {
      const schema = chaca.defineSchemaField("buenas", (a) => {
        return "a";
      });

      const dataSchema = chaca.defineSchema({
        id: schemas.id.mongodbID(),
        test: schema(),
      });

      expect(dataSchema.generateObject()["test"] === "a").toBe(true);
    });

    it("create an schema with arguments and the function sum the both", () => {
      const schema = chaca.defineSchemaField<{ a: number; b: number }>(
        "buenas",
        (a) => {
          return a.a + a.b;
        },
      );

      const dataSchema = chaca.defineSchema({
        id: schemas.id.mongodbID(),
        test: schema({ a: 5, b: 5 }),
      });

      expect(dataSchema.generateObject()["test"] === 10).toBe(true);
    });
  });

  describe("create schema documents", () => {
    describe("simple schema", () => {
      const schema = chaca.defineSchema({
        id: { type: schemas.id.mongodbID() },
        image: { type: schemas.image.film() },
        name: { type: schemas.person.firstName({ language: "es" }) },
      });

      const doc = schema.generateObject();

      it("should return a define schema object with image, id and name fields", async () => {
        expect(doc).toHaveProperty("id");
        expect(doc).toHaveProperty("image");
        expect(doc).toHaveProperty("name");
      });

      it("generate negative number documents. Should throw an error", () => {
        try {
          const docs = schema.generate(-10);
        } catch (error) {
          expect(error instanceof ChacaError).toBe(true);
        }
      });
    });

    describe("schema with array field", () => {
      it("passing a number as argument. Should return an array of documents with the id property with that number as length", () => {
        const schema = chaca.defineSchema({
          id: { type: schemas.id.mongodbID(), isArray: 20 },
          name: schemas.person.firstName(),
        });

        const docs = schema.generateObject();
        expect(docs["id"].length).toBe(20);
      });

      describe("passing a object as parameter", () => {
        it("passing an empty object. Should return an array with length between 1 and 10", () => {
          const schema = chaca.defineSchema({
            id: { type: schemas.id.mongodbID(), isArray: {} as any },
          });
          const docs = schema.generateObject();
          const id = docs["id"] as Array<string>;

          expect(id.length >= 1 && id.length <= 10).toBe(true);
        });

        it("passing only max parameter. Should return an array with length <= max parameter", () => {
          const schema = chaca.defineSchema({
            id: { type: schemas.id.mongodbID(), isArray: { max: 2 } },
          });
          const docs = schema.generateObject();
          const id = docs["id"] as Array<String>;

          expect(id.length <= 2).toBe(true);
        });

        it("passing only min parameter. Should return an array with length >= min parameter", () => {
          const schema = chaca.defineSchema({
            id: { type: schemas.id.mongodbID(), isArray: { min: 3 } },
          });
          const docs = schema.generateObject();
          const id = docs["id"] as Array<String>;

          expect(id.length >= 3).toBe(true);
        });

        it("passing min and max parameters. Should return an array with length betwwen min and max parameters", () => {
          const schema = chaca.defineSchema({
            id: {
              type: schemas.id.mongodbID(),
              isArray: { min: 3, max: 10 },
            },
          });
          const docs = schema.generateObject();
          const id = docs["id"] as Array<String>;

          expect(id.length >= 3 && id.length <= 10).toBe(true);
        });
      });
    });

    describe("schema with custom field", () => {
      it("custom function return a string", () => {
        const schema = chaca.defineSchema({
          id: { type: schemas.id.mongodbID() },
          custom: {
            type: () => "Buenas",
          },
        });

        const docs = schema.generateObject();
        expect(docs["custom"]).toBe("Buenas");
      });

      it("custom function return undefined. Should return null as value", () => {
        const schema = chaca.defineSchema({
          id: { type: schemas.id.mongodbID() },
          custom: {
            type: () => undefined,
          },
        });

        const docs = schema.generateObject();
        expect(docs["custom"]).toBe(null);
      });

      it("custom function access to this property", () => {
        const schema = chaca.defineSchema({
          id: { type: schemas.id.mongodbID() },
          custom: {
            type({ currentFields: fields }) {
              return fields.id;
            },
          },
        });

        const docs = schema.generateObject();

        expect(docs["custom"] === docs["id"]).toBe(true);
      });

      it("custom function in a nested schema", () => {
        const schema = chaca.defineSchema({
          id: schemas.id.mongodbID(),
          user: chaca.defineSchema({
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

      it("custom function in a nested schema inside an other nested schema", () => {
        const schema2 = chaca.defineSchema({
          id: schemas.id.mongodbID(),
          user: chaca.defineSchema({
            image: schemas.science.unit(),
            custom: ({ currentFields: h }) => h.id,
            followerInf: chaca.defineSchema({
              name: schemas.person.firstName(),
              hola: ({ currentFields: a }) => {
                return a.user.image;
              },
            }),
          }),
        });

        const doc = schema2.generateObject();

        expect(doc["user"]["followerInf"]["hola"]).toBe(doc["user"]["image"]);
      });
    });

    describe("schema with enum field", () => {
      it("with an array [1, 2, 3, 4, 5]. Should return one of this elements", () => {
        const array = [1, 2, 3, 4, 5];
        const schema = chaca.defineSchema({
          id: chaca.enum(array),
        });

        const docs = schema.generateObject();

        expect(array.some((el) => el === docs["id"])).toBe(true);
      });
    });

    describe("schema with object fields", () => {
      it("should return an object with user field as an object", () => {
        type Schema = {
          id: string;
          image: string;
          user: { userName: string; image: string; custom: string };
        };

        const schema = chaca.defineSchema<Schema>({
          id: schemas.id.mongodbID(),
          image: schemas.image.people(),
          user: chaca.defineSchema({
            userName: schemas.internet.userName(),
            image: schemas.image.fashion(),
            custom: (a) => {},
          }),
        });

        const doc = schema.generateObject();

        expect(doc["user"]).toHaveProperty("userName");
        expect(doc["user"]).toHaveProperty("image");
      });

      it("should return an object with a user field with the image field as array of string", () => {
        const schema = chaca.defineSchema({
          id: schemas.id.mongodbID(),
          image: schemas.image.people(),
          user: chaca.defineSchema({
            userName: schemas.internet.userName(),
            images: { type: schemas.image.fashion(), isArray: 10 },
          }),
        });

        const doc = schema.generateObject()["user"];

        expect(doc.images.length).toBe(10);
      });

      it("should return an object with a user field as an array of objects with image and userName property", () => {
        const schema = chaca.defineSchema<{
          user: { userName: string; image: string }[];
          custom: string;
        }>({
          user: {
            type: chaca.defineSchema({
              userName: schemas.person.firstName(),
              image: schemas.image.food(),
            }),
            isArray: 20,
          },
          buenas: schemas.address.country(),
          custom: (a) => {
            return "Hola";
          },
        });

        const doc = schema.generateObject();

        expect(doc["user"].length).toBe(20);
        expect(doc["custom"]).toBe("Hola");
      });
    });
  });

  describe("schema with incorrect arguments", () => {
    it("with empty array as argument. Should throw an error", () => {
      expect(() => {
        chaca.defineSchema({ id: chaca.enum([]) });
      }).toThrowError(ChacaError);
    });
  });
});
