export class SequentialFieldResolver<K = any> {
  constructor(public readonly valuesArray: Array<K>) {}
}
