import { SchemaField } from "../SchemaField.js";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";
import { Schemas } from "../index.js";

export class IdSchema {
  /**
   * Generates a unique number
   *
   * @example schemas.id.numberRow() // Schema
   * @example
   * schemas.id.numberRow().getValue() //1664755445878
   *
   * @returns string
   */
  public numberRow() {
    return new SchemaField<number>("numberRow", () => Date.now(), {});
  }

  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example schemas.id.mongodbId() // Schema
   * @example
   * schemas.id.mongodbObjectId().getValue() // 'e175cac316a79afdd0ad3afb'
   *
   * @returns string
   */
  public mongodbID() {
    return new SchemaField<string>(
      "mongodbID",
      () => {
        return Schemas.dataType
          .hexadecimal()
          .getValue({ case: "lower", length: 24 });
      },
      {},
    );
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example schemas.id.uuid() // Schema
   * @example
   * schemas.id.uuid().getValue() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @returns string
   */
  public uuid() {
    return new SchemaField<string>(
      "uuid",
      () => {
        const RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        const replacePlaceholders = (placeholder: string) => {
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
