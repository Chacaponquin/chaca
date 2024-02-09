import { SchemaField } from "../SchemaField";
import { DataTypeSchema } from "../dataType/DataTypeSchema";

export class ImageSchema {
  private dataTypeSchema = new DataTypeSchema();

  private buildUrl(category: string) {
    const url = "https://source.unsplash.com/category";
    return `${url}/${category}`;
  }

  /**
   * Return a food image url
   *
   * @example schemas.image.food() // Schema
   * @example
   * schemas.image.food().getValue()
   * @returns string
   */
  food() {
    return new SchemaField<string>(() => {
      return this.buildUrl("food");
    }, {});
  }

  /**
   * Return a event image url
   *
   * @example schemas.image.event() // Schema
   * @example
   * schemas.image.event().getValue()
   * @returns string
   */
  event() {
    return new SchemaField<string>(() => this.buildUrl("event"), {});
  }

  /**
   * Return a wallpaper image url
   *
   * @example schemas.image.wallpaper() // Schema
   * @example
   * schemas.image.wallpaper().getValue()
   * @returns string
   */
  wallpaper() {
    return new SchemaField<string>(() => this.buildUrl("wallpaper"), {});
  }

  /**
   * Return a 3D image url
   *
   * @example schemas.image.treeDimension() // Schema
   * @example
   * schemas.image.treeDimension().getValue()
   * @returns string
   */
  threeDimension() {
    return new SchemaField<string>(() => this.buildUrl("3d"), {});
  }

  /**
   * Return a architecture image url
   *
   * @example schemas.image.architecture() // Schema
   * @example
   * schemas.image.architecture().getValue()
   * @returns string
   */
  architecture() {
    return new SchemaField<string>(() => this.buildUrl("architecture"), {});
  }

  /**
   * Return a nature image url
   *
   * @example schemas.image.nature() // Schema
   * @example
   * schemas.image.nature().getValue()
   * @returns string
   */
  nature() {
    return new SchemaField<string>(() => this.buildUrl("nature"), {});
  }

  /**
   * Return a fashion image url
   *
   * @example schemas.image.fashion() // Schema
   * @example
   * schemas.image.fashion().getValue()
   * @returns string
   */
  fashion() {
    return new SchemaField<string>(() => this.buildUrl("fashion"), {});
  }

  /**
   * Return a film image url
   *
   * @example schemas.image.film() // Schema
   * @example
   * schemas.image.film().getValue()
   * @returns string
   */
  film() {
    return new SchemaField<string>(() => this.buildUrl("film"), {});
  }

  /**
   * Return a people image url
   *
   * @example schemas.image.people() // Schema
   * @example
   * schemas.image.people().getValue()
   * @returns string
   */
  people() {
    return new SchemaField<string>(() => this.buildUrl("people"), {});
  }

  /**
   * Return a health image url
   *
   * @example schemas.image.health() // Schema
   * @example
   * schemas.image.health().getValue()
   * @returns string
   */
  health() {
    return new SchemaField<string>(() => this.buildUrl("health"), {});
  }

  /**
   * Return a house image url
   *
   * @example schemas.image.house() // Schema
   * @example
   * schemas.image.house().getValue()
   * @returns string
   */
  house() {
    return new SchemaField<string>(() => this.buildUrl("house"), {});
  }

  /**
   * Return a street image url
   *
   * @example schemas.image.street() // Schema
   * @example
   * schemas.image.street().getValue()
   * @returns string
   */
  street() {
    return new SchemaField<string>(() => this.buildUrl("street"), {});
  }

  /**
   * Return a animal image url
   *
   * @example schemas.image.animal() // Schema
   * @example
   * schemas.image.animal().getValue()
   * @returns string
   */
  animal() {
    return new SchemaField<string>(() => this.buildUrl("animal"), {});
  }

  /**
   * Return a spiritual image url
   *
   * @example schemas.image.spiritual() // Schema
   * @example
   * schemas.image.spiritual().getValue()
   * @returns string
   */
  spiritual() {
    return new SchemaField<string>(() => this.buildUrl("spiritual"), {});
  }

  /**
   * Return a travel image url
   *
   * @example schemas.image.travel() // Schema
   * @example
   * schemas.image.travel().getValue()
   * @returns string
   */
  travel() {
    return new SchemaField<string>(() => this.buildUrl("travel"), {});
  }

  /**
   * Return a art image url
   *
   * @example schemas.image.art() // Schema
   * @example
   * schemas.image.art().getValue()
   * @returns string
   */
  art() {
    return new SchemaField<string>(() => this.buildUrl("art"), {});
  }

  /**
   * Return a history image url
   *
   * @example schemas.image.history() // Schema
   * @example
   * schemas.image.history().getValue()
   * @returns string
   */
  history() {
    return new SchemaField<string>(() => this.buildUrl("history"), {});
  }

  /**
   * Return a sport image url
   *
   * @example schemas.image.sport() // Schema
   * @example
   * schemas.image.sport().getValue()
   * @returns string
   */
  sport() {
    return new SchemaField<string>(() => this.buildUrl("sport"), {});
  }

  /**
   * Return a animate avatar image url
   *
   * @example schemas.image.animateAvatar() // Schema
   * @example
   * schemas.image.animateAvatar().getValue()
   *
   * @returns string
   */
  animateAvatar() {
    return new SchemaField<string>(() => {
      const ran = this.dataTypeSchema.int({ min: 0, max: 1000 }).getValue();

      return `https://api.multiavatar.com/${ran}.svg`;
    }, {});
  }
}
