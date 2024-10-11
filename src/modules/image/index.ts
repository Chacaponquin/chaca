import { DatatypeModule } from "../datatype";
import { WordModule } from "../word";

interface ImageProps {
  width?: number;
  height?: number;
}

interface CategoryProps {
  width?: number;
  height?: number;
  category?: string;
}

export class ImageModule {
  private readonly datatypeModule = new DatatypeModule();
  private readonly wordModule = new WordModule();

  private buildUrl(
    category: string = this.wordModule.noun({ language: "en" }),
    { height: iheight, width: iwidth }: ImageProps = {},
  ) {
    const size = this.datatypeModule.int({ min: 640, max: 4000 });

    const width = iwidth ? iwidth : size;
    const height = iheight ? iheight : size;

    const url = `https://loremflickr.com/${width}/${height}/${category}`;
    return url;
  }

  /**
   * Returns an image url from a category
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @example
   * modules.image.category({ category: "soccer" })
   *
   * @returns string
   */
  category(props: CategoryProps = {}): string {
    return this.buildUrl(props.category, props);
  }

  /**
   * Return a food image url
   *
   * @example
   * modules.image.food()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
   *
   * @param args.witdh image width
   * @param args.height image height
   *
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
