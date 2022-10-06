import { faker } from '@faker-js/faker';
import { SchemaField } from '../../utils/SchemaField';

export class SystemSchema {
  fileName() {
    return new SchemaField<string>(
      'fileName',
      () => faker.system.fileName(),
      {},
    );
  }

  fileExt() {
    return new SchemaField<string>(
      'fileExt',
      () => faker.system.commonFileExt(),
      {},
    );
  }

  directoryPath() {
    return new SchemaField<string>(
      'directoryPath',
      () => faker.system.directoryPath(),
      {},
    );
  }

  filePath() {
    return new SchemaField<string>(
      'filePath',
      () => faker.system.filePath(),
      {},
    );
  }

  semServer() {
    return new SchemaField<string>(
      'semServer',
      () => faker.system.semver(),
      {},
    );
  }
}
