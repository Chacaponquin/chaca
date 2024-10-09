import { TryRefANoKeyFieldError } from "../../../../errors";
import { SequenceFieldProps } from "../../../fields/core/sequence/SequenceField";
import { InputTreeNode } from "../node";
import { Config } from "./value-object";
import { PossibleNull } from "../possible-null";
import { NotArray } from "../is-array";

interface Props {
  fieldTreeRoute: string[];
  config: Required<SequenceFieldProps>;
  possibleNull: PossibleNull;
}

export class SequenceValueNode extends InputTreeNode {
  private actualValue: number;
  private _config: Required<SequenceFieldProps>;

  constructor({ config, fieldTreeRoute, possibleNull }: Props) {
    super({
      isArray: new NotArray(),
      fieldTreeRoute: fieldTreeRoute,
      possibleNull: possibleNull,
    });

    this._config = new Config({
      config: config,
      route: this.getRouteString(),
    }).value();

    this.actualValue = config.starsWith;
  }

  getConfig() {
    return this._config;
  }

  value() {
    const returnValue = this.actualValue;
    this.actualValue += this._config.step;

    return returnValue;
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  getNoArrayNode(): InputTreeNode {
    return new SequenceValueNode({
      fieldTreeRoute: this.getFieldRoute(),
      config: this.getConfig(),
      possibleNull: this.getPossibleNull(),
    });
  }
}
