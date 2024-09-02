import { Module } from "../../../../modules";
import { IResolver } from "../../interfaces/resolvers";

export class ModuleResolver extends IResolver {
  constructor(readonly module: Module<any, any>) {
    super();
  }
}
