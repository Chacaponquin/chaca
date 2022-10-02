import { faker } from "@faker-js/faker";
export class CHDataUtils {
  public static oneOfArray<T = any>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
  public static numberByLimits({ min, max }: { min: number; max: number }) {
    return faker.datatype.number({ min, max, precision: 1 });
  }
}
