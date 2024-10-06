import { ChacaUtils } from "../../core/utils";
import { BICYCLE, FUEL, MANUFACTURER, MODEL, TYPE } from "./constants";

export class VehicleModule {
  readonly constants = {
    bicycles: BICYCLE,
    fuels: FUEL,
    manufacturers: MANUFACTURER,
    models: MODEL,
    vehicleTypes: TYPE,
  };

  /**
   * Returns a bicycle type
   * @example modules.vehicle.bicycle() // 'BMX Bicycle'
   * @returns string
   */
  bicycle(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(BICYCLE);
  }

  /**
   * Returns a manufacturer name
   * @example modules.vehicle.manufacturer() // 'BMW'
   * @returns string
   */
  manufacturer(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(MANUFACTURER);
  }

  /**
   * Returns a vehicle model name
   * @example modules.vehicle.model() // 'Model S'
   * @returns string
   */
  model(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(MODEL);
  }

  /**
   * Returns a vehicle type
   * @example modules.vehicle.type() // 'Coupe'
   * @returns string
   */
  type(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(TYPE);
  }

  /**
   * Returns a vehicle name
   * @example modules.vehicle.vehicle() // 'BMW Explorer'
   * @returns string
   */
  vehicle(): string {
    return `${this.manufacturer()} ${this.model()}`;
  }

  /**
   * Returns a fuel type
   * @example modules.vehicle.fuel() // 'Diesel'
   * @returns string
   */
  fuel(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(FUEL);
  }
}
