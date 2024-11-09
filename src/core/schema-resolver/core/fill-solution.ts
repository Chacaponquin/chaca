import { InputTreeNode } from "../../input-tree/core";
import { FieldNode } from "../../result-tree/classes";
import { ArrayCreator } from "./array-creator";
import { SubFieldsCreator } from "./sub-fields-creator";

interface Props {
  solution: FieldNode;
  indexDoc: number;
  input: InputTreeNode;
}

export class FillSolution {
  subFieldsCreator: SubFieldsCreator;
  arrayCreator: ArrayCreator;

  execute({ indexDoc, input, solution }: Props) {
    this.subFieldsCreator.execute({
      field: input,
      indexDoc: indexDoc,
      node: solution,
    });

    // if is array
    this.arrayCreator.execute({
      indexDoc: indexDoc,
      input: input,
      solution: solution,
    });
  }
}
