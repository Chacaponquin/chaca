import { faker } from "@faker-js/faker";
import { SchemaField } from "../utils/SchemaField";
import { v4 as uuid } from "uuid";

export class IdSchema {
  public numberRow() {
    return new SchemaField<number>("numberRow", () => Date.now(), {});
  }
  public mongodbID() {
    return new SchemaField<string>(
      "mongodbID",
      faker.database.mongodbObjectId,
      {}
    );
  }

  public uuid() {
    return new SchemaField<string>(
      "uuid",
      () => {
        return uuid();
      },
      {}
    );
  }
}
