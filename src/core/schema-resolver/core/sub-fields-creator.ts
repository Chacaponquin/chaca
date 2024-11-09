import { InputTreeNode, MixedValueNode } from "../../input-tree/core";
import { FieldNode, MixedFieldNode } from "../../result-tree/classes";
import { FillSolution } from "./fill-solution";
import { SolutionCreator } from "./solution-creator";

interface Props {
  field: InputTreeNode;
  indexDoc: number;
  node: FieldNode;
}

export class SubFieldsCreator {
  constructor(
    private readonly creator: SolutionCreator,
    private readonly fillSolution: FillSolution,
  ) {}

  execute({ field, indexDoc, node }: Props) {
    if (field instanceof MixedValueNode && node instanceof MixedFieldNode) {
      const subFields = field.getFields();

      for (const subField of subFields) {
        // filtrar el subField segun su tipo
        const solution = this.creator.execute({
          field: subField,
          indexDoc: indexDoc,
        });

        // insertar la solucion del field en la solucion del mixed field pasado por parametro
        node.insertNode(solution);

        this.fillSolution.execute({
          indexDoc: indexDoc,
          input: subField,
          solution: solution,
        });
      }
    }
  }
}
