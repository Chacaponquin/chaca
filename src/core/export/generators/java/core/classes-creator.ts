import { Parent } from "./parent";
import { DataValidator } from "./validator";
import { ValueCreator } from "./value-creator";

interface Props {
  data: any;
  name: string;
}

export class ClassesCreator {
  constructor(
    private readonly creator: ValueCreator,
    private readonly validator: DataValidator,
  ) {}

  execute({ data, name: iname }: Props) {
    this.validator.execute(data);

    const parent = new Parent([iname]);

    for (const value of data) {
      this.creator.execute({ parent: parent, value: value, print: true });
    }
  }
}
