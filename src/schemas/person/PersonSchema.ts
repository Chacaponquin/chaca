import { faker } from '@faker-js/faker';
import { CHDataUtils } from '../../utils/CHDataUtils';
import { SchemaField } from '../../utils/SchemaField';
import NAMES, { ILanguageNames } from './constants';

type AllLanguages = 'es' | 'en';

type LangugeProps = {
  language?: AllLanguages;
};

type Sex = 'male' | 'female';

type NameProps = {
  language?: AllLanguages;
  sex?: Sex;
};

type SexProps = {
  sex?: Sex;
};

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

  gender() {
    return new SchemaField<string>('gender', faker.name.gender, {});
  }

  sex() {
    return new SchemaField<string>(
      'sex',
      () => CHDataUtils.oneOfArray(['male', 'female']),
      {},
    );
  }

  firstName(args?: NameProps) {
    return new SchemaField<string, NameProps>(
      'firstName',
      (a) => {
        return CHDataUtils.oneOfArray(
          this.filterBySex(this.filterNameByLanguage(a.language), a.sex),
        );
      },
      args || {},
    );
  }

  lastName(args?: LangugeProps) {
    return new SchemaField<string, LangugeProps>(
      'lastName',
      (a) => {
        return CHDataUtils.oneOfArray(
          this.filterNameByLanguage(a.language).lastNames,
        );
      },
      args || {},
    );
  }

  fullName(args?: NameProps) {
    return new SchemaField<string, NameProps>(
      'fullName',
      (a) => {
        const lan = this.filterNameByLanguage(a.language);

        const firstName = CHDataUtils.oneOfArray(this.filterBySex(lan, a.sex));
        const middleName = CHDataUtils.oneOfArray([true, false])
          ? CHDataUtils.oneOfArray(this.filterBySex(lan, a.sex))
          : undefined;
        const lastNameFirst = CHDataUtils.oneOfArray(lan.lastNames);
        const lastNameSecond = CHDataUtils.oneOfArray(lan.lastNames);

        const fullName = [firstName, middleName, lastNameFirst, lastNameSecond];

        let retString = '';
        for (let i = 0; i < fullName.length; i++) {
          if (fullName[i]) retString += `${fullName[i]} `;
        }

        return retString;
      },
      args || {},
    );
  }

  prefix(args?: SexProps) {
    return new SchemaField<string, SexProps>(
      'preffix',
      (a) => faker.name.prefix(a.sex),
      args || {},
    );
  }

  private filterNameByLanguage(language: string | undefined): ILanguageNames {
    if (language && typeof language === 'string') {
      const nameSelected = NAMES[language];
      if (nameSelected) return nameSelected;
      else return NAMES['en'];
    } else return NAMES['en'];
  }

  private filterBySex(
    nameSel: ILanguageNames,
    sex: string | undefined,
  ): string[] {
    if (sex && typeof sex === 'string') {
      const selSex = nameSel[sex];
      if (selSex) return selSex;
      else return [...nameSel.male, ...nameSel.female];
    }

    return [...nameSel.male, ...nameSel.female];
  }
}
