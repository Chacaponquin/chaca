import { ChacaError } from "../../../errors";
import {
  DatasetSchemaCount,
  DatasetSchemaCountFunction,
} from "../../dataset-resolver/interfaces/dataset-schema";
import { DatasetStore } from "../../dataset-store/dataset-store";

interface Props {
  store: DatasetStore;
}

interface CreateProps {
  value: DatasetSchemaCount;
  singleSchema: boolean;
  name: string;
}

export abstract class SchemaCountExecutor {
  static create({
    value,
    name,
    singleSchema,
  }: CreateProps): SchemaCountExecutor {
    if (typeof value === "number") {
      return new IntegerSchemaCount(value);
    } else if (typeof value === "function") {
      return new FunctionSchemaCount(value);
    } else {
      throw new ChacaError(
        singleSchema
          ? `You have to specify a number of documents to create the schema`
          : `You have to specify a number of documents to create the schema '${name}'`,
      );
    }
  }

  abstract value(props: Props): Promise<number>;
}

export class IntegerSchemaCount extends SchemaCountExecutor {
  constructor(private readonly limit: number) {
    super();
  }

  value(): Promise<number> {
    return new Promise((resolve) => resolve(this.limit));
  }
}

export class FunctionSchemaCount extends SchemaCountExecutor {
  constructor(private readonly func: DatasetSchemaCountFunction) {
    super();
  }

  async value(props: Props): Promise<number> {
    const value = await this.func({ store: props.store });

    return value;
  }
}
