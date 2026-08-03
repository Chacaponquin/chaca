import { describe } from "vitest";
import { Dataset } from "../../../src";

interface Props {
  dataset: Dataset;
  check: (data: any) => void;
}

export class ExampleCaseTest {
  private readonly dataset: Dataset;
  private readonly check: (data: any) => void;

  constructor({ dataset, check }: Props) {
    this.dataset = dataset;
    this.check = check;
  }

  execute() {
    describe("Generation", async () => {
      const data = await this.dataset.generate();

      this.check(data);
    });
  }
}
