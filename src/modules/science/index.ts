import { ChacaUtils } from "../../core/utils";
import { Module } from "../module";
import {
  PERIODIC_TABLE_ELEMETNS,
  PERIODIC_TABLE_SYMBOLS,
} from "./constants/periodicTable";
import { UNITS } from "./constants/units";

type PeriodicTableProps = {
  type?: "symbol" | "name";
};

type UnitProps = {
  type?: "symbol" | "name";
};

export class ScienceModule {
  private utils = new ChacaUtils();

  readonly constants = {
    units: UNITS,
    periodicTableElements: PERIODIC_TABLE_ELEMETNS,
    periodicTableSymbols: PERIODIC_TABLE_SYMBOLS,
  };

  /**
   * Returns periodic table element
   * @param args.type element format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   * @example modules.science.periodicTableElement() // Schema
   * @example
   * modules.science.periodicTableElement().getValue() // 'Curium'
   * modules.science.periodicTableElement().getValue({type: 'symbol'}) // 'Zn'
   * @returns string
   */
  periodicTableElement(args?: PeriodicTableProps) {
    return new Module<string, PeriodicTableProps>((a) => {
      if (typeof a.type === "string") {
        if (a.type === "name") {
          return this.utils.oneOfArray(PERIODIC_TABLE_SYMBOLS);
        } else return this.utils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
      } else return this.utils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
    }, args || {});
  }

  /**
   * Returns a unit of measurement
   *
   * @param args.type unit format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example modules.science.unit() // Schema
   * @example
   * modules.science.unit() // 'hertz (Hz)'
   * modules.science.unit({type: 'symbol'}) // 'N'
   * @returns string
   */
  unit(args?: UnitProps) {
    return new Module<string, UnitProps>((a) => {
      if (typeof a.type === "string") {
        if (a.type === "symbol") {
          return this.utils.oneOfArray(UNITS.map((el) => el.symbol));
        } else return this.utils.oneOfArray(UNITS.map((el) => el.val));
      } else return this.utils.oneOfArray(UNITS.map((el) => el.val));
    }, args || {});
  }
}
