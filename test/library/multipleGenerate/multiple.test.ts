import {
  NO_RELATIONAL_DATA,
  RELATIONAL_USER_POST_CATEGORY_DATA,
  RELATIONAL_USER_POST_DATA,
} from "../utils/data";

describe("Multiple Generation Test", () => {
  describe("Generate no relational schemas", () => {
    it("Generate an object with data of three schemas", () => {
      expect(NO_RELATIONAL_DATA).toHaveProperty("Complete Schema");
      expect(NO_RELATIONAL_DATA).toHaveProperty("Array Fields");
      expect(NO_RELATIONAL_DATA).toHaveProperty("Simple Schema");
    });
  });

  describe("Generate relational schemas", () => {
    it("Schemas: User -> Post", () => {
      expect(RELATIONAL_USER_POST_DATA).toHaveProperty("User");
      expect(RELATIONAL_USER_POST_DATA).toHaveProperty("Post");
    });

    it("Schemas: User -> Post -> Category", () => {
      expect(RELATIONAL_USER_POST_CATEGORY_DATA).toHaveProperty("User");
      expect(RELATIONAL_USER_POST_CATEGORY_DATA).toHaveProperty("Post");
      expect(RELATIONAL_USER_POST_CATEGORY_DATA).toHaveProperty(
        "Category Post",
      );
    });
  });
});
