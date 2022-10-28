import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";
import { VIDEOS_DEFINITIONS } from "./constants/videos";

export class VideoSchema {
  food() {
    return new SchemaField<string>(
      "food",
      () => {
        return CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.food);
      },
      {},
    );
  }

  event() {
    return new SchemaField<string>(
      "event",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.event),
      {},
    );
  }

  wallpaper() {
    return new SchemaField<string>(
      "wallpaper",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.wallpaper),
      {},
    );
  }

  treeD() {
    return new SchemaField<string>(
      "3D",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS["3d"]),
      {},
    );
  }

  sport() {
    return new SchemaField<string>(
      "sport",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.sport),
      {},
    );
  }

  animal() {
    return new SchemaField<string>(
      "animal",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.animal),
      {},
    );
  }

  experimental() {
    return new SchemaField<string>(
      "experimental",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.experimental),
      {},
    );
  }

  aechitecture() {
    return new SchemaField<string>(
      "architecture",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.architecture),
      {},
    );
  }

  nature() {
    return new SchemaField<string>(
      "nature",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.nature),
      {},
    );
  }

  fashion() {
    return new SchemaField<string>(
      "fashion",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.fashion),
      {},
    );
  }

  health() {
    return new SchemaField<string>(
      "health",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.health),
      {},
    );
  }

  people() {
    return new SchemaField<string>(
      "people",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.people),
      {},
    );
  }

  street() {
    return new SchemaField<string>(
      "street",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.street),
      {},
    );
  }

  spiritual() {
    return new SchemaField<string>(
      "spiritual",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.spirituality),
      {},
    );
  }

  travel() {
    return new SchemaField<string>(
      "travel",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.travel),
      {},
    );
  }

  art() {
    return new SchemaField<string>(
      "art",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.art),
      {},
    );
  }

  history() {
    return new SchemaField<string>(
      "history",
      () => CHDataUtils.oneOfArray(VIDEOS_DEFINITIONS.history),
      {},
    );
  }
}
