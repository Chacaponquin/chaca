import { DocumentTree } from "../../../../result-tree/classes/DocumentTree/DocumentTree";
import { SingleResultNode } from "../../../../result-tree/classes/SingleResultNode/SingleResultNode";

export interface SearchedRefValue {
  document: DocumentTree<any>;
  resultNode: SingleResultNode;
}
