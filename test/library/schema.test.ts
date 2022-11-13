import { expect } from "chai";
import mocha from "mocha";
import { chaca, schemas } from "../../src";
import { ChacaError } from "../../src/errors/ChacaError";

describe("#Schema Creation Test", () => {
  context("create own schema fields", () => {
    it("pass empty string as schema name. Should throw an error", () => {
      try {
        const schema = chaca.defineSchemaField<{ lenght: number }>("", (a) => {
          return "a";
        });
      } catch (e) {
        expect(e).to.be.instanceOf(ChacaError);
      }
    });

    it("create an schema and use it in creation of data. Should return always 'a'", () => {
      const schema = chaca.defineSchemaField("buenas", (a) => {
        return "a";
      });

      const dataSchema = new chaca.Schema({
        id: schemas.id.numberRow(),
        test: schema(),
      });

      expect(dataSchema.generate(10)[5]["test"] === "a").to.be.true;
    });
  });

  context("create schema documents", () => {
    context("simple schema", () => {
      const schema = new chaca.Schema({
        id: { type: schemas.id.mongodbID() },
        image: { type: schemas.image.film() },
        name: { type: schemas.person.firstName({ language: "es" }) },
      });

      const doc = schema.generate(1)[0];

      it("should return a define schema object with image, id and name fields", async () => {
        expect(doc).to.have.keys(["id", "image", "name"]);
      });

      it("generate negative number documents. Should generate 10 documents by default", () => {
        const docs = schema.generate(-10);
        expect(docs).length(10);
      });
    });

    context("schema with array field", () => {
      it("passing a number as argument. Should return an array of documents with the id property with that number as length", () => {
        const schema = new chaca.Schema({
          id: { type: schemas.id.mongodbID(), isArray: 20 },
        });

        const docs = schema.generate(10);
        expect(docs[0]["id"]).length(20);
      });

      context("passing a object as parameter", () => {
        it("passing an empty object. Should return an array with length between 1 and 10", () => {
          const schema = new chaca.Schema({
            id: { type: schemas.id.mongodbID(), isArray: {} as any },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<string>;

          expect(id.length >= 1 && id.length <= 10).to.be.true;
        });

        it("passing only max parameter. Should return an array with length <= max parameter", () => {
          const schema = new chaca.Schema({
            id: { type: schemas.id.mongodbID(), isArray: { max: 2 } },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length <= 2).to.be.true;
        });

        it("passing only min parameter. Should return an array with length >= min parameter", () => {
          const schema = new chaca.Schema({
            id: { type: schemas.id.mongodbID(), isArray: { min: 3 } },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length >= 3).to.be.true;
        });

        it("passing min and max parameters. Should return an array with length betwwen min and max parameters", () => {
          const schema = new chaca.Schema({
            id: {
              type: schemas.id.mongodbID(),
              isArray: { min: 3, max: 10 },
            },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length >= 3 && id.length <= 10).to.be.true;
        });
      });
    });

    context("schema with custom field", () => {
      it("custom function return a string", () => {
        const schema = new chaca.Schema({
          id: { type: schemas.id.numberRow() },
          custom: {
            custom: () => {
              return "Buenas";
            },
          },
        });

        const docs = schema.generate(10);
        expect(docs[0]["custom"]).to.be.string("Buenas");
      });

      it("custom function return undefined. Should return null as value", () => {
        const schema = new chaca.Schema({
          id: { type: schemas.id.numberRow() },
          custom: {
            custom: () => undefined,
          },
        });

        const docs = schema.generate(10);
        expect(docs[0]["custom"]).be.null;
      });

      it("custom function access to this property", () => {
        const schema = new chaca.Schema({
          id: { type: schemas.id.numberRow() },
          custom: {
            custom(fields) {
              return fields.id;
            },
          },
        });

        const docs = schema.generate(10);
        expect(docs[0]["custom"]).equal(docs[0]["id"]);
      });
    });

    context("schema with enum field", () => {
      it("with an array [1, 2, 3, 4, 5]. Should return one of this elements", () => {
        const array = [1, 2, 3, 4, 5];
        const schema = new chaca.Schema({
          id: { enum: array },
        });

        const docs = schema.generate(50);

        expect(Boolean(array.find((el) => el === docs[0]["id"]))).true;
      });
    });

    context("schema with object fields", () => {
      it("should return an object with user field as an object", () => {
        const schema = new chaca.Schema({
          id: schemas.id.mongodbID(),
          image: schemas.image.people(),
          user: new chaca.Schema({
            userName: schemas.internet.userName(),
            image: schemas.image.fashion(),
          }),
        });

        const doc = schema.generate(2)[0];

        expect(doc["user"]).to.be.keys(["userName", "image"]);
      });

      it("should return an object with a user field with the image field as array of string", () => {
        const schema = new chaca.Schema({
          id: schemas.id.mongodbID(),
          image: schemas.image.people(),
          user: new chaca.Schema<{ userName: string; images: string }>({
            userName: schemas.internet.userName(),
            images: { type: schemas.image.fashion(), isArray: 10 },
          }),
        });

        const doc = schema.generate(5)[0]["user"];

        expect(schema.generate(5)[0]["user"].images.length === 10).to.be.true;
      });

      it("should return an object with a user field as an array of objects with image and userName property", () => {
        const schema = new chaca.Schema<{
          user: { userName: string; image: string }[];
          custom: string;
        }>({
          user: {
            type: new chaca.Schema({
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

        const doc = schema.generate(5)[0];

        expect(doc["user"].length === 20).to.be.true;
      });
    });
  });

  context("schema with incorrect arguments", () => {
    it("without schema name. Should throw an error", () => {
      try {
        chaca.defineSchema("", {
          id: { type: schemas.id.mongodbID() },
        });
      } catch (error) {
        expect(error).to.be.instanceOf(ChacaError);
      }
    });

    it("passing invalid empty schema object. Should throw an error", () => {
      try {
        chaca.defineSchema("buenas", {});
      } catch (error) {
        expect(error).to.be.instanceOf(ChacaError);
      }
    });

    it("schema object with custom and type property", () => {
      try {
        chaca.defineSchema("buenasdaadvadv", {
          id: {
            type: schemas.id.mongodbID(),
            custom: () => {
              return "";
            },
          },
        });
      } catch (error) {
        expect(error).to.be.instanceOf(ChacaError);
      }
    });

    it("with empty array as argument. Should throw an error", () => {
      try {
        chaca.defineSchema("schema", { id: { enum: [] } });
      } catch (error) {
        expect(error).to.be.instanceOf(ChacaError);
      }
    });
  });
});
