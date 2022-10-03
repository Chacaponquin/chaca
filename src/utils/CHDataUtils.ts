import { faker } from '@faker-js/faker';
export class CHDataUtils {
  public static oneOfArray<T = any>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
  public static numberByLimits({ min, max }: { min: number; max: number }) {
    return faker.datatype.number({ min, max, precision: 1 });
  }
  public static characters(type?: 'lower' | 'upper'): string[] {
    const allCharacters = 'abcdefghijklmnopqrstuvwxyz';

    if (type === 'lower') return allCharacters.split('');
    else if (type === 'upper')
      return allCharacters.split('').map((el) => el.toUpperCase());
    else {
      const mayus = allCharacters.split('').map((el) => el.toUpperCase());
      const minus = allCharacters.split('');
      mayus.forEach((el) => minus.push(el));

      return minus;
    }
  }
}
