import { describe, expect, it } from "vitest";
import fs from "fs";
import { Dataset, ExtensionConfigs } from "../../../../src";

export class ExampleCaseTest {
  constructor(
    private readonly dataset: Dataset,
    private readonly filename: string,
    private readonly location: string,
  ) {}

  execute() {
    describe("postgresql", () => {
      it("no arguments", async () => {
        await this.export({
          ext: "postgresql",
          location: "no-arguments",
          generateIds: true,
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "postgresql",
          zip: true,
          location: "zip",
        });
      });

      it("declaration = true", async () => {
        await this.export({
          ext: "postgresql",
          declarationOnly: true,
          location: "declaration",
          generateIds: true,
        });
      });
    });

    describe("csv", () => {
      it("no arguments", async () => {
        await this.export({ ext: "csv", location: "no-arguments" });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "csv",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("java", () => {
      it("no arguments", async () => {
        await this.export({ ext: "java", location: "no-arguments" });
      });

      it("declaration = true", async () => {
        await this.export({
          ext: "java",
          declarationOnly: true,
          location: "declaration",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "java",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("python", () => {
      it("separate = true", async () => {
        await this.export({
          ext: "python",
          separate: true,
          location: "separated",
        });
      });

      it("separate = false", async () => {
        await this.export({
          ext: "python",
          separate: false,
          location: "not-separated",
        });
      });

      it("declaration = true", async () => {
        await this.export({
          ext: "python",
          declarationOnly: true,
          location: "declaration",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "python",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("javascript", () => {
      it("separate = true", async () => {
        await this.export({
          ext: "javascript",
          separate: true,
          location: "not-separated",
        });
      });

      it("separate = false", async () => {
        await this.export({
          ext: "javascript",
          separate: false,
          location: "not-separated",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "javascript",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("typescript", () => {
      it("separate = true", async () => {
        await this.export({
          ext: "typescript",
          separate: true,
          location: "separated",
        });
      });

      it("separate = false", async () => {
        await this.export({
          ext: "typescript",
          separate: false,
          location: "not-separated",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "typescript",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("yaml", () => {
      it("separate = true", async () => {
        await this.export({
          ext: "yaml",
          separate: true,
          location: "separated",
        });
      });

      it("separate = false", async () => {
        await this.export({
          ext: "yaml",
          separate: false,
          location: "not-separated",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "yaml",
          zip: true,
          location: "zip",
        });
      });
    });

    describe("json", () => {
      it("separate = true", async () => {
        await this.export({
          ext: "json",
          separate: true,
          location: "separate",
        });
      });

      it("zip = true", async () => {
        await this.export({
          ext: "json",
          zip: true,
          location: "zip",
        });
      });

      it("separate = false", async () => {
        await this.export({
          ext: "json",
          separate: false,
          location: "not-separate",
        });
      });
    });
  }

  private async export(
    props: ExtensionConfigs & { location: string },
  ): Promise<void> {
    const routes = await this.dataset.export({
      filename: this.filename,
      verbose: false,
      format: props,
      location: `./data/cases/${this.location}/${props.ext}/${props.location}`,
    });

    for (const route of routes) {
      const exists = fs.existsSync(route);
      expect(exists).toBe(true);
    }
  }
}
