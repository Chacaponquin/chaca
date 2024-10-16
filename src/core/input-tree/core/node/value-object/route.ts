export class NodeRoute {
  private readonly route: string[];

  constructor(route: string[]) {
    this.route = route;
  }

  parent(): string {
    return this.route.at(-2) as string;
  }

  name(): string {
    return this.route.at(-1) as string;
  }

  string(): string {
    return this.route.join(".");
  }
}
