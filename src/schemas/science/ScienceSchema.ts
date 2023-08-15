import { ChacaUtils } from "../../core/ChacaUtils/ChacaUtils.js";
import { SchemaField } from "../SchemaField.js";
import {
  PERIODIC_TABLE_ELEMETNS,
  PERIODIC_TABLE_SYMBOLS,
} from "./constants/periodicTable.js";
import { UNITS } from "./constants/units.js";

type PeriodicTableProps = {
  type?: "symbol" | "name";
};

type UnitProps = {
  type?: "symbol" | "name";
};

export class ScienceSchema {
  private utils = new ChacaUtils();

  public readonly constants = {
    units: UNITS,
    periodicTableElements: PERIODIC_TABLE_ELEMETNS,
    periodicTableSymbols: PERIODIC_TABLE_SYMBOLS,
  };

  /**
   * Returns periodic table element
   * @param args.type element format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   * @example schemas.science.periodicTableElement() // Schema
   * @example
   * schemas.science.periodicTableElement().getValue() // 'Curium'
   * schemas.science.periodicTableElement().getValue({type: 'symbol'}) // 'Zn'
   * @returns string
   */
  periodicTableElement(args?: PeriodicTableProps) {
    return new SchemaField<string, PeriodicTableProps>(
      "periodicTableElement",
      (a) => {
        if (typeof a.type === "string") {
          if (a.type === "name") {
            return this.utils.oneOfArray(PERIODIC_TABLE_SYMBOLS);
          } else return this.utils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
        } else return this.utils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
      },
      args || {},
    );
  }

  /**
   * Returns a unit of measurement
   *
   * @param args.type unit format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example schemas.science.unit() // Schema
   * @example
   * schemas.science.unit() // 'hertz (Hz)'
   * schemas.science.unit({type: 'symbol'}) // 'N'
   * @returns string
   */
  unit(args?: UnitProps) {
    return new SchemaField<string, UnitProps>(
      "unit",
      (a) => {
        if (typeof a.type === "string") {
          if (a.type === "symbol") {
            return this.utils.oneOfArray(UNITS.map((el) => el.symbol));
          } else return this.utils.oneOfArray(UNITS.map((el) => el.val));
        } else return this.utils.oneOfArray(UNITS.map((el) => el.val));
      },
      args || {},
    );
  }
}
