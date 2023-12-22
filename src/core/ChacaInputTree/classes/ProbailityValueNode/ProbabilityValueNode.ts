import { TryRefANoKeyFieldError } from "../../../../errors";
import { DocumentTree } from "../../../ChacaResultTree/classes";
import { ChacaUtils } from "../../../ChacaUtils/ChacaUtils";
import { DatasetStore } from "../../../DatasetStore/DatasetStore";
import { ProbabilityOption } from "../../../Fields/core/ProbabilityField/ProbabilityField";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { Input, InputChance } from "./value-object";

interface Props {
  store: DatasetStore;
  currentDocument: DocumentTree<any>;
}

export class ProbabilityValueNode extends ChacaTreeNode {
  private options: Array<ProbabilityOption>;
  private utils = new ChacaUtils();

  constructor(config: ChacaTreeNodeConfig, options: Array<ProbabilityOption>) {
    super(config);

    this.options = new Input({
      options: options,
      route: this.getRouteString(),
    }).value();
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new ProbabilityValueNode(
      { ...this.getNodeConfig(), isArray: null },
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

  public getValue(props: Props): unknown {
    const values = this.options.map((o) => o.value);

    const weights: Array<number> = this.options.map((o) => {
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
    array: Array<unknown>,
    weights: Array<number>,
    size: number,
  ): Array<unknown> {
    const distribution = [];

    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;

    for (let i = 0; i < array.length; ++i) {
      const limit = quant * weights[i];

      for (let j = 0; j < limit; ++j) {
        distribution.push(i);
      }
    }

    return distribution;
  }
}
