import { ChacaUtils } from "./core/utils";
import { ChacaModules } from "./modules";

/**
 * Environment-agnostic singletons shared by every entry point (node, browser).
 * They carry no filesystem dependency, so both builds reuse them; only the
 * `chaca` instance differs per entry because of its injected `FileWriter`.
 */
export const utils = new ChacaUtils();
export const modules = new ChacaModules(utils);
