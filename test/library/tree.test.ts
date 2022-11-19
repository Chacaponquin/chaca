import { GeneralTree, TreeNode } from "../../src/utils/classes/GeneralTree";

describe("#Tree tests", () => {
  describe("count nodes test", () => {
    it("only 1 node. Should return 1", () => {
      const tree = new GeneralTree(new TreeNode("buenas", null));

      expect(tree.totalNodes() === 1).toBe(true);
    });

    it("tree nodes. Should return 3", () => {
      const tree = new GeneralTree(new TreeNode("buenas", null));
      const node1 = new TreeNode("buenas", null);
      const node2 = new TreeNode("buenas", null);
      tree.setNode([], node1);
      tree.setNode([], node2);

      expect(tree.totalNodes() === 3).toBe(true);
    });
  });

  describe("get object tree tests", () => {
    it("get object from a initi tree. Should return an empty object", () => {
      const tree = new GeneralTree(new TreeNode("buenas", null));
      expect(tree.getObject()).toMatchObject({});
    });

    it("get object from a tree with a node. Should return an object with that property", () => {
      const tree = new GeneralTree(new TreeNode("buenas", null));
      const node = new TreeNode("id", "12345");
      tree.setNode([], node);

      expect(tree.getObject()).toMatchObject({ id: "12345" });
    });

    it("set the value '12345' in the field user.socialMedia.facebook", () => {
      const tree = new GeneralTree(new TreeNode("buenas", null));
      tree
        .searchNodeAndCreate(["user", "socialMedia", "facebook"])
        .setValue("12345");

      expect(tree.getObject()).toMatchObject({
        user: { socialMedia: { facebook: "12345" } },
      });
    });
  });
});
