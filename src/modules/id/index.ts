import { DatatypeModule } from "../datatype";

export class IdModule {
  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example
   * modules.id.mongodbId() // 'e175cac316a79afdd0ad3afb'
   *
   * @returns string
   */
  mongodbId(): string {
    const datatypeModule = new DatatypeModule();
    return datatypeModule.hexadecimal({ case: "lower", length: 24 });
  }

  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example
   * modules.id.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @returns string
   */
  uuid(): string {
    const datatypeModule = new DatatypeModule();
    const RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

    const replacePlaceholders = (placeholder: string) => {
      const random = datatypeModule.int({ min: 0, max: 15 });
      const value = placeholder === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    };

    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }
}
