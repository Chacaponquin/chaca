export class NodeRoute {
  private readonly _route: string[];

  constructor(route: string[]) {
    this._route = route;
  }

  array() {
    return this._route;
  }

  create(name: string) {
    return new NodeRoute([...this._route, name]);
  }

  parent(): NodeRoute {
    const r = this._route.filter((_, i) => i !== this._route.length - 1);

    return new NodeRoute(r);
  }

  name(): string {
    return this._route.at(-1) as string;
  }

  string(): string {
    return this._route.join(".");
  }
}
