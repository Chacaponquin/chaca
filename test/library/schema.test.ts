import { expect } from "chai";
import mocha from "mocha";
import { chaca, schemas } from "../../src";
import { CHDataError } from "../../src/errors/CHDataError";

describe("#Schema Creation Test", () => {
  context("create schema documents", () => {
    context("simple schema", () => {
      const schema = chaca.defineSchema("mySchema079042", {
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
        const schema = chaca.defineSchema("mySchema546jbvu", {
          id: { type: schemas.id.mongodbID(), isArray: 20 },
        });

        const docs = schema.generate(10);
        expect(docs[0]["id"]).length(20);
      });

      context("passing a object as parameter", () => {
        it("passing an empty object. Should return an array with length between 1 and 10", () => {
          const schema = chaca.defineSchema("mySchema546jbvu5425", {
            id: { type: schemas.id.mongodbID(), isArray: {} as any },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length >= 1 && id.length <= 10).to.be.true;
        });

        it("passing only max parameter. Should return an array with length <= max parameter", () => {
          const schema = chaca.defineSchema("mySchema546jbvu542543242", {
            id: { type: schemas.id.mongodbID(), isArray: { max: 2 } },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length <= 2).to.be.true;
        });

        it("passing only min parameter. Should return an array with length >= min parameter", () => {
          const schema = chaca.defineSchema("mySchema546jbvu542543242gk", {
            id: { type: schemas.id.mongodbID(), isArray: { min: 3 } },
          });
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length >= 3).to.be.true;
        });

        it("passing min and max parameters. Should return an array with length betwwen min and max parameters", () => {
          const schema = chaca.defineSchema(
            "mySchema546jbvu542543242gk433635",
            {
              id: {
                type: schemas.id.mongodbID(),
                isArray: { min: 3, max: 10 },
              },
            },
          );
          const docs = schema.generate(10);
          const id = docs[0]["id"] as Array<String>;

          expect(id.length >= 3 && id.length <= 10).to.be.true;
        });
      });
    });

    context("schema with custom field", () => {
      it("custom function return a string", () => {
        const schema = chaca.defineSchema("mySchema4324", {
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
        const schema = chaca.defineSchema("mySchemawhfirhfwo", {
          id: { type: schemas.id.numberRow() },
          custom: {
            custom: () => undefined,
          },
        });

        const docs = schema.generate(10);
        expect(docs[0]["custom"]).be.null;
      });

      it("custom function access to this property", () => {
        const schema = chaca.defineSchema("mySchema08080", {
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
        const schema = chaca.defineSchema("schema23524", {
          id: { enum: array },
        });

        const docs = schema.generate(50);

        expect(Boolean(array.find((el) => el === docs[0]["id"]))).true;
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
        expect(error).to.be.instanceOf(CHDataError);
      }
    });

    it("passing invalid empty schema object. Should throw an error", () => {
      try {
        chaca.defineSchema("buenas", {});
      } catch (error) {
        expect(error).to.be.instanceOf(CHDataError);
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
        expect(error).to.be.instanceOf(CHDataError);
      }
    });

    it("with empty array as argument. Should throw an error", () => {
      try {
        chaca.defineSchema("schema", { id: { enum: [] } });
      } catch (error) {
        expect(error).to.be.instanceOf(CHDataError);
      }
    });
  });
});
