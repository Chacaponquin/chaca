import { SchemaResolver } from "..";
import { InputTreeNode, MixedValueNode } from "../../input-tree/core";
import { FieldNode, MixedFieldNode } from "../../result-tree/classes";

interface Props {
  field: InputTreeNode;
  indexDoc: number;
  node: FieldNode;
}

export class SubFieldsCreator {
  constructor(private readonly resolver: SchemaResolver) {}

  execute({ field, indexDoc, node }: Props) {
    if (field instanceof MixedValueNode && node instanceof MixedFieldNode) {
      const subFields = field.getFields();

      for (const subField of subFields) {
        // filtrar el subField segun su tipo
        const solution = this.resolver.createSolutionNode({
          field: subField,
          indexDoc: indexDoc,
        });

        // insertar la solucion del field en la solucion del mixed field pasado por parametro
        node.insertNode(solution);

        this.execute({ field: subField, indexDoc: indexDoc, node: solution });
      }
    }
  }
}
