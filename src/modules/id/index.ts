import { DatatypeModule } from "../datatype";
import { Module } from "../module";

export class IdModule {
  private datatypeModule = new DatatypeModule();

  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example modules.id.mongodbID() // Schema
   * @example
   * modules.id.mongodbID().getValue() // 'e175cac316a79afdd0ad3afb'
   *
   * @returns string
   */
  mongodbId() {
    return new Module<string>(() => {
      return this.datatypeModule
        .hexadecimal()
        .getValue({ case: "lower", length: 24 });
    });
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example modules.id.uuid() // Schema
   * @example
   * modules.id.uuid().getValue() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @returns string
   */
  uuid() {
    return new Module<string>(() => {
      const RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

      const replacePlaceholders = (placeholder: string) => {
        const random = this.datatypeModule.int().getValue({ min: 0, max: 15 });
        const value = placeholder === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
      };

      return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    });
  }
}
