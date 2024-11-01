import { describe, expect, it } from "vitest";
import { chaca, ChacaError, Extensions } from "../../../../src";
import { SIMPLE_OBJECT } from "./simple-object";
import { SIMPLE_ARRAY } from "./simple-array";
import { MATRIX } from "./matrix";
import { ARRAY_OBJECTS } from "./array-objects";

interface Props {
  primitives: {
    string?: boolean;
    boolean?: boolean;
    float?: boolean;
    nan?: boolean;
    date?: boolean;
    int?: boolean;
    undefined?: boolean;
    null?: boolean;
    bigint?: boolean;
  };
  object: {
    simple?: boolean;
  };
  arrays: {
    simple?: boolean;
    matrix?: boolean;
    objects?: boolean;
  };
}

interface ExportProps {
  data: any;
  filename: string;
  error: boolean | undefined;
}

export class ExtensionTester {
  constructor(private readonly extension: Extensions) {}

  execute({
    arrays: { matrix, simple: asimple, objects },
    object: { simple: osimple },
    primitives: {
      boolean,
      date,
      float,
      int,
      nan,
      null: enull,
      string,
      bigint,
      undefined: eundefined,
    },
  }: Props): void {
    describe("object", () => {
      it("simple object", async () => {
        await this.export({
          data: SIMPLE_OBJECT,
          error: osimple,
          filename: "simple-object",
        });
      });
    });

    describe("array", () => {
      it("matrix", async () => {
        await this.export({
          data: MATRIX,
          error: matrix,
          filename: "matrix",
        });
      });

      it("simple array", async () => {
        await this.export({
          data: SIMPLE_ARRAY,
          error: asimple,
          filename: "simple-array",
        });
      });

      it("array objects", async () => {
        await this.export({
          data: ARRAY_OBJECTS,
          error: objects,
          filename: "array-objects",
        });
      });
    });

    describe("primitive values", () => {
      it("bigint", async () => {
        await this.export({
          data: BigInt(99999),
          error: bigint,
          filename: "bigint",
        });
      });

      it("string", async () => {
        await this.export({ data: "foo", error: string, filename: "string" });
      });

      it("int", async () => {
        await this.export({ data: 5, error: int, filename: "int" });
      });

      it("float", async () => {
        await this.export({ data: 5.55, error: float, filename: "float" });
      });

      it("date", async () => {
        await this.export({ data: new Date(), error: date, filename: "date" });
      });

      it("undefined", async () => {
        await this.export({
          data: undefined,
          error: eundefined,
          filename: "undefined",
        });
      });

      it("boolean", async () => {
        await this.export({ data: true, error: boolean, filename: "boolean" });
      });

      it("NaN", async () => {
        await this.export({ data: NaN, error: nan, filename: "nan" });
      });

      it("null", async () => {
        await this.export({ data: null, error: enull, filename: "null" });
      });
    });
  }

  async export({ data, filename, error }: ExportProps): Promise<void> {
    if (error) {
      await expect(async () => {
        await chaca.export(data, {
          filename: filename,
          location: `./data/${this.extension}`,
          format: this.extension,
        });
      }).rejects.toThrow(ChacaError);
    } else {
      await chaca.export(data, {
        filename: filename,
        location: `./data/${this.extension}`,
        format: this.extension,
      });
    }
  }
}
