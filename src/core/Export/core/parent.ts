import { VariableName } from "./names";

export class Parent {
  private route: VariableName[];

  constructor() {
    this.route = [];
  }

  static create(prev: Parent, route: VariableName): Parent {
    const parent = new Parent();

    prev.route.forEach((r) => parent.route.push(r));
    parent.route.push(route);

    return parent;
  }

  string() {
    return this.route.map((r) => r.name()).join(".");
  }

  equal(other: Parent) {
    return other.string() === this.string();
  }
}
