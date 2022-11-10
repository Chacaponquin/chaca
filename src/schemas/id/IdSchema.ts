import { faker } from "@faker-js/faker";
import { SchemaField } from "../SchemaField";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils";

export class IdSchema {
  /**
   * Generates a unique row of numbers
   *
   * @example
   * schemas.id.numberRow().getValue() //1664755445878
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
    return new SchemaField<string>(
      "uuid",
      () => {
        const RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        const replacePlaceholders = (placeholder) => {
          const random = PrivateUtils.intNumber({ min: 0, max: 15 });
          const value = placeholder === "x" ? random : (random & 0x3) | 0x8;
          return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
      },
      {},
    );
  }
}
