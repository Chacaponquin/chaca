import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";
import { checkFile } from "./utils/export-util";

const filename = "json";
const ROOT = "./data/json";
const COUNT_DOCUMENTS = 50;

describe("# JSON Export Test", () => {
  it("Pass zip=true. Should create a zip file", async () => {
    const route = await chaca.export(
      {},
      {
        filename: filename + "Zip",
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
        filename: filename + "NotSeparate",
        format: { ext: "json", separate: false, zip: true },
        location: ROOT,
      },
      { verbose: false },
    );

    expect(checkFile({ route, ext: "zip" })).toBe(true);
  });

  it("Pass separate=true. Should create multiple files", async () => {
    const file = filename + "Separate";

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
        filename: file,
        format: { ext: "json", separate: true, zip: true },
        location: ROOT,
      },
      { verbose: false },
    );

    expect(checkFile({ route, ext: "zip" })).toBe(true);
  });
});
