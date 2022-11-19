export class GeneralTree<K> {
  public root: TreeNode;

  constructor(root: TreeNode) {
    this.root = root;
  }

  public getAllNodes(): Array<TreeNode> {
    return this.root.getAllNodes();
  }

  public totalNodes(): number {
    return this.root.contNodes();
  }

  public getObject(): K {
    const value = this.root.getValue();

    if (value === null) return {} as K;
    else return { ...value } as K;
  }

  public setNode(arrayOfKeys: string[], node: TreeNode) {
    this.root.setNodeByKey(arrayOfKeys, node);
  }

  public searchNodeAndCreate(arrayOfKeys: string[]) {
    return this.root.searchNodeAndCreate(arrayOfKeys);
  }
}

export class TreeNode {
  public key: string;
  public arrayNodes: Array<TreeNode> = [];
  private value: any;
  public isArray = false;
  public isNull = false;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }

  public contNodes(): number {
    if (this.arrayNodes.length === 0) {
      return 1;
    } else {
      let cont = 1;
      for (const n of this.arrayNodes) {
        cont += n.contNodes();
      }
      return cont;
    }
  }

  public getValue(): any {
    if (this.isNull) return null;

    if (this.isArray) {
      const retArray = [] as any[];

      for (const n of this.arrayNodes) {
        retArray.push(n.getValue());
      }

      return retArray;
    }

    if (this.arrayNodes.length > 0) {
      let object = {};

      for (const n of this.arrayNodes) {
        object = { ...object, [n.key]: n.getValue() };
      }

      return object;
    } else return this.value;
  }

  public setValue(value: any) {
    this.value = value;
  }

  public setNode(node: TreeNode) {
    this.arrayNodes.push(node);
  }

  public getAllNodes(): TreeNode[] {
    const childrenNodes = [];

    for (const n of this.arrayNodes) {
      childrenNodes.push(...n.getAllNodes());
    }

    return [this, ...childrenNodes];
  }

  public searchNodeAndCreate(arrayOfKeys: string[]): TreeNode {
    if (arrayOfKeys.length === 0) {
      return this;
    } else {
      let retNode: TreeNode | null = null;

      for (let i = 0; i < this.arrayNodes.length && !retNode; i++) {
        if (this.arrayNodes[i].key === arrayOfKeys[0]) {
          retNode = this.arrayNodes[i].searchNodeAndCreate(
            arrayOfKeys.filter((el) => el !== arrayOfKeys[0]),
          );
        }
      }

      if (!retNode) {
        let ref = new TreeNode(arrayOfKeys[0], null);
        this.setNode(ref);
        for (let i = 1; i < arrayOfKeys.length; i++) {
          const newNode = new TreeNode(arrayOfKeys[i], null);
          ref.setNode(newNode);
          ref = newNode;
        }
        return ref;
      } else return retNode;
    }
  }

  public isLeaf() {
    return this.arrayNodes.length === 0;
  }

  public setNodeByKey(arrayOfKeys: Array<string>, node: TreeNode) {
    if (arrayOfKeys.length === 0) {
      this.setNode(node);
    } else {
      let found = false;

      for (let i = 0; i < this.arrayNodes.length && !found; i++) {
        if (this.arrayNodes[i].key === arrayOfKeys[0]) {
          this.arrayNodes[i].setNodeByKey(
            arrayOfKeys.filter((el) => el !== arrayOfKeys[0]),
            node,
          );
          found = true;
        }
      }

      if (!found) {
        let ref = new TreeNode(arrayOfKeys[0], null);
        this.setNode(ref);
        for (let i = 1; i < arrayOfKeys.length; i++) {
          const newNode = new TreeNode(arrayOfKeys[i], null);
          ref.setNode(newNode);
          ref = newNode;
        }
        ref.setNode(node);
      }
    }
  }
}
