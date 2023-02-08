import { schemas, chaca } from "../../src";
import { ChacaError } from "../../src/errors/ChacaError";

const schema = new chaca.Schema({
  id: { type: schemas.id.mongodbID() },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const schemaWithArray = new chaca.Schema({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});

const root = "./data";

describe("#Export Test", () => {
  describe("export a single object ( With chaca.export )", () => {
    const object = {
      userName: "Hector Gomez",
      likes: 10,
      users: [
        { hola: 1, hola2: 5 },
        { hola: 1, hola2: 5 },
        { hola: 1, hola2: 5 },
        { hola: 1, hola2: 5 },
      ],
      date: new Date(),
    };

    it("In a Yaml File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "yaml",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("In a Json File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "json",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("In a Javasrcipt File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "javascript",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("In a Typescript File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "typescript",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("In a CSV File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "csv",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });

    it("In a Java File", () => {
      chaca
        .export(object, {
          fileName: "simpleObject",
          location: root,
          format: "java",
        })
        .then((s) => expect(typeof s === "string").toBe(true));
    });
  });

  describe("export a complete schema in all formats", () => {
    const postSchema = chaca.defineSchema({
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
      directorsInf: {
        type: new chaca.Schema({
          name: schemas.person.fullName({}),
          age: schemas.dataType.int({ min: 18, max: 85 }),
          currentMovie: {
            type: new chaca.Schema({
              name: schemas.person.firstName(),
              image: schemas.image.event(),
            }),
            posibleNull: 50,
          },
          email: schemas.internet.email(),
        }),
        isArray: { min: 1, max: 4 },
      },
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

    it("Yaml File", async () => {
      await postSchema.generateAndExport(50, {
        fileName: "completeSchema",
        location: root,
        format: "yaml",
      });
    });
  });

  describe("export with incorrrect arguments", () => {
    it("no file name. Should throw an error", () => {
      schema
        .generateAndExport(1, {
          fileName: "",
          format: "json",
          location: root,
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });

    it("incorrect format file. Should throw an error", () => {
      schema
        .generateAndExport(1, {
          fileName: "quetal",
          format: "buenas" as any,
          location: root,
        })
        .catch((error) => expect(error instanceof ChacaError).toBe(true));
    });
  });

  describe("create and export an array with one object", () => {
    it("In a JSON File ", () => {
      schema
        .generateAndExport(1, {
          fileName: "oneObjectArray",
          format: "json",
          location: root,
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a JS File", () => {
      schema
        .generateAndExport(1, {
          fileName: "oneObjectArray",
          format: "javascript",
          location: root,
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a CSV File", () => {
      schema
        .generateAndExport(1, {
          fileName: "oneObjectArray",
          format: "csv",
          location: root,
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a Java File", () => {
      schema
        .generateAndExport(1, {
          location: root,
          fileName: "oneObjectArray",
          format: "java",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("in a TS File", () => {
      schema
        .generateAndExport(1, {
          fileName: "oneObjectArray",
          location: root,
          format: "typescript",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a Yaml File", () => {
      schema
        .generateAndExport(1, {
          fileName: "oneObjectArray",
          location: root,
          format: "yaml",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });
  });

  describe("create and export documents with a field that contains an array of values", () => {
    it("In a JS File", () => {
      schemaWithArray
        .generateAndExport(10, {
          fileName: "oneObjectArray",
          location: root,
          format: "javascript",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a Yaml File", () => {
      schemaWithArray
        .generateAndExport(10, {
          fileName: "oneObjectArray",
          location: root,
          format: "yaml",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a Java File", () => {
      schemaWithArray
        .generateAndExport(20, {
          location: root,
          fileName: "documentsWithArrayFields",
          format: "java",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("In a TS File", () => {
      schemaWithArray
        .generateAndExport(20, {
          location: root,
          fileName: "documentsWithArrayFields",
          format: "typescript",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });
  });

  describe("create and export an object with nested objects", () => {
    const schema = new chaca.Schema({
      id: schemas.id.mongodbID(),
      image: schemas.image.people(),
      user: new chaca.Schema({
        userName: schemas.internet.userName({}),
        image: schemas.image.fashion(),
      }),
    });

    it("JSON File", () => {
      schema
        .generateAndExport(20, {
          fileName: "schemaNestedObjects",
          location: root,
          format: "json",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("JS File", () => {
      schema
        .generateAndExport(20, {
          fileName: "schemaNestedObjects",
          location: root,
          format: "javascript",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("TS File", () => {
      schema
        .generateAndExport(20, {
          fileName: "schemaNestedObjects",
          location: root,
          format: "typescript",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("Yaml File", () => {
      schema
        .generateAndExport(20, {
          fileName: "schemaNestedObjects",
          location: root,
          format: "yaml",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });

    it("CSV File", () => {
      schema
        .generateAndExport(20, {
          fileName: "schemaNestedObjects",
          location: root,
          format: "csv",
        })
        .then((s) => {
          expect(typeof s === "string").toBe(true);
        });
    });
  });
});
