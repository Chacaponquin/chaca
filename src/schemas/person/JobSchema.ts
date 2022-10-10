import { faker } from '@faker-js/faker';
import { SchemaField } from '../../utils/SchemaField';

export class PersonSchema {
  jobTitle() {
    return new SchemaField<string>('jobTitle', faker.name.jobTitle, {});
  }

  jobType() {
    return new SchemaField<string>('jobType', faker.name.jobType, {});
  }

  jobArea() {
    return new SchemaField<string>('area', faker.name.jobArea, {});
  }
}
