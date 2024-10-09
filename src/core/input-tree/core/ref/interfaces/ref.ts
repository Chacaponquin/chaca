import { DocumentTree } from "../../../../result-tree/classes/DocumentTree";
import { SingleResultNode } from "../../../../result-tree/classes/SingleResultNode";

export interface SearchedRefValue {
  document: DocumentTree<any>;
  resultNode: SingleResultNode;
}
