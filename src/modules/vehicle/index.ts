import { ChacaUtils } from "../../core/utils";
import { Module } from "../module";
import { BICYCLE, FUEL, MANUFACTURER, MODEL, TYPE } from "./constants";

export class VehicleModule {
  private utils = new ChacaUtils();

  readonly constants = {
    bicycles: BICYCLE,
    fuels: FUEL,
    manufacturers: MANUFACTURER,
    models: MODEL,
    vehicleTypes: TYPE,
  };

  /**
   * Returns a bicycle type
   * @example modules.vehicle.bicycle() // Schema
   * @example modules.vehicle.bicycle().getValue() // 'BMX Bicycle'
   * @returns string
   */
  bicycle() {
    return new Module<string>(() => this.utils.oneOfArray(BICYCLE));
  }

  /**
   * Returns a manufacturer name
   * @example modules.vehicle.manufacturer() // Schema
   * @example modules.vehicle.manufacturer().getValue() // 'BMW'
   * @returns string
   */
  manufacturer() {
    return new Module<string>(() => this.utils.oneOfArray(MANUFACTURER));
  }

  /**
   * Returns a vehicle model name
   * @example modules.vehicle.vehicleModel() // Schema
   * @example modules.vehicle.vehicleModel().getValue() // 'Model S'
   * @returns string
   */
  vehicleModel() {
    return new Module<string>(() => this.utils.oneOfArray(MODEL));
  }

  /**
   * Returns a vehicle type
   * @example modules.vehicle.vehicleType() // Schema
   * @example modules.vehicle.vehicleType().getValue() // 'Coupe'
   * @returns string
   */
  vehicleType() {
    return new Module<string>(() => this.utils.oneOfArray(TYPE));
  }

  /**
   * Returns a vehicle name
   * @example modules.vehicle.vehicle() // Schema
   * @example modules.vehicle.vehicle().getValue() // 'BMW Explorer'
   * @returns string
   */
  vehicle() {
    return new Module<string>(
      () =>
        `${this.manufacturer().getValue()} ${this.vehicleModel().getValue()}`,
    );
  }

  /**
   * Returns a fuel type
   * @example modules.vehicle.fuel() // Schema
   * @example modules.vehicle.fuel().getValue() // 'Diesel'
   * @returns string
   */
  fuel() {
    return new Module<string>(() => this.utils.oneOfArray(FUEL));
  }
}
