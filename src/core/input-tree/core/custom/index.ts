import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { GenerateProps, InputTreeNode } from "../node";
import { CustomField } from "../../../fields/core/custom";
import { IsArray, NotArray } from "../is-array";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

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

  getNoArrayNode(): InputTreeNode {
    return new CustomValueNode(
      this.route,
      new NotArray(),
      this.possibleNull,
      this.func,
    );
  }

  private value({ fields, datasetStore }: Props) {
    const value = this.func({
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

  generate({ currentDocument, store }: GenerateProps): FieldNode {
    return new SingleResultNode({
      name: this.getName(),
      value: this.value({
        datasetStore: store,
        fields: currentDocument.getDocumentObject(),
      }),
    });
  }
}
