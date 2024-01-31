import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const fileName = "json";
const ROOT = "./data/json";
const COUNT_DOCUMENTS = 50;

describe("# JSON Export Test", () => {
  it("Pass zip=true. Should create a zip file", async () => {
    const route = await chaca.export(
      {},
      {
        fileName: fileName + "Zip",
        format: { ext: "json", zip: true },
        location: ROOT,
      },
    );

    expect(checkFile({ route, ext: "zip" })).toBe(true);
  });

  it("Pass separate=false. Should create a single json file", async () => {
    const route = await chaca.exportFromSchemas(
      [
        {
          documents: COUNT_DOCUMENTS,
          name: "CompleteSchema",
          schema: COMPLETE_SCHEMA,
        },
        {
          documents: COUNT_DOCUMENTS,
          name: "SimpleSchema",
          schema: SIMPLE_SCHEMA,
        },
        {
          documents: COUNT_DOCUMENTS,
          name: "NestedObjectSchema",
          schema: NESTED_OBJECT_SCHEMA,
        },
      ],
      {
        fileName: fileName + "NotSeparate",
        format: { ext: "json", separate: false, zip: true },
        location: ROOT,
      },
      { verbose: false },
    );

    expect(checkFile({ route, ext: "zip" })).toBe(true);
  });

  it("Pass separate=true. Should create multiple files", async () => {
    const file = fileName + "Separate";

    const route = await chaca.exportFromSchemas(
      [
        {
          documents: COUNT_DOCUMENTS,
          name: "CompleteSchema",
          schema: COMPLETE_SCHEMA,
        },
        {
          documents: COUNT_DOCUMENTS,
          name: "SimpleSchema",
          schema: SIMPLE_SCHEMA,
        },
        {
          documents: COUNT_DOCUMENTS,
          name: "NestedObjectSchema",
          schema: NESTED_OBJECT_SCHEMA,
        },
      ],
      {
        fileName: file,
        format: { ext: "json", separate: true, zip: true },
        location: ROOT,
      },
      { verbose: false },
    );

    expect(checkFile({ route, ext: "zip" })).toBe(true);
  });
});
