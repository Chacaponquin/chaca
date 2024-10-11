import { DatatypeModule } from "../datatype";
import { nanoid } from "nanoid";
import { ulid } from "ulid";
import { createId } from "@paralleldrive/cuid2";

export type NanoidProps = {
  length?: number;
};

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

  /**
   * Generates a [Nano ID](https://github.com/ai/nanoid).
   *
   * @param length Length of the generated string. Defaults to `20`.
   *
   * @example
   * modules.id.nanoid() // ptL0KpX_yRMI98JFr6B3n
   * modules.id.nanoid({ length: 10 }) // VsvwSdm_Am
   */
  nanoid({ length: ilength }: NanoidProps = {}) {
    const length = typeof ilength === "number" && ilength > 0 ? ilength : 20;

    return nanoid(length);
  }

  /**
   * Generates a [ULID](https://github.com/ulid/javascript)
   *
   * @example
   * modules.id.ulid() // "01ARZ3NDEKTSV4RRFFQ69G5FAV"
   *
   * @returns string
   */
  ulid(): string {
    return ulid();
  }

  /**
   * Generates a [CUID](https://github.com/paralleldrive/cuid2)
   *
   * @example
   * modules.id.cuid() // "tz4a98xxat96iws9zmbrgj3a"
   *
   * @returns string
   */
  cuid(): string {
    return createId();
  }
}