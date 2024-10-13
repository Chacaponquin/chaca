import { ChacaError } from "../../../../../errors";

export abstract class JavascriptDatatype {
  static create(value: any): string {
    let returnValue = "undefined";

    if (typeof value === "string") {
      returnValue = `${JSON.stringify(value)}`;
    } else if (typeof value === "number") {
      if (Number.isNaN(value)) {
        returnValue = `NaN`;
      } else {
        returnValue = `${value}`;
      }
    } else if (typeof value === "boolean") {
      returnValue = `${value}`;
    } else if (typeof value === "undefined") {
      returnValue = "undefined";
    } else if (typeof value === "bigint") {
      returnValue = `${value.toString()}n`;
    } else if (typeof value === "function") {
      throw new ChacaError(
        `You can not export a function to a javascript file.`,
      );
    } else if (typeof value === "symbol") {
      throw new ChacaError(`You can not export a Symbol to a javascript file.`);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        returnValue = "";
      } else if (value === null) {
        returnValue = "null";
      } else if (value instanceof Date) {
        returnValue = `new Date(${JSON.stringify(value)})`;
      } else if (value instanceof RegExp) {
        returnValue = `/${value.source}/${value.flags}`;
      } else {
        returnValue = "";
      }
    }

    return returnValue;
  }
}
