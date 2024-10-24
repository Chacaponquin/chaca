export class Parent {
  private route: string[];

  constructor(init: string[]) {
    this.route = init;
  }

  create(route: string): Parent {
    const parent = new Parent([...this.route, route]);

    return parent;
  }

  string() {
    return this.route.join(".");
  }

  equal(other: Parent) {
    return other.string() === this.string();
  }
}
