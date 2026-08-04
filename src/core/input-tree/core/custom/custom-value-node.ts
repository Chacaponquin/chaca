import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store/dataset-store";
import { GenerateProps, InputTreeNode } from "../node/input-tree-node";
import { CustomField } from "../../../fields/core/custom/custom-field";
import { IsArray, NotArray } from "../is-array/is-array";
import { NodeRoute } from "../node/value-object/route";
import { NotNull, PossibleNull } from "../possible-null/possible-null";
import { SingleResultNode } from "../../../result-tree/classes/single-result";
import { FieldNode } from "../../../result-tree/classes/node/field-node";

interface Props {
  fields: any;
  datasetStore: DatasetStore;
}

export class CustomValueNode extends InputTreeNode {
  constructor(
    route: NodeRoute,
    isArray: IsArray,
    possibleNull: PossibleNull,
    private readonly func: CustomField,
  ) {
    super(route, isArray, possibleNull);
  }

  /**
   * Los elementos de un array no son campos, por lo que no llevan la
   * configuracion de nulos del campo: `possibleNull` decide si el valor del
   * campo es un array o `null`, no si cada elemento lo es.
   */
  getNoArrayNode(): InputTreeNode {
    return new CustomValueNode(
      this.route,
      new NotArray(),
      new NotNull(),
      this.func,
    );
  }

  private async value({ fields, datasetStore }: Props) {
    const value = await this.func({
      store: datasetStore,
      currentFields: fields,
    });

    return value;
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  async generate({
    currentDocument,
    store,
  }: GenerateProps): Promise<FieldNode> {
    return new SingleResultNode({
      name: this.getName(),
      value: await this.value({
        datasetStore: store,
        fields: currentDocument.getDocumentObject(),
      }),
    });
  }
}
