import { ChacaError } from "../../../../../errors";

export class DataValidator {
  execute(data: any): void {
    let valid = true;

    if (Array.isArray(data)) {
      for (const obj of data) {
        if (!(typeof obj === "object" && obj !== null && !Array.isArray(obj))) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }

    if (!valid) {
      throw new ChacaError(
        `In the case of the 'java' format, only an array of objects can be exported.`,
      );
    }
  }
}
