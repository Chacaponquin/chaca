export class Route {
  private readonly route: string[];

  constructor(init: string[]) {
    this.route = init;
  }

  create(name: string): Route {
    return new Route([...this.route, name]);
  }

  clone() {
    return new Route(this.route);
  }

  string() {
    return this.route.join(".");
  }

  name() {
    return this.route.at(-1) as string;
  }

  parent(): Route {
    return new Route(this.route.filter((_, i) => i !== this.route.length - 1));
  }

  static from(i: string): Route {
    return new Route(i.split("."));
  }
}
