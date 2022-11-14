import { schemas, chaca } from "../../lib/cjs/index.js";
import { ChacaError } from "../../src/errors/ChacaError";

const schema = new chaca.Schema({
  id: { type: schemas.id.mongodbID() },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const schemaWithArray = new chaca.Schema<{
  id: string;
  image: string;
  name: string;
}>({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const root = "./data";

describe("#Export Test", () => {
  describe("export a complete schema in all formats", () => {
    type MoviePost = {
      id: string;
      authors: string[];
      image: string;
      likes: number;
      category: string;
      adultMovie: boolean;
      directorInf: {
        name: string;
        age: number;
      };
    };

    const postSchema = chaca.defineSchema<MoviePost>("MoviePost", {
      id: schemas.id.uuid(),
      authors: {
        type: schemas.person.fullName({ language: "es" }),
        isArray: 5,
      },
      image: schemas.image.film(),
      likes: schemas.dataType.int({ min: 0, max: 500000 }),
      category: {
        enum: [
          "Horror",
          "War",
          "History",
          "Comedy",
          "Mystery",
          "Action",
          "Animation",
          "Musical",
        ],
      },
      adultMovie: (docFields) => {
        if (
          docFields.category === "Horror" ||
          docFields.category === "War" ||
          docFields.category === "Action"
        ) {
          return true;
        } else return false;
      },
      directorInf: new chaca.Schema({
        name: schemas.person.fullName(),
        age: schemas.dataType.int({ min: 18, max: 85 }),
      }),
    });

    it("JSON File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "json",
      });
    });

    it("Javascript File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "javascript",
      });
    });

    it("Typescript File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "typescript",
      });
    });

    it("CSV File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "csv",
      });
    });

    it("Java File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "java",
      });
    });
  });

  describe("create and export one object", () => {
    describe("current export file", async () => {
      it("no file name. Should throw an error", async () => {
        try {
          await schema.generateAndExport(1, {
            fileName: "",
            format: "json",
            location: root,
          });
        } catch (error) {
          expect(error instanceof ChacaError).toBe(true);
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
          expect(error instanceof ChacaError).toBe(true);
        }
      });
    });

    describe("Export in a JSON File", async () => {
      it("export in a JSON File (correct)", async () => {
        await schema.generateAndExport(1, {
          fileName: "WASAAA",
          format: "json",
          location: root,
        });
      });
    });

    describe("Export in a Javascript File", async () => {
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

    describe("Export in a CSV File", async () => {
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

    describe("Export in a Java File", async () => {
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

    describe("Export in Typescript File", async () => {
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

  describe("create and export an object with nested objects", () => {
    type Schema = {
      id: string;
      image: string;
      user: {
        userName: string;
        image: string;
      };
    };

    const schema = new chaca.Schema<Schema>({
      id: schemas.id.mongodbID(),
      image: schemas.image.people(),
      user: new chaca.Schema<{ userName: string; image: string }>({
        userName: schemas.internet.userName(),
        image: schemas.image.fashion(),
      }),
    });

    describe("JSON File", () => {
      it("should return an array with objects with the key user as object with property firstName and image", async () => {
        await schema.generateAndExport(20, {
          fileName: "632864289",
          location: root,
          format: "json",
        });
      });
    });
  });

  describe("exportAll tests", () => {
    const schema1 = chaca.defineSchema("mySchema1", {
      id: { type: schemas.id.mongodbID(), isArray: 20 },
      image: { type: schemas.image.film() },
      name: { type: schemas.person.firstName({ language: "es" }) },
    });

    const schema2 = chaca.defineSchema("mySchema2", {
      id: { type: schemas.id.mongodbID(), isArray: 20 },
      image: { type: schemas.image.film() },
      name: { type: schemas.person.firstName({ language: "es" }) },
    });

    const schema3 = chaca.defineSchema("mySchema3", {
      id: { type: schemas.id.mongodbID(), isArray: 20 },
      image: { type: schemas.image.film() },
      name: { type: schemas.person.firstName({ language: "es" }) },
    });

    it("export a zip, with all schemas with extension json", async () => {
      await chaca.exportAll({
        zipName: "testExportAllJson",
        location: root,
        format: "json",
      });
    });

    it("export a zip, with schemas with java extension", async () => {
      await chaca.exportAll({
        zipName: "testExportAllJava",
        location: root,
        format: "java",
      });
    });
  });
});
