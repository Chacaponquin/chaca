export class Route {
  private route: string[];

  constructor(init: string[]) {
    this.route = init;
  }

  create(r: string): Route {
    return new Route([...this.route, r]);
  }

  string(): string {
    return this.route.join(".");
  }

  equal(other: Route): boolean {
    return other.route.join(".") === this.route.join(".");
  }
}
