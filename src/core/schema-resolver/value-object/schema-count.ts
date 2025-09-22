import { ChacaError } from "../../../errors";

interface Props {
  singleSchema: boolean;
  name: string;
}

export class SchemaCount {
  private readonly singleSchema: boolean;
  private readonly name: string;
  private _value: number | null;
  private readonly observers: Array<(v: number) => void>;

  constructor({ singleSchema, name }: Props) {
    this.singleSchema = singleSchema;
    this.name = name;
    this._value = null;
    this.observers = [];
  }

  setValue(v: number) {
    if (typeof v === "number") {
      if (v >= 0) {
        this._value = v;

        for (const o of this.observers) {
          o(v);
        }
      } else {
        throw new ChacaError(
          this.singleSchema
            ? `The number of documents to generate for the schema cannot be a negative value`
            : `The number of documents to generate for schema '${this.name}' cannot be a negative value (${v})`,
        );
      }
    } else {
      throw new ChacaError(
        this.singleSchema
          ? `You have to specify a number of documents to create the schema`
          : `You have to specify a number of documents to create the schema '${this.name}'`,
      );
    }
  }

  value() {
    return this._value;
  }

  register(fun: (v: number) => void): void {
    this.observers.push(fun);
  }
}
