interface Props {
  value: number;
  route: string;
}

export class Step {
  private readonly step: number;

  constructor({ value }: Props) {
    this.step = value;
  }

  value() {
    return this.step;
  }
}
