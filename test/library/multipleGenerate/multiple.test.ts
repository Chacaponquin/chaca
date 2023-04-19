import { chaca, schemas } from "../../../src";
import { COMPLETE_SCHEMA } from "../utilSchemas/schemaComplete";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../utilSchemas/schemaWithArray";
import { SIMPLE_SCHEMA } from "../utilSchemas/simpleSchema";

describe("Multiple Generation Test", () => {
  describe("Generate no relational schemas", () => {
    it("Generate an object with data of three schemas", () => {
      const data = chaca.multiGenerate([
        { name: "Complete Schema", schema: COMPLETE_SCHEMA, documents: 20 },
        {
          name: "Array Fields",
          documents: 40,
          schema: SCHEMA_WITH_ARRAY_FIELDS,
        },
        { name: "Simple Schema", documents: 30, schema: SIMPLE_SCHEMA },
      ]);

      expect(data).toHaveProperty("Complete Schema");
      expect(data).toHaveProperty("Array Fields");
      expect(data).toHaveProperty("Simple Schema");
    });
  });
});
