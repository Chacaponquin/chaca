import { InputTreeNode, MixedValueNode } from "../../input-tree/core";
import { MixedFieldNode } from "../../result-tree/classes/mixed";
import { FieldNode } from "../../result-tree/classes/node/field-node";
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

  async execute({ field, indexDoc, node }: Props): Promise<void> {
    if (field instanceof MixedValueNode && node instanceof MixedFieldNode) {
      const subFields = field.getFields();

      for (const subField of subFields) {
        // filtrar el subField segun su tipo
        const solution = await this.creator.execute({
          field: subField,
          indexDoc: indexDoc,
        });

        // insertar la solucion del field en la solucion del mixed field pasado por parametro
        node.insertNode(solution);

        await this.fillSolution.execute({
          indexDoc: indexDoc,
          input: subField,
          solution: solution,
        });
      }
    }
  }
}
