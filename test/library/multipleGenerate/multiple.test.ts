import { chaca, schemas } from "../../../src";
import { POST_SCHEMA } from "../utils/postSchema";
import { COMPLETE_SCHEMA } from "../utils/schemaComplete";
import { SCHEMA_WITH_ARRAY_FIELDS } from "../utils/schemaWithArray";
import { SIMPLE_SCHEMA } from "../utils/simpleSchema";
import { USER_SCHEMA } from "../utils/userSchema";

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

  describe("Generate relational schemas", () => {
    it("Schemas: User -> Post", () => {
      const data = chaca.multiGenerate([
        { name: "User", documents: 40, schema: USER_SCHEMA },
        { name: "Post", documents: 40, schema: POST_SCHEMA },
      ]);

      expect(data).toHaveProperty("User");
      expect(data).toHaveProperty("Post");
    });
  });
});