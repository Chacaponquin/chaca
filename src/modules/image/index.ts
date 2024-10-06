import { DatatypeModule } from "../datatype";

interface ImageProps {
  width?: number;
  height?: number;
}

export class ImageModule {
  private readonly datatypeModule = new DatatypeModule();

  private buildUrl(
    category: string,
    {
      height = this.datatypeModule.int({ min: 640, max: 4000 }),
      width = this.datatypeModule.int({ min: 640, max: 4000 }),
    }: ImageProps = {},
  ) {
    const url = `https://loremflickr.com/${width}/${height}/${category}`;
    return url;
  }

  /**
   * Return a food image url
   *
   * @example
   * modules.image.food()
   * @returns string
   */
  food(props?: ImageProps): string {
    return this.buildUrl("food", props);
  }

  /**
   * Return a event image url
   *
   * @example
   * modules.image.event()
   * @returns string
   */
  event(props?: ImageProps): string {
    return this.buildUrl("event", props);
  }

  /**
   * Return a wallpaper image url
   *
   * @example
   * modules.image.wallpaper()
   * @returns string
   */
  wallpaper(props?: ImageProps): string {
    return this.buildUrl("wallpaper", props);
  }

  /**
   * Return a 3D image url
   *
   * @example
   * modules.image.treeDimension()
   * @returns string
   */
  threeDimension(props?: ImageProps): string {
    return this.buildUrl("3d", props);
  }

  /**
   * Return a architecture image url
   *
   * @example
   * modules.image.architecture()
   * @returns string
   */
  architecture(props?: ImageProps): string {
    return this.buildUrl("architecture", props);
  }

  /**
   * Return a nature image url
   *
   * @example
   * modules.image.nature()
   * @returns string
   */
  nature(props?: ImageProps): string {
    return this.buildUrl("nature", props);
  }

  /**
   * Return a fashion image url
   *
   * @example
   * modules.image.fashion()
   * @returns string
   */
  fashion(props?: ImageProps): string {
    return this.buildUrl("fashion", props);
  }

  /**
   * Return a film image url
   *
   * @example
   * modules.image.film()
   * @returns string
   */
  film(props?: ImageProps): string {
    return this.buildUrl("film", props);
  }

  /**
   * Return a people image url
   *
   * @example
   * modules.image.people()
   * @returns string
   */
  people(props?: ImageProps): string {
    return this.buildUrl("people", props);
  }

  /**
   * Return a health image url
   *
   * @example
   * modules.image.health()
   * @returns string
   */
  health(props?: ImageProps): string {
    return this.buildUrl("health", props);
  }

  /**
   * Return a house image url
   *
   * @example
   * modules.image.house()
   * @returns string
   */
  house(props?: ImageProps): string {
    return this.buildUrl("house", props);
  }

  /**
   * Return a street image url
   *
   * @example
   * modules.image.street()
   * @returns string
   */
  street(props?: ImageProps): string {
    return this.buildUrl("street", props);
  }

  /**
   * Return a animal image url
   *
   * @example
   * modules.image.animal()
   * @returns string
   */
  animal(props?: ImageProps): string {
    return this.buildUrl("animal", props);
  }

  /**
   * Return a spiritual image url
   *
   * @example
   * modules.image.spiritual()
   * @returns string
   */
  spiritual(props?: ImageProps): string {
    return this.buildUrl("spiritual", props);
  }

  /**
   * Return a travel image url
   *
   * @example
   * modules.image.travel()
   * @returns string
   */
  travel(props?: ImageProps): string {
    return this.buildUrl("travel", props);
  }

  /**
   * Return a art image url
   *
   * @example
   * modules.image.art()
   * @returns string
   */
  art(props?: ImageProps): string {
    return this.buildUrl("art", props);
  }

  /**
   * Return a history image url
   *
   * @example
   * modules.image.history()
   * @returns string
   */
  history(props?: ImageProps): string {
    return this.buildUrl("history", props);
  }

  /**
   * Return a sport image url
   *
   * @example
   * modules.image.sport()
   * @returns string
   */
  sport(props?: ImageProps): string {
    return this.buildUrl("sport", props);
  }

  /**
   * Return a animate avatar image url
   *
   * @example
   * modules.image.animateAvatar()
   *
   * @returns string
   */
  animatedAvatar(): string {
    const ran = this.datatypeModule.int({ min: 0, max: 1000 });

    return `https://api.multiavatar.com/${ran}.svg`;
  }
}
