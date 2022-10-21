import { faker } from '@faker-js/faker';
import { CHDataUtils } from '../../utils/CHDataUtils';
import { SchemaField } from '../../utils/SchemaField';
import WORDS from './constants';

type AdjectiveProps = {
  language?: 'es' | 'es';
};

export class LanguageSchema {
  adjective(args?: AdjectiveProps) {
    return new SchemaField<string, AdjectiveProps>(
      'adjective',
      (a) => {
        if (a.language && typeof a.language === 'string') {
          const languageSelected = WORDS[a.language];
          if (languageSelected) {
            return CHDataUtils.oneOfArray(languageSelected.adjectives);
          } else {
            return CHDataUtils.oneOfArray(WORDS['en'].adjectives);
          }
        } else return CHDataUtils.oneOfArray(WORDS['en'].adjectives);
      },
      args || {},
    );
  }
}