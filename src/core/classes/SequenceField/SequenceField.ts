export interface SequenceFieldInput {
  starsWith?: number;
}

export interface SequenceFieldProps {
  starsWith: number;
}

export class SequenceField {
  private config: SequenceFieldProps;

  constructor(config?: SequenceFieldInput) {
    if (typeof config === "object") {
      const saveConfig: SequenceFieldProps = {
        starsWith: 1,
      };

      this.config = saveConfig;
    } else {
      this.config = { starsWith: 1 };
    }
  }

  public getConfig() {
    return this.config;
  }
}
