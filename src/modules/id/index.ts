import { DatatypeModule } from "../datatype";
import { nanoid } from "nanoid";
import { ulid } from "ulid";
import { createId } from "@paralleldrive/cuid2";
import { v4 } from "uuid";

export type NanoidProps = {
  length?: number;
};

export class IdModule {
  constructor(private readonly datatypeModule: DatatypeModule) {}

  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example
   * modules.id.mongodbId() // 'e175cac316a79afdd0ad3afb'
   *
   * @returns string
   */
  mongodbId(): string {
    return this.datatypeModule.hexadecimal({ case: "lower", length: 24 });
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
    return v4();
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
