import { InputTreeNode } from "../../input-tree/core";
import { ArrayResultNode, FieldNode } from "../../result-tree/classes";
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

  execute({ indexDoc, input, solution }: Props): void {
    if (solution instanceof ArrayResultNode) {
      for (let i = 0; i < solution.limit; i++) {
        // resolver el field y guardarlo en un nodo
        const s = this.creator.execute({
          field: input.getNoArrayNode(),
          indexDoc: indexDoc,
        });

        // insertar el field en el array de soluciones
        solution.insertNode(s);

        // fill solution
        this.fillSolution.execute({
          indexDoc: indexDoc,
          input: input,
          solution: s,
        });
      }
    }
  }
}
