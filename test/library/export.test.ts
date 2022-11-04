import { expect } from "chai";
import mocha from "mocha";
import { schemas, chaca } from "../../src";
import { CHDataError } from "../../src/errors/CHDataError";

const schema = chaca.defineSchema("mySchemavdava", {
  id: { type: schemas.id.mongodbID() },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const schemaWithArray = chaca.defineSchema("mySchema", {
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const root = "./data";

describe("#Export Test", () => {
  context("create and export one object", () => {
    context("current export file", async () => {
      it("no file name. Should throw an error", async () => {
        try {
          await schema.generateAndExport(1, {
            fileName: "",
            format: "json",
            location: root,
          });
        } catch (error) {
          expect(error).to.be.instanceOf(CHDataError);
        }
      });

      it("incorrect format file. Should throw an error", async () => {
        try {
          await schema.generateAndExport(1, {
            fileName: "quetal",
            format: "buenas" as any,
            location: root,
          });
        } catch (error) {
          expect(error).to.be.instanceOf(CHDataError);
        }
      });
    });

    context("Export in a JSON File", async () => {
      it("export in a JSON File (correct)", async () => {
        await schema.generateAndExport(1, {
          fileName: "WASAAA",
          format: "json",
          location: root,
        });
      });
    });

    context("Export in a Javascript File", async () => {
      it("export a single object", async () => {
        await schema.generateAndExport(1, {
          fileName: "Js",
          format: "javascript",
          location: root,
        });
      });

      it("export multiple documents", async () => {
        await schema.generateAndExport(20, {
          fileName: "Js24242",
          format: "javascript",
          location: root,
        });
      });

      it("export an object with array values", async () => {
        await schemaWithArray.generateAndExport(10, {
          fileName: "vrer",
          location: root,
          format: "javascript",
        });
      });
    });

    context("Export in a CSV File", async () => {
      it("export a single object in a CSV File", async () => {
        await schema.generateAndExport(1, {
          fileName: "CSV",
          format: "csv",
          location: root,
        });
      });

      it("export multiple documents in a CSV File", async () => {
        await schema.generateAndExport(10, {
          fileName: "CSVm",
          format: "csv",
          location: root,
        });
      });
    });

    context("Export in a Java File", async () => {
      it("export a single object", async () => {
        await schema.generateAndExport(1, {
          location: root,
          fileName: "buenas",
          format: "java",
        });
      });

      it("export multiple documents", async () => {
        await schema.generateAndExport(20, {
          location: root,
          fileName: "buenas2542526",
          format: "java",
        });
      });

      it("export an object with array values", async () => {
        await schemaWithArray.generateAndExport(20, {
          location: root,
          fileName: "buenas25425262342",
          format: "java",
        });
      });
    });

    context("Export in Typescript File", async () => {
      it("export a single object", async () => {
        await schema.generateAndExport(1, {
          fileName: "type29479",
          location: root,
          format: "typescript",
        });
      });

      it("export multiple documents", async () => {
        await schema.generateAndExport(20, {
          location: root,
          fileName: "type2947984038",
          format: "typescript",
        });
      });

      it("export an object with array values", async () => {
        await schemaWithArray.generateAndExport(20, {
          location: root,
          fileName: "type29Array",
          format: "typescript",
        });
      });
    });
  });

  context("create and export an object with nested objects", () => {
    const schema = new chaca.Schema({
      id: schemas.id.mongodbID(),
      image: schemas.image.people(),
      user: new chaca.Schema({
        userName: schemas.internet.userName(),
        image: schemas.image.fashion(),
      }),
    });

    context("JSON File", () => {
      it("should return an array with objects with the key user as object with property firstName and image", async () => {
        await schema.generateAndExport(20, {
          fileName: "632864289",
          location: root,
          format: "json",
        });
      });
    });
  });
});
