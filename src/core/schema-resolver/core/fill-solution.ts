import { InputTreeNode } from "../../input-tree/core";
import { FieldNode } from "../../result-tree/classes/node/field-node";
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

  async execute({ indexDoc, input, solution }: Props): Promise<void> {
    await this.subFieldsCreator.execute({
      field: input,
      indexDoc: indexDoc,
      node: solution,
    });

    // if is array
    await this.arrayCreator.execute({
      indexDoc: indexDoc,
      input: input,
      solution: solution,
    });
  }
}
