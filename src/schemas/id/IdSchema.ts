import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { SchemaField } from "../SchemaField";

export class IdSchema {
  /**
   * Generates a unique row of numbers
   *
   * @example
   * chdata.schemas.id.numberRow().getValue() //1664755445878
   *
   * @returns string
   */
  public numberRow() {
    return new SchemaField<number>("numberRow", () => Date.now(), {});
  }

  public mongodbID() {
    return new SchemaField<string>(
      "mongodbID",
      faker.database.mongodbObjectId,
      {},
    );
  }

  public uuid() {
    return new SchemaField<string>("uuid", () => uuid(), {});
  }
}
