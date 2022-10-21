import { SchemaField } from '../../utils/SchemaField';
import { faker } from '@faker-js/faker';

export class AnimalSchema {
  dog() {
    return new SchemaField<string>('dog', faker.animal.dog, {});
  }

  bear() {
    return new SchemaField<string>('bear', faker.animal.bear, {});
  }

  bird() {
    return new SchemaField<string>('bird', faker.animal.bird, {});
  }

  cat() {
    return new SchemaField<string>('cat', faker.animal.cat, {});
  }

  cetacean() {
    return new SchemaField<string>('cetacean', faker.animal.cetacean, {});
  }

  cow() {
    return new SchemaField<string>('cow', faker.animal.cow, {});
  }

  crocodilia() {
    return new SchemaField<string>('crocodilia', faker.animal.crocodilia, {});
  }

  fish() {
    return new SchemaField<string>('fish', faker.animal.fish, {});
  }

  horse() {
    return new SchemaField<string>('horse', faker.animal.horse, {});
  }

  insect() {
    return new SchemaField<string>('insect', faker.animal.insect, {});
  }

  lion() {
    return new SchemaField<string>('lion', faker.animal.lion, {});
  }

  rabbit() {
    return new SchemaField<string>('rabbit', faker.animal.rabbit, {});
  }

  rodent() {
    return new SchemaField<string>('rodent', faker.animal.rodent, {});
  }

  snake() {
    return new SchemaField<string>('snake', faker.animal.snake, {});
  }

  animalType() {
    return new SchemaField<string>('animalType', faker.animal.type, {});
  }
}
