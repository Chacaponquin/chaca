import { ChacaError } from "../../../errors/ChacaError.js";

export interface SequenceFieldProps {
  starsWith: number;
  step: number;
}

export class SequenceField {
  private config: SequenceFieldProps;

  constructor(config?: Partial<SequenceFieldProps>) {
    const saveConfig: SequenceFieldProps = {
      starsWith: 1,
      step: 1,
    };

    if (typeof config === "object") {
      if (config.starsWith && typeof config.starsWith === "number") {
        saveConfig.starsWith = config.starsWith;
      }

      if (config.step && typeof config.step === "number") {
        if (config.step > 0) {
          saveConfig.step = config.step;
        } else {
          throw new ChacaError(`The sequence step must be an positive number`);
        }
      }

      this.config = saveConfig;
    } else {
      this.config = saveConfig;
    }
  }

  public getConfig() {
    return this.config;
  }
}
