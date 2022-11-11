import { PrivateUtils } from "../../utils/helpers/PrivateUtils";
import { SchemaField } from "../SchemaField";
import { IMAGES_DEFINITIONS } from "./constants/images";

export class ImageSchema {
  /**
   * Return a food image url
   *
   * @example schemas.image.food() // Schema
   * @example
   * schemas.image.food().getValue()
   * @returns string
   */
  food() {
    return new SchemaField<string>(
      "food",
      () => {
        return PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.food);
      },
      {},
    );
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
    return new SchemaField<string>(
      "events",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.event),
      {},
    );
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
    return new SchemaField<string>(
      "wallpaper",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.wallpaper),
      {},
    );
  }

  /**
   * Return a 3D image url
   *
   * @example schemas.image.treeDimension() // Schema
   * @example
   * schemas.image.treeDimension().getValue()
   * @returns string
   */
  treeDimension() {
    return new SchemaField<string>(
      "3D",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS["3d"]),
      {},
    );
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
    return new SchemaField<string>(
      "archiecture",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.architecture),
      {},
    );
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
    return new SchemaField<string>(
      "nature",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.nature),
      {},
    );
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
    return new SchemaField<string>(
      "fashion",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.fashion),
      {},
    );
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
    return new SchemaField<string>(
      "film",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.film),
      {},
    );
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
    return new SchemaField<string>(
      "people",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.people),
      {},
    );
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
    return new SchemaField<string>(
      "health",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.health),
      {},
    );
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
    return new SchemaField<string>(
      "house",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.architecture),
      {},
    );
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
    return new SchemaField<string>(
      "street",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.street),
      {},
    );
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
    return new SchemaField<string>(
      "animal",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.animal),
      {},
    );
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
    return new SchemaField<string>(
      "spiritual",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.spirituality),
      {},
    );
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
    return new SchemaField<string>(
      "travel",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.travel),
      {},
    );
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
    return new SchemaField<string>(
      "art",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.art),
      {},
    );
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
    return new SchemaField<string>(
      "history",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.history),
      {},
    );
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
    return new SchemaField<string>(
      "sport",
      () => PrivateUtils.oneOfArray(IMAGES_DEFINITIONS.sport),
      {},
    );
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
    return new SchemaField<string>(
      "animateAvatar",
      () =>
        `https://api.multiavatar.com/${Number(Math.random() * 1000).toFixed(
          0,
        )}.svg`,
      {},
    );
  }
}
