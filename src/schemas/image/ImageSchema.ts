import { CHDataUtils } from '../../utils/CHDataUtils';
import { SchemaField } from '../../utils/SchemaField';
import { IMAGES_DEFINITIONS } from './constants/images';

export class ImageSchema {
  food() {
    return new SchemaField<string>(
      'food',
      () => {
        return CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.foodDrink);
      },
      {},
    );
  }

  event() {
    return new SchemaField<string>(
      'events',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.currentEvents),
      {},
    );
  }

  wallpaper() {
    return new SchemaField<string>(
      'wallpaper',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.wallpapers),
      {},
    );
  }

  treeDimension() {
    return new SchemaField<string>(
      '3D',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS['3DRenders']),
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

  work() {
    return new SchemaField<string>(
      'work',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS['business&Work']),
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
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS['health&Wellness']),
      {},
    );
  }

  house() {
    return new SchemaField<string>(
      'house',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.interiors),
      {},
    );
  }

  street() {
    return new SchemaField<string>(
      'street',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.streetPhotography),
      {},
    );
  }

  animal() {
    return new SchemaField<string>(
      'animal',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.animals),
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
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS['arts&Culture']),
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
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.athletics),
      {},
    );
  }

  covid() {
    return new SchemaField<string>(
      'covid',
      () => CHDataUtils.oneOfArray(IMAGES_DEFINITIONS.covid19),
      {},
    );
  }
}
