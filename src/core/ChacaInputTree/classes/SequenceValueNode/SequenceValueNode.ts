import { TryRefANoKeyFieldError } from "../../../../errors";
import { FieldPossibleNullConfig } from "../../../ChacaSchema/interfaces/schema";
import { SequenceFieldProps } from "../../../Fields/core/SequenceField/SequenceField";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { Config } from "./value-object";

interface Props {
  fieldTreeRoute: Array<string>;
  config: Required<SequenceFieldProps>;
  possibleNull: FieldPossibleNullConfig;
}

export class SequenceValueNode extends ChacaTreeNode {
  private actualValue: number;
  private _config: Required<SequenceFieldProps>;
  private _possibleNull: FieldPossibleNullConfig;

  constructor({ config, fieldTreeRoute, possibleNull }: Props) {
    super({
      isArray: null,
      fieldTreeRoute: fieldTreeRoute,
      possibleNull: possibleNull,
    });

    this._config = new Config({
      config: config,
      route: this.getRouteString(),
    }).value();

    this.actualValue = config.starsWith;
    this._possibleNull = possibleNull;
  }

  public getConfig() {
    return this._config;
  }

  public getValue() {
    const returnValue = this.actualValue;
    this.actualValue += this._config.step;

    return returnValue;
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequenceValueNode({
      fieldTreeRoute: this.getNodeConfig().fieldTreeRoute,
      config: this._config,
      possibleNull: this._possibleNull,
    });
  }
}
