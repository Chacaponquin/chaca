import { ChacaUtils } from "../../core/classes/ChacaUtils/ChacaUtils.js";
import { SchemaField } from "../SchemaField.js";
import { VIDEOS_DEFINITIONS } from "./constants/videos.js";

export class VideoSchema {
  private utils = new ChacaUtils();

  public readonly constants = { ...VIDEOS_DEFINITIONS };

  /**
   * Return a food video url
   *
   * @example schemas.video.food() // Schema
   * @example
   * schemas.video.food().getValue()
   * @returns string
   */
  food() {
    return new SchemaField<string>(
      "food",
      () => {
        return this.utils.oneOfArray(VIDEOS_DEFINITIONS.food);
      },
      {},
    );
  }

  /**
   * Return a event video url
   *
   * @example schemas.video.event() // Schema
   * @example
   * schemas.video.event().getValue()
   * @returns string
   */
  event() {
    return new SchemaField<string>(
      "event",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.event),
      {},
    );
  }

  /**
   * Return a wallpaper video url
   *
   * @example schemas.video.wallpaper() // Schema
   * @example
   * schemas.video.wallpaper().getValue()
   * @returns string
   */
  wallpaper() {
    return new SchemaField<string>(
      "wallpaper",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.wallpaper),
      {},
    );
  }

  /**
   * Return a 3D video url
   *
   * @example schemas.video.treeDimension() // Schema
   * @example
   * schemas.video.treeDimension().getValue()
   * @returns string
   */
  treeDimension() {
    return new SchemaField<string>(
      "3D",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS["3d"]),
      {},
    );
  }

  /**
   * Return a sport video url
   *
   * @example schemas.video.sport() // Schema
   * @example
   * schemas.video.sport().getValue()
   * @returns string
   */
  sport() {
    return new SchemaField<string>(
      "sport",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.sport),
      {},
    );
  }

  /**
   * Return a animal video url
   *
   * @example schemas.video.animal() // Schema
   * @example
   * schemas.video.animal().getValue()
   * @returns string
   */
  animal() {
    return new SchemaField<string>(
      "animal",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.animal),
      {},
    );
  }

  /**
   * Return a experimental video url
   * @example schemas.video.experimental() // Schema
   * @example
   * schemas.video.experimental().getValue()
   * @returns string
   */
  experimental() {
    return new SchemaField<string>(
      "experimental",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.experimental),
      {},
    );
  }

  /**
   * Return a architecture video url
   * @example schemas.video.architecture() // Schema
   * @example
   * schemas.video.architecture().getValue()
   * @returns string
   */
  architecture() {
    return new SchemaField<string>(
      "architecture",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.architecture),
      {},
    );
  }

  /**
   * Return a nature video url
   * @example schemas.video.nature() // Schema
   * @example
   * schemas.video.nature().getValue()
   * @returns string
   */
  nature() {
    return new SchemaField<string>(
      "nature",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.nature),
      {},
    );
  }

  /**
   * Return a fashion video url
   * @example schemas.video.fashion() // Schema
   * @example
   * schemas.video.fashion().getValue()
   * @returns string
   */
  fashion() {
    return new SchemaField<string>(
      "fashion",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.fashion),
      {},
    );
  }

  /**
   * Return a health video url
   * @example schemas.video.health() // Schema
   * @example
   * schemas.video.health().getValue()
   * @returns string
   */
  health() {
    return new SchemaField<string>(
      "health",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.health),
      {},
    );
  }

  /**
   * Return a people video url
   * @example schemas.video.people() // Schema
   * @example
   * schemas.video.people().getValue()
   * @returns string
   */
  people() {
    return new SchemaField<string>(
      "people",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.people),
      {},
    );
  }

  /**
   * Return a street video url
   * @example schemas.video.street() // Schema
   * @example
   * schemas.video.street().getValue()
   * @returns string
   */
  street() {
    return new SchemaField<string>(
      "street",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.street),
      {},
    );
  }

  /**
   * Return a spiritual video url
   * @example schemas.video.spiritual() // Schema
   * @example
   * schemas.video.spiritual().getValue()
   * @returns string
   */
  spiritual() {
    return new SchemaField<string>(
      "spiritual",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.spirituality),
      {},
    );
  }

  /**
   * Return a travel video url
   * @example schemas.video.travel() // Schema
   * @example
   * schemas.video.travel().getValue()
   * @returns string
   */
  travel() {
    return new SchemaField<string>(
      "travel",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.travel),
      {},
    );
  }

  /**
   * Return a art video url
   * @example schemas.video.art() // Schema
   * @example
   * schemas.video.art().getValue()
   * @returns string
   */
  art() {
    return new SchemaField<string>(
      "art",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.art),
      {},
    );
  }

  /**
   * Return a history video url
   * @example schemas.video.history() // Schema
   * @example
   * schemas.video.history().getValue()
   * @returns string
   */
  history() {
    return new SchemaField<string>(
      "history",
      () => this.utils.oneOfArray(VIDEOS_DEFINITIONS.history),
      {},
    );
  }
}
