import { SQLTreeNode } from "./SQLTreeNode.js";

export class SQLTableTree {
  private nodes: Array<SQLTreeNode> = [];
  private route: Array<string>;
  private treeName: string;

  constructor(treeName: string, route: Array<string>) {
    this.route = route;
    this.treeName = treeName;
  }

  public compare(otherTree: SQLTableTree): boolean {
    const sameRoute = this.equalRoute(otherTree.getRoute());

    if (sameRoute) {
      this.checkSameDataSchema(otherTree.nodes);
    }
  }

  public insertNode(node: SQLTreeNode): void {
    this.nodes.push(node);
  }

  public getTreeName() {
    return this.treeName;
  }

  public getRoute() {
    return this.route;
  }

  public createRouteForSubFields() {
    return [...this.route, this.treeName];
  }

  private checkSameDataSchema(otherTreeNodes: Array<SQLTreeNode>): void {
    const missingKeys = [] as Array<string>;
  }

  private equalRoute(route: Array<string>): boolean {
    let equal = true;

    if (route.length === this.route.length) {
      for (let i = 0; i < this.route.length && equal; i++) {
        if (route[i] !== this.route[i]) {
          equal = false;
        }
      }
    } else {
      equal = false;
    }

    return equal;
  }
}
