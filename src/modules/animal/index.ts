import { ChacaUtils } from "../../core/utils";
import { Module } from "../Module";
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
} from "./constants";

export class AnimalModule {
  private utils = new ChacaUtils();

  public readonly constants = {
    animalTypes: ANIMAL_TYPE,
    bears: BEAR,
    birds: BIRD,
    cats: CAT,
    ceteceans: CETACEAN,
    cows: COW,
    cocodrilas: CROCODILIA,
    dogs: DOG,
    hourses: HORSE,
    insects: INSECT,
    lions: LION,
    rabbits: RABBIT,
    rodents: RODENT,
    snakes: SNAKE,
    fishes: FISH,
  };

  /**
   * Returns a dog breed
   * @example modules.animal.dog() // Schema
   * @example modules.animal.dog().getValue() // 'Irish Water Spaniel'
   * @returns string
   */
  dog() {
    return new Module<string>(() => this.utils.oneOfArray(DOG), {});
  }

  /**
   * Returns a bear breed
   * @example modules.animal.bear() // Schema
   * @example modules.animal.bear().getValue() // 'Singapuria'
   * @returns string
   */
  bear() {
    return new Module<string>(() => this.utils.oneOfArray(BEAR), {});
  }

  /**
   * Returns a bird breed
   * @example modules.animal.bird() // Schema
   * @example modules.animal.bird().getValue() // 'Singapuria'
   * @returns string
   */
  bird() {
    return new Module<string>(() => this.utils.oneOfArray(BIRD), {});
  }

  /**
   * Returns a cat breed
   * @example modules.animal.cat() // Schema
   * @example modules.animal.cat().getValue() // 'Bengal'
   * @returns string
   */
  cat() {
    return new Module<string>(() => this.utils.oneOfArray(CAT), {});
  }

  /**
   * Returns a cetacean breed
   * @example modules.animal.cetacean() // Schema
   * @example modules.animal.cetacean().getValue() // 'Spinner Dolphin'
   * @returns string
   */
  cetacean() {
    return new Module<string>(() => this.utils.oneOfArray(CETACEAN), {});
  }

  /**
   * Returns a cow breed
   * @example modules.animal.cow() // Schema
   * @example modules.animal.cow().getValue() // 'Brava'
   * @returns string
   */
  cow() {
    return new Module<string>(() => this.utils.oneOfArray(COW), {});
  }

  /**
   * Returns a crocodilia breed
   * @example modules.animal.crocodilia() // Schema
   * @example modules.animal.crocodilia().getValue() // 'Philippine Crocodile'
   * @returns string
   */
  crocodilia() {
    return new Module<string>(() => this.utils.oneOfArray(CROCODILIA), {});
  }

  /**
   * Returns a fish breed
   * @example modules.animal.fish() // Schema
   * @example modules.animal.fish().getValue() // 'Mandarin fish'
   * @returns string
   */
  fish() {
    return new Module<string>(() => this.utils.oneOfArray(FISH), {});
  }

  /**
   * Returns a horse breed
   * @example modules.animal.horse() // Schema
   * @example modules.animal.horse().getValue() // 'Swedish Warmblood'
   * @returns string
   */
  horse() {
    return new Module<string>(() => this.utils.oneOfArray(HORSE), {});
  }

  /**
   * Returns a insect breed
   * @example modules.animal.insect() // Schema
   * @example modules.animal.insect().getValue() // 'Pyramid ant'
   * @returns string
   */
  insect() {
    return new Module<string>(() => this.utils.oneOfArray(INSECT), {});
  }

  /**
   * Returns a lion breed
   * @example modules.animal.lion() // Schema
   * @example modules.animal.lion().getValue() // 'Northeast Congo Lion'
   * @returns string
   */
  lion() {
    return new Module<string>(() => this.utils.oneOfArray(LION), {});
  }

  /**
   * Returns a rabbit breed
   * @example modules.animal.rabbit() // Schema
   * @example modules.animal.rabbit().getValue() // 'Florida White'
   * @returns string
   */
  rabbit() {
    return new Module<string>(() => this.utils.oneOfArray(RABBIT), {});
  }

  /**
   * Returns a rodent breed
   * @example modules.animal.rodent() // Schema
   * @example modules.animal.rodent().getValue() // 'Cuscomys ashanika'
   * @returns string
   */
  rodent() {
    return new Module<string>(() => this.utils.oneOfArray(RODENT), {});
  }

  /**
   * Returns a snake breed
   * @example modules.animal.snake() // Schema
   * @example modules.animal.snake().getValue() // 'Eyelash viper'
   * @returns string
   */
  snake() {
    return new Module<string>(() => this.utils.oneOfArray(SNAKE), {});
  }

  /**
   * Returns an animal type
   * @example modules.animal.animalType() // Schema
   * @example modules.animal.animalType().getValue() // 'Singapuria'
   * @returns string
   */
  animalType() {
    return new Module<string>(() => this.utils.oneOfArray(ANIMAL_TYPE), {});
  }
}
