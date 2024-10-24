interface FilterProps<T> {
  string(value: string): T;
  int(value: number): T;
  float(value: number): T;
  nan(value: number): T;
  bigint(value: bigint): T;
  function(): T;
  symbol(): T;
  date(value: Date): T;
  array(value: any[]): T;
  null(): T;
  object(value: any): T;
  undefined(): T;
  boolean(value: boolean): T;
  regexp(value: RegExp): T;
}

export class Datatype {
  static filter<T>(value: any, props: FilterProps<T>): T {
    let type: T;

    if (typeof value === "string") {
      type = props.string(value);
    } else if (typeof value === "number") {
      if (Number.isNaN(value)) {
        type = props.nan(value);
      } else if (Number.isInteger(value)) {
        type = props.int(value);
      } else {
        type = props.float(value);
      }
    } else if (typeof value === "boolean") {
      type = props.boolean(value);
    } else if (typeof value === "undefined") {
      type = props.undefined();
    } else if (typeof value === "bigint") {
      type = props.bigint(value);
    } else if (typeof value === "function") {
      type = props.function();
    } else if (typeof value === "symbol") {
      type = props.symbol();
    } else if (value instanceof RegExp) {
      type = props.regexp(value);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        type = props.array(value);
      } else if (value === null) {
        type = props.null();
      } else if (value instanceof Date) {
        type = props.date(value);
      } else {
        type = props.object(value);
      }
    } else {
      type = props.string(String(value));
    }

    return type;
  }
}
