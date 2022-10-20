import { SchemaField } from '../../utils/SchemaField';
import { CHDataUtils } from '../../utils/CHDataUtils';
import { CLASS_NAMES } from './constants/variables';
import { PROGRAMMING_LANGUAGES } from './constants/languages';

export class CodeSchema {
  className() {
    return new SchemaField<string>(
      'className',
      () => {
        return CHDataUtils.oneOfArray(CLASS_NAMES);
      },
      {},
    );
  }

  language() {
    return new SchemaField<string>(
      'programmingLanguage',
      () => CHDataUtils.oneOfArray(PROGRAMMING_LANGUAGES),
      {},
    );
  }
}
