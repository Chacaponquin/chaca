export class Route {
  private readonly route: string[];

  constructor(init: string[]) {
    this.route = init;
  }

  create(name: string): Route {
    return new Route([...this.route, name]);
  }

  equal(other: Route): boolean {
    return other.route.join(".") === this.route.join(".");
  }

  clone() {
    return new Route(this.route);
  }

  string() {
    return this.route.join(".");
  }
}
