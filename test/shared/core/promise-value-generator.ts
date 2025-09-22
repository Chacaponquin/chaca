export class PromiseGeneratorValue {
  static execute<T>(value: T): Promise<T> {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(value), 100);
    });
  }
}
