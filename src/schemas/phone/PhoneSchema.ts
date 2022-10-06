import { faker } from '@faker-js/faker';
import { CHDataUtils } from '../../utils/CHDataUtils';
import { SchemaField } from '../../utils/SchemaField';
import { PHONE_PREFIX } from './constants/phonePrefix';

export class PhoneSchema {
  number() {
    return new SchemaField<string>('number', () => faker.phone.number(), {});
  }

  prefix() {
    return new SchemaField<string>(
      'prefix',
      () => CHDataUtils.oneOfArray(PHONE_PREFIX.map((el) => el.code)),
      {},
    );
  }
}
