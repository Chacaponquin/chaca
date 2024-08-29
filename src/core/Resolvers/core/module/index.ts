import { Module } from "../../../../modules";
import { IResolver } from "../../interfaces/resolvers";

export class ModuleResolver extends IResolver {
  constructor(public readonly schema: Module) {
    super();
  }
}
