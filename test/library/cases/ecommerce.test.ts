import { describe, it } from "vitest";
import { ECOMMERCE_DATASET } from "../../utils/cases/ecommerce";

describe("Ecommerce case export", () => {
  describe("json", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "json" },
        filename: "ecommerce",
        location: "./data/cases/ecommerce",
      });
    });
  });
});
