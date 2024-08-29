import { DatatypeModule } from "../datatype";
import { Module } from "../Module";

export class ImageModule {
  private datatypeModule = new DatatypeModule();

  private buildUrl(category: string) {
    const url = "https://source.unsplash.com/category";
    return `${url}/${category}`;
  }

  /**
   * Return a food image url
   *
   * @example modules.image.food() // Schema
   * @example
   * modules.image.food().getValue()
   * @returns string
   */
  food() {
    return new Module<string>(() => {
      return this.buildUrl("food");
    }, {});
  }

  /**
   * Return a event image url
   *
   * @example modules.image.event() // Schema
   * @example
   * modules.image.event().getValue()
   * @returns string
   */
  event() {
    return new Module<string>(() => this.buildUrl("event"), {});
  }

  /**
   * Return a wallpaper image url
   *
   * @example modules.image.wallpaper() // Schema
   * @example
   * modules.image.wallpaper().getValue()
   * @returns string
   */
  wallpaper() {
    return new Module<string>(() => this.buildUrl("wallpaper"), {});
  }

  /**
   * Return a 3D image url
   *
   * @example modules.image.treeDimension() // Schema
   * @example
   * modules.image.treeDimension().getValue()
   * @returns string
   */
  threeDimension() {
    return new Module<string>(() => this.buildUrl("3d"), {});
  }

  /**
   * Return a architecture image url
   *
   * @example modules.image.architecture() // Schema
   * @example
   * modules.image.architecture().getValue()
   * @returns string
   */
  architecture() {
    return new Module<string>(() => this.buildUrl("architecture"), {});
  }

  /**
   * Return a nature image url
   *
   * @example modules.image.nature() // Schema
   * @example
   * modules.image.nature().getValue()
   * @returns string
   */
  nature() {
    return new Module<string>(() => this.buildUrl("nature"), {});
  }

  /**
   * Return a fashion image url
   *
   * @example modules.image.fashion() // Schema
   * @example
   * modules.image.fashion().getValue()
   * @returns string
   */
  fashion() {
    return new Module<string>(() => this.buildUrl("fashion"), {});
  }

  /**
   * Return a film image url
   *
   * @example modules.image.film() // Schema
   * @example
   * modules.image.film().getValue()
   * @returns string
   */
  film() {
    return new Module<string>(() => this.buildUrl("film"), {});
  }

  /**
   * Return a people image url
   *
   * @example modules.image.people() // Schema
   * @example
   * modules.image.people().getValue()
   * @returns string
   */
  people() {
    return new Module<string>(() => this.buildUrl("people"), {});
  }

  /**
   * Return a health image url
   *
   * @example modules.image.health() // Schema
   * @example
   * modules.image.health().getValue()
   * @returns string
   */
  health() {
    return new Module<string>(() => this.buildUrl("health"), {});
  }

  /**
   * Return a house image url
   *
   * @example modules.image.house() // Schema
   * @example
   * modules.image.house().getValue()
   * @returns string
   */
  house() {
    return new Module<string>(() => this.buildUrl("house"), {});
  }

  /**
   * Return a street image url
   *
   * @example modules.image.street() // Schema
   * @example
   * modules.image.street().getValue()
   * @returns string
   */
  street() {
    return new Module<string>(() => this.buildUrl("street"), {});
  }

  /**
   * Return a animal image url
   *
   * @example modules.image.animal() // Schema
   * @example
   * modules.image.animal().getValue()
   * @returns string
   */
  animal() {
    return new Module<string>(() => this.buildUrl("animal"), {});
  }

  /**
   * Return a spiritual image url
   *
   * @example modules.image.spiritual() // Schema
   * @example
   * modules.image.spiritual().getValue()
   * @returns string
   */
  spiritual() {
    return new Module<string>(() => this.buildUrl("spiritual"), {});
  }

  /**
   * Return a travel image url
   *
   * @example modules.image.travel() // Schema
   * @example
   * modules.image.travel().getValue()
   * @returns string
   */
  travel() {
    return new Module<string>(() => this.buildUrl("travel"), {});
  }

  /**
   * Return a art image url
   *
   * @example modules.image.art() // Schema
   * @example
   * modules.image.art().getValue()
   * @returns string
   */
  art() {
    return new Module<string>(() => this.buildUrl("art"), {});
  }

  /**
   * Return a history image url
   *
   * @example modules.image.history() // Schema
   * @example
   * modules.image.history().getValue()
   * @returns string
   */
  history() {
    return new Module<string>(() => this.buildUrl("history"), {});
  }

  /**
   * Return a sport image url
   *
   * @example modules.image.sport() // Schema
   * @example
   * modules.image.sport().getValue()
   * @returns string
   */
  sport() {
    return new Module<string>(() => this.buildUrl("sport"), {});
  }

  /**
   * Return a animate avatar image url
   *
   * @example modules.image.animateAvatar() // Schema
   * @example
   * modules.image.animateAvatar().getValue()
   *
   * @returns string
   */
  animateAvatar() {
    return new Module<string>(() => {
      const ran = this.datatypeModule.int({ min: 0, max: 1000 }).getValue();

      return `https://api.multiavatar.com/${ran}.svg`;
    }, {});
  }
}
