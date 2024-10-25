import { describe, it } from "vitest";
import { ECOMMERCE_DATASET } from "../../utils/cases/ecommerce";

describe("Ecommerce case export", () => {
  describe("postgresql", () => {
    it("no arguments", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "postgresql" },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/postgresql",
      });
    });
  });

  describe("csv", () => {
    it("no arguments", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "csv" },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/csv",
      });
    });
  });

  describe("java", () => {
    it("no arguments", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "java" },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/java",
      });
    });
  });

  describe("python", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "python", separate: true },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/python",
      });
    });

    it("separate = false", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "python", separate: false },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/python",
      });
    });
  });

  describe("javascript", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "javascript", separate: true },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/js",
      });
    });

    it("separate = false", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "javascript", separate: false },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/js",
      });
    });
  });

  describe("typescript", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "typescript", separate: true },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/ts",
      });
    });

    it("separate = false", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "typescript", separate: false },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/ts",
      });
    });
  });

  describe("yaml", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "yaml", separate: true },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/yaml",
      });
    });

    it("separate = false", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "yaml", separate: false },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/yaml",
      });
    });
  });

  describe("json", () => {
    it("separate = true", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "json", separate: true },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/json",
      });
    });

    it("separate = false", async () => {
      await ECOMMERCE_DATASET.export({
        format: { ext: "json", separate: false },
        filename: "ecommerce",
        location: "./data/cases/ecommerce/json",
      });
    });
  });
});
