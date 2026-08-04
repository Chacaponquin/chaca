import { dump } from "js-yaml";
import { SpaceIndex } from "../../../core/space-index";

interface Props {
  sortKeys: boolean | ((a: any, b: any) => number) | undefined;
  lineWidth: number | undefined;
  quotingType: "'" | '"' | undefined;
  indent: SpaceIndex;
}

// js-yaml has no native bigint support and silently drops them (skipInvalid),
// so they are converted beforehand: to a number when they fit in a safe
// integer, to a decimal string otherwise.
function normalizeBigints(value: any): any {
  if (typeof value === "bigint") {
    const max = BigInt(Number.MAX_SAFE_INTEGER);

    if (value <= max && value >= -max) {
      return Number(value);
    }

    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(normalizeBigints);
  }

  if (value !== null && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);

    if (prototype === Object.prototype || prototype === null) {
      const result: Record<string, any> = {};

      for (const [key, entry] of Object.entries(value)) {
        result[key] = normalizeBigints(entry);
      }

      return result;
    }
  }

  return value;
}

export class YamlCodeCreator {
  constructor(private readonly config: Props) {}

  execute(data: any): string {
    return dump(normalizeBigints(data), {
      skipInvalid: true,
      indent: this.config.indent.step(),
      sortKeys: this.config.sortKeys,
      lineWidth: this.config.lineWidth,
      quotingType: this.config.quotingType,
    });
  }
}
