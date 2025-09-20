import { InputTreeNode } from "../../input-tree/core";
import { ArrayResultNode } from "../../result-tree/classes/array";
import { FieldNode } from "../../result-tree/classes/node/field-node";
import { FillSolution } from "./fill-solution";
import { SolutionCreator } from "./solution-creator";

interface Props {
  solution: FieldNode;
  input: InputTreeNode;
  indexDoc: number;
}

export class ArrayCreator {
  constructor(
    private readonly creator: SolutionCreator,
    private readonly fillSolution: FillSolution,
  ) {}

  async execute({ indexDoc, input, solution }: Props): Promise<void> {
    if (solution instanceof ArrayResultNode) {
      for (let i = 0; i < solution.limit; i++) {
        // resolver el field y guardarlo en un nodo
        const s = await this.creator.execute({
          field: input.getNoArrayNode(),
          indexDoc: indexDoc,
        });

        // insertar el field en el array de soluciones
        solution.insertNode(s);

        // fill solution
        await this.fillSolution.execute({
          indexDoc: indexDoc,
          input: input,
          solution: s,
        });
      }
    }
  }
}
