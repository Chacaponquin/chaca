import { DEFAULT_SCHEMA_NAME } from "../../../../schema/core/default-name";

interface Props {
  include: boolean;
}

export class SchemaRouteBuilder {
  private readonly include: boolean;

  constructor({ include }: Props) {
    this.include = include;
  }

  execute(route: string[]): string[] {
    return route.map((r) => {
      return this.build(r);
    });
  }

  build(r: string): string {
    if (this.include) {
      const save = [DEFAULT_SCHEMA_NAME, ...r.split(".")];

      return save.join(".");
    }

    return r;
  }
}
