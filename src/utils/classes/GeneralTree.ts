export class GeneralTree<K> {
  public root: TreeNode;

  constructor(root: TreeNode) {
    this.root = root;
  }

  public getObject(): K {
    return { [this.root.key]: this.root.getValue() } as K;
  }

  public setNode(arrayOfKeys: string[], node: TreeNode) {
    this.root.setNodeByKey(arrayOfKeys, node);
  }
}

export class TreeNode {
  public key: string;
  public arrayNodes: Array<TreeNode> = [];
  private value: any;

  constructor(key: string) {
    this.key = key;
  }

  public getValue() {
    if (this.arrayNodes.length > 0) {
      let object = {};

      for (const t of this.arrayNodes) {
        object = { ...object, [t.key]: t.getValue() };
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
        let ref = new TreeNode(arrayOfKeys[0]);
        for (let i = 1; i < arrayOfKeys.length; i++) {
          const newNode = new TreeNode(arrayOfKeys[i]);
          ref.setNode(newNode);
          ref = newNode;
        }
        ref.setNode(node);
      }
    }
  }
}
