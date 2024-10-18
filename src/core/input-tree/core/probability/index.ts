import { TryRefANoKeyFieldError } from "../../../../errors";
import {
  DocumentTree,
  FieldNode,
  SingleResultNode,
} from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { GenerateProps, InputTreeNode } from "../node";
import { IsArray, NotArray } from "../is-array";
import { ChancesArray } from "./value-object/chances-array";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

interface Props {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

export class ProbabilityValueNode extends InputTreeNode {
  private options: ChancesArray;

  constructor(
    route: NodeRoute,
    isArray: IsArray,
    possibleNull: PossibleNull,
    options: ChancesArray,
  ) {
    super(route, isArray, possibleNull);

    this.options = options;
  }

  getNoArrayNode(): InputTreeNode {
    return new ProbabilityValueNode(
      this.route,
      new NotArray(),
      this.possibleNull,
      this.options,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  private value(props: Props) {
    return this.options.value(props);
  }

  generate(props: GenerateProps): FieldNode {
    return new SingleResultNode({
      name: this.getNodeName(),
      value: this.value(props),
    });
  }
}
