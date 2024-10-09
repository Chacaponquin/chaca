import { TryRefANoKeyFieldError } from "../../../../errors";
import { DocumentTree } from "../../../result-tree/classes";
import { ChacaUtils } from "../../../utils";
import { DatasetStore } from "../../../dataset-store";
import { ProbabilityOption } from "../../../fields/core/probability";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { InputTreeNode } from "../node";
import { Input, InputChance } from "./value-object";
import { NotArray } from "../is-array";

interface Props {
  store: DatasetStore;
  currentDocument: DocumentTree<any>;
}

export class ProbabilityValueNode extends InputTreeNode {
  private options: ProbabilityOption[];
  private utils = new ChacaUtils();

  constructor(config: ChacaTreeNodeConfig, options: ProbabilityOption[]) {
    super(config);

    this.options = new Input({
      options: options,
      route: this.getRouteString(),
    }).value();
  }

  public getNoArrayNode(): InputTreeNode {
    return new ProbabilityValueNode(
      { ...this.getNodeConfig(), isArray: new NotArray() },
      this.options,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public value(props: Props): unknown {
    const values = this.options.map((o) => o.value);

    const weights: number[] = this.options.map((o) => {
      const chance = o.chance;

      if (typeof chance === "number") {
        return chance;
      } else {
        let value = chance({
          store: props.store,
          currentFields: props.currentDocument.getDocumentObject(),
        });

        value = InputChance.validateChanceNumber({
          route: this.getRouteString(),
          value: value,
        });

        return value;
      }
    });

    const distribution = this.createDistribution(values, weights, 10);

    return this.utils.oneOfArray(distribution);
  }

  private createDistribution(
    array: unknown[],
    weights: number[],
    size: number,
  ): Array<unknown> {
    const distribution = [];

    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;

    for (let i = 0; i < array.length; ++i) {
      const limit = quant * weights[i];

      for (let j = 0; j < limit; ++j) {
        distribution.push(array[i]);
      }
    }

    return distribution;
  }
}
