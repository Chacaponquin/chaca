import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { GenerateProps, InputTreeNode } from "../node";
import { CustomField } from "../../../fields/core/custom";
import { NotArray } from "../is-array";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";

interface Props {
  fields: any;
  datasetStore: DatasetStore;
}

export class CustomValueNode extends InputTreeNode {
  constructor(config: ChacaTreeNodeConfig, private readonly func: CustomField) {
    super(config);
  }

  getNoArrayNode(): InputTreeNode {
    return new CustomValueNode(
      { ...this.getNodeConfig(), isArray: new NotArray() },
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
      name: this.getNodeName(),
      value: this.value({
        datasetStore: store,
        fields: currentDocument.getDocumentObject(),
      }),
    });
  }
}
