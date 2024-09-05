import { DatatypeModule } from "../datatype";

export class ImageModule {
  private buildUrl(category: string) {
    const url = "https://source.unsplash.com/category";
    return `${url}/${category}`;
  }

  /**
   * Return a food image url
   *
   * @example
   * modules.image.food()
   * @returns string
   */
  food(): string {
    return this.buildUrl("food");
  }

  /**
   * Return a event image url
   *
   * @example
   * modules.image.event()
   * @returns string
   */
  event(): string {
    return this.buildUrl("event");
  }

  /**
   * Return a wallpaper image url
   *
   * @example
   * modules.image.wallpaper()
   * @returns string
   */
  wallpaper(): string {
    return this.buildUrl("wallpaper");
  }

  /**
   * Return a 3D image url
   *
   * @example
   * modules.image.treeDimension()
   * @returns string
   */
  threeDimension(): string {
    return this.buildUrl("3d");
  }

  /**
   * Return a architecture image url
   *
   * @example
   * modules.image.architecture()
   * @returns string
   */
  architecture(): string {
    return this.buildUrl("architecture");
  }

  /**
   * Return a nature image url
   *
   * @example
   * modules.image.nature()
   * @returns string
   */
  nature(): string {
    return this.buildUrl("nature");
  }

  /**
   * Return a fashion image url
   *
   * @example
   * modules.image.fashion()
   * @returns string
   */
  fashion(): string {
    return this.buildUrl("fashion");
  }

  /**
   * Return a film image url
   *
   * @example
   * modules.image.film()
   * @returns string
   */
  film(): string {
    return this.buildUrl("film");
  }

  /**
   * Return a people image url
   *
   * @example
   * modules.image.people()
   * @returns string
   */
  people(): string {
    return this.buildUrl("people");
  }

  /**
   * Return a health image url
   *
   * @example
   * modules.image.health()
   * @returns string
   */
  health(): string {
    return this.buildUrl("health");
  }

  /**
   * Return a house image url
   *
   * @example
   * modules.image.house()
   * @returns string
   */
  house(): string {
    return this.buildUrl("house");
  }

  /**
   * Return a street image url
   *
   * @example
   * modules.image.street()
   * @returns string
   */
  street(): string {
    return this.buildUrl("street");
  }

  /**
   * Return a animal image url
   *
   * @example
   * modules.image.animal()
   * @returns string
   */
  animal(): string {
    return this.buildUrl("animal");
  }

  /**
   * Return a spiritual image url
   *
   * @example
   * modules.image.spiritual()
   * @returns string
   */
  spiritual(): string {
    return this.buildUrl("spiritual");
  }

  /**
   * Return a travel image url
   *
   * @example
   * modules.image.travel()
   * @returns string
   */
  travel(): string {
    return this.buildUrl("travel");
  }

  /**
   * Return a art image url
   *
   * @example
   * modules.image.art()
   * @returns string
   */
  art(): string {
    return this.buildUrl("art");
  }

  /**
   * Return a history image url
   *
   * @example
   * modules.image.history()
   * @returns string
   */
  history(): string {
    return this.buildUrl("history");
  }

  /**
   * Return a sport image url
   *
   * @example
   * modules.image.sport()
   * @returns string
   */
  sport(): string {
    return this.buildUrl("sport");
  }

  /**
   * Return a animate avatar image url
   *
   * @example
   * modules.image.animateAvatar()
   *
   * @returns string
   */
  animateAvatar(): string {
    const datatypeModule = new DatatypeModule();
    const ran = datatypeModule.int({ min: 0, max: 1000 });

    return `https://api.multiavatar.com/${ran}.svg`;
  }
}
