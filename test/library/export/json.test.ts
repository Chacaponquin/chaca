import { chaca } from "../../../src";
import { COMPLETE_SCHEMA } from "../../utils/schemas/schema-complete";
import { NESTED_OBJECT_SCHEMA } from "../../utils/schemas/schema-nested-objects";
import { SIMPLE_SCHEMA } from "../../utils/schemas/simple-schema";

const fileName = "json";
const ROOT = "./data/json";
const COUNT_DOCUMENTS = 50;

describe("# JSON Export Test", () => {
  it("Pass separate=false. Should create a single json file", () => {
    chaca.exportFromSchemas(
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
        format: { ext: "json", separate: false },
        location: ROOT,
      },
      { verbose: false },
    );
  });

  it("Pass separate=true. Should create multiple files", () => {
    chaca.exportFromSchemas(
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
        fileName: fileName + "Separate",
        format: { ext: "json", separate: true },
        location: ROOT,
      },
      { verbose: false },
    );
  });
});
