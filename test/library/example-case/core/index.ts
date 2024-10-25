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
        await this.export({ ext: "postgresql" });
      });
    });

    describe("csv", () => {
      it("no arguments", async () => {
        await this.export({ ext: "csv" });
      });
    });

    describe("java", () => {
      it("no arguments", async () => {
        await this.export({ ext: "java" });
      });
    });

    describe("python", () => {
      it("separate = true", async () => {
        await this.export({ ext: "python", separate: true });
      });

      it("separate = false", async () => {
        await this.export({ ext: "python", separate: true });
      });
    });

    describe("javascript", () => {
      it("separate = true", async () => {
        await this.export({ ext: "javascript", separate: true });
      });

      it("separate = false", async () => {
        await this.export({ ext: "javascript", separate: false });
      });
    });

    describe("typescript", () => {
      it("separate = true", async () => {
        await this.export({ ext: "typescript", separate: true });
      });

      it("separate = false", async () => {
        await this.export({ ext: "typescript", separate: false });
      });
    });

    describe("yaml", () => {
      it("separate = true", async () => {
        await this.export({ ext: "yaml", separate: true });
      });

      it("separate = false", async () => {
        await this.export({ ext: "yaml", separate: false });
      });
    });

    describe("json", () => {
      it("separate = true", async () => {
        await this.export({ ext: "json", separate: true });
      });

      it("separate = false", async () => {
        await this.export({ ext: "json", separate: false });
      });
    });
  }

  private async export(props: ExtensionConfigs): Promise<void> {
    const routes = await this.dataset.export({
      filename: this.filename,
      verbose: false,
      format: props,
      location: `./data/cases/${this.location}/${props.ext}`,
    });

    for (const route of routes) {
      const exists = fs.existsSync(route);
      expect(exists).toBe(true);
    }
  }
}
