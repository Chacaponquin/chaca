import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
import { SchemaField } from "../SchemaField.js";
import {
  ANIMAL_TYPE,
  BEAR,
  BIRD,
  CAT,
  CETACEAN,
  COW,
  CROCODILIA,
  DOG,
  HORSE,
  INSECT,
  LION,
  RABBIT,
  RODENT,
  SNAKE,
  FISH,
} from "./constants/index.js";

export class AnimalSchema {
  /**
   * Returns a dog breed
   * @example schemas.animal.dog() // Schema
   * @example schemas.animal.dog().getValue() // 'Irish Water Spaniel'
   * @returns string
   */
  dog() {
    return new SchemaField<string>(
      "dog",
      () => PrivateUtils.oneOfArray(DOG),
      {},
    );
  }

  /**
   * Returns a bear breed
   * @example schemas.animal.bear() // Schema
   * @example schemas.animal.bear().getValue() // 'Singapuria'
   * @returns string
   */
  bear() {
    return new SchemaField<string>(
      "bear",
      () => PrivateUtils.oneOfArray(BEAR),
      {},
    );
  }

  /**
   * Returns a bird breed
   * @example schemas.animal.bird() // Schema
   * @example schemas.animal.bird().getValue() // 'Singapuria'
   * @returns string
   */
  bird() {
    return new SchemaField<string>(
      "bird",
      () => PrivateUtils.oneOfArray(BIRD),
      {},
    );
  }

  /**
   * Returns a cat breed
   * @example schemas.animal.cat() // Schema
   * @example schemas.animal.cat().getValue() // 'Singapuria'
   * @returns string
   */
  cat() {
    return new SchemaField<string>(
      "cat",
      () => PrivateUtils.oneOfArray(CAT),
      {},
    );
  }

  /**
   * Returns a cetacean breed
   * @example schemas.animal.cetacean() // Schema
   * @example schemas.animal.cetacean().getValue() // 'Spinner Dolphin'
   * @returns string
   */
  cetacean() {
    return new SchemaField<string>(
      "cetacean",
      () => PrivateUtils.oneOfArray(CETACEAN),
      {},
    );
  }

  /**
   * Returns a cow breed
   * @example schemas.animal.cow() // Schema
   * @example schemas.animal.cow().getValue() // 'Brava'
   * @returns string
   */
  cow() {
    return new SchemaField<string>(
      "cow",
      () => PrivateUtils.oneOfArray(COW),
      {},
    );
  }

  /**
   * Returns a crocodilia breed
   * @example schemas.animal.crocodilia() // Schema
   * @example schemas.animal.crocodilia().getValue() // 'Philippine Crocodile'
   * @returns string
   */
  crocodilia() {
    return new SchemaField<string>(
      "crocodilia",
      () => PrivateUtils.oneOfArray(CROCODILIA),
      {},
    );
  }

  /**
   * Returns a fish breed
   * @example schemas.animal.fish() // Schema
   * @example schemas.animal.fish().getValue() // 'Mandarin fish'
   * @returns string
   */
  fish() {
    return new SchemaField<string>(
      "fish",
      () => PrivateUtils.oneOfArray(FISH),
      {},
    );
  }

  /**
   * Returns a horse breed
   * @example schemas.animal.horse() // Schema
   * @example schemas.animal.horse().getValue() // 'Swedish Warmblood'
   * @returns string
   */
  horse() {
    return new SchemaField<string>(
      "horse",
      () => PrivateUtils.oneOfArray(HORSE),
      {},
    );
  }

  /**
   * Returns a insect breed
   * @example schemas.animal.insect() // Schema
   * @example schemas.animal.insect().getValue() // 'Pyramid ant'
   * @returns string
   */
  insect() {
    return new SchemaField<string>(
      "insect",
      () => PrivateUtils.oneOfArray(INSECT),
      {},
    );
  }

  /**
   * Returns a lion breed
   * @example schemas.animal.lion() // Schema
   * @example schemas.animal.lion().getValue() // 'Northeast Congo Lion'
   * @returns string
   */
  lion() {
    return new SchemaField<string>(
      "lion",
      () => PrivateUtils.oneOfArray(LION),
      {},
    );
  }

  /**
   * Returns a rabbit breed
   * @example schemas.animal.rabbit() // Schema
   * @example schemas.animal.rabbit().getValue() // 'Florida White'
   * @returns string
   */
  rabbit() {
    return new SchemaField<string>(
      "rabbit",
      () => PrivateUtils.oneOfArray(RABBIT),
      {},
    );
  }

  /**
   * Returns a rodent breed
   * @example schemas.animal.rodent() // Schema
   * @example schemas.animal.rodent().getValue() // 'Cuscomys ashanika'
   * @returns string
   */
  rodent() {
    return new SchemaField<string>(
      "rodent",
      () => PrivateUtils.oneOfArray(RODENT),
      {},
    );
  }

  /**
   * Returns a snake breed
   * @example schemas.animal.snake() // Schema
   * @example schemas.animal.snake().getValue() // 'Eyelash viper'
   * @returns string
   */
  snake() {
    return new SchemaField<string>(
      "snake",
      () => PrivateUtils.oneOfArray(SNAKE),
      {},
    );
  }

  /**
   * Returns an animal type
   * @example schemas.animal.animalType() // Schema
   * @example schemas.animal.animalType().getValue() // 'Singapuria'
   * @returns string
   */
  animalType() {
    return new SchemaField<string>(
      "animalType",
      () => PrivateUtils.oneOfArray(ANIMAL_TYPE),
      {},
    );
  }
}
