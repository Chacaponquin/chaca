interface Props {
  value: number;
  route: string;
}

export class StartsWith {
  private readonly startsWith: number;

  constructor({ value }: Props) {
    this.startsWith = value;
  }

  value() {
    return this.startsWith;
  }
}
