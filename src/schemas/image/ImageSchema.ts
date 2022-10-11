import { CHDataUtils } from '../../utils/CHDataUtils';
import { SchemaField } from '../../utils/SchemaField';
import { IMAGES_DEFINITIONS } from './constants/images';

export class ImageSchema {
  food() {
    return new SchemaField<string>(
      'food',
      () => {
        return CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.food);
      },
      {},
    );
  }

  event() {
    return new SchemaField<string>(
      'events',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.event),
      {},
    );
  }

  wallpaper() {
    return new SchemaField<string>(
      'wallpaper',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.wallpaper),
      {},
    );
  }

  treeDimension() {
    return new SchemaField<string>(
      '3D',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS['3d']),
      {},
    );
  }

  architecture() {
    return new SchemaField<string>(
      'archiecture',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.architecture),
      {},
    );
  }

  nature() {
    return new SchemaField<string>(
      'nature',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.nature),
      {},
    );
  }

  fashion() {
    return new SchemaField<string>(
      'fashion',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.fashion),
      {},
    );
  }

  film() {
    return new SchemaField<string>(
      'film',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.film),
      {},
    );
  }

  people() {
    return new SchemaField<string>(
      'people',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.people),
      {},
    );
  }

  health() {
    return new SchemaField<string>(
      'health',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.health),
      {},
    );
  }

  house() {
    return new SchemaField<string>(
      'house',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.architecture),
      {},
    );
  }

  street() {
    return new SchemaField<string>(
      'street',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.street),
      {},
    );
  }

  animal() {
    return new SchemaField<string>(
      'animal',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.animal),
      {},
    );
  }

  spiritual() {
    return new SchemaField<string>(
      'spiritual',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.spirituality),
      {},
    );
  }

  travel() {
    return new SchemaField<string>(
      'travel',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.travel),
      {},
    );
  }

  art() {
    return new SchemaField<string>(
      'art',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.art),
      {},
    );
  }

  history() {
    return new SchemaField<string>(
      'history',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.history),
      {},
    );
  }

  sport() {
    return new SchemaField<string>(
      'sport',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.sport),
      {},
    );
  }
}
