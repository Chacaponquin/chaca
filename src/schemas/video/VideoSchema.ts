import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";
import { VIDEOS_DEFINITIONS } from "./constants/videos";

export class VideoSchema {
  /**
   * Return a food video url
   *
   * @example
   * schemas.video.food().getValue()
   * @returns string
   */
  food() {
    return new SchemaField<string>(
      "food",
      () => {
        return CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.food);
      },
      {},
    );
  }

  /**
   * Return a event video url
   *
   * @example
   * schemas.video.event().getValue()
   * @returns string
   */
  event() {
    return new SchemaField<string>(
      "event",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.event),
      {},
    );
  }

  /**
   * Return a wallpaper video url
   *
   * @example
   * schemas.video.wallpaper().getValue()
   * @returns string
   */
  wallpaper() {
    return new SchemaField<string>(
      "wallpaper",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.wallpaper),
      {},
    );
  }

  /**
   * Return a 3D video url
   *
   * @example
   * schemas.video.treeDimension().getValue()
   * @returns string
   */
  treeDimension() {
    return new SchemaField<string>(
      "3D",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS["3d"]),
      {},
    );
  }

  /**
   * Return a sport video url
   *
   * @example
   * schemas.video.sport().getValue()
   * @returns string
   */
  sport() {
    return new SchemaField<string>(
      "sport",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.sport),
      {},
    );
  }

  /**
   * Return a animal video url
   *
   * @example
   * schemas.video.animal().getValue()
   * @returns string
   */
  animal() {
    return new SchemaField<string>(
      "animal",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.animal),
      {},
    );
  }

  /**
   * Return a experimental video url
   *
   * @example
   * schemas.video.experimental().getValue()
   * @returns string
   */
  experimental() {
    return new SchemaField<string>(
      "experimental",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.experimental),
      {},
    );
  }

  /**
   * Return a architecture video url
   *
   * @example
   * schemas.video.architecture().getValue()
   * @returns string
   */
  architecture() {
    return new SchemaField<string>(
      "architecture",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.architecture),
      {},
    );
  }

  /**
   * Return a nature video url
   *
   * @example
   * schemas.video.nature().getValue()
   * @returns string
   */
  nature() {
    return new SchemaField<string>(
      "nature",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.nature),
      {},
    );
  }

  /**
   * Return a fashion video url
   *
   * @example
   * schemas.video.fashion().getValue()
   * @returns string
   */
  fashion() {
    return new SchemaField<string>(
      "fashion",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.fashion),
      {},
    );
  }

  /**
   * Return a health video url
   *
   * @example
   * schemas.video.health().getValue()
   * @returns string
   */
  health() {
    return new SchemaField<string>(
      "health",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.health),
      {},
    );
  }

  /**
   * Return a people video url
   *
   * @example
   * schemas.video.people().getValue()
   * @returns string
   */
  people() {
    return new SchemaField<string>(
      "people",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.people),
      {},
    );
  }

  /**
   * Return a street video url
   *
   * @example
   * schemas.video.street().getValue()
   * @returns string
   */
  street() {
    return new SchemaField<string>(
      "street",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.street),
      {},
    );
  }

  /**
   * Return a spiritual video url
   *
   * @example
   * schemas.video.spiritual().getValue()
   * @returns string
   */
  spiritual() {
    return new SchemaField<string>(
      "spiritual",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.spirituality),
      {},
    );
  }

  /**
   * Return a travel video url
   *
   * @example
   * schemas.video.travel().getValue()
   * @returns string
   */
  travel() {
    return new SchemaField<string>(
      "travel",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.travel),
      {},
    );
  }

  /**
   * Return a art video url
   *
   * @example
   * schemas.video.art().getValue()
   * @returns string
   */
  art() {
    return new SchemaField<string>(
      "art",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.art),
      {},
    );
  }

  /**
   * Return a history video url
   *
   * @example
   * schemas.video.history().getValue()
   * @returns string
   */
  history() {
    return new SchemaField<string>(
      "history",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.history),
      {},
    );
  }
}
