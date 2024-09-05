import { ChacaUtils } from "../../core/utils";
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
  readonly constants = {
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
   * @example modules.animal.dog() // 'Irish Water Spaniel'
   * @returns string
   */
  dog(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(DOG);
  }

  /**
   * Returns a bear breed
   * @example modules.animal.bear() // 'Singapuria'
   * @returns string
   */
  bear(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(BEAR);
  }

  /**
   * Returns a bird breed
   * @example modules.animal.bird() // 'Singapuria'
   * @returns string
   */
  bird(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(BIRD);
  }

  /**
   * Returns a cat breed
   * @example modules.animal.cat() // 'Bengal'
   * @returns string
   */
  cat(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(CAT);
  }

  /**
   * Returns a cetacean breed
   * @example modules.animal.cetacean() // 'Spinner Dolphin'
   * @returns string
   */
  cetacean(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(CETACEAN);
  }

  /**
   * Returns a cow breed
   * @example modules.animal.cow() // 'Brava'
   * @returns string
   */
  cow(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(COW);
  }

  /**
   * Returns a crocodilia breed
   * @example modules.animal.crocodilia() // 'Philippine Crocodile'
   * @returns string
   */
  crocodilia(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(CROCODILIA);
  }

  /**
   * Returns a fish breed
   * @example modules.animal.fish() // 'Mandarin fish'
   * @returns string
   */
  fish(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(FISH);
  }

  /**
   * Returns a horse breed
   * @example modules.animal.horse() // 'Swedish Warmblood'
   * @returns string
   */
  horse(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(HORSE);
  }

  /**
   * Returns a insect breed
   * @example modules.animal.insect() // 'Pyramid ant'
   * @returns string
   */
  insect(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(INSECT);
  }

  /**
   * Returns a lion breed
   * @example modules.animal.lion() // 'Northeast Congo Lion'
   * @returns string
   */
  lion(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(LION);
  }

  /**
   * Returns a rabbit breed
   * @example modules.animal.rabbit() // 'Florida White'
   * @returns string
   */
  rabbit(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(RABBIT);
  }

  /**
   * Returns a rodent breed
   * @example modules.animal.rodent() // 'Cuscomys ashanika'
   * @returns string
   */
  rodent(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(RODENT);
  }

  /**
   * Returns a snake breed
   * @example modules.animal.snake() // 'Eyelash viper'
   * @returns string
   */
  snake(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(SNAKE);
  }

  /**
   * Returns an animal type
   * @example modules.animal.type() // 'Singapuria'
   * @returns string
   */
  type(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(ANIMAL_TYPE);
  }
}
