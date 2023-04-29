import { PrivateUtils } from "../../../core/helpers/PrivateUtils.js";
import { SQLNode, SQLPrimaryKey } from "../classes/index.js";

export function createPrimaryKeyNode(parentRoute: Array<string>): SQLNode {
  const primaryKeyRoute = [...parentRoute, `id_${PrivateUtils.id()}`];
  const fieldType = createPrimaryKey();
  const primaryKeyNode = new SQLNode(primaryKeyRoute, fieldType);

  return primaryKeyNode;
}

export function createPrimaryKey() {
  return new SQLPrimaryKey(PrivateUtils.id());
}
