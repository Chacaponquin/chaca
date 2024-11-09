import { ChacaError } from "../../../../errors";
import {
  KeyFieldResolver,
  SequenceFieldResolver,
  SequentialFieldResolver,
} from "../../../resolvers/core";
import { ResolverObject } from "../../../schema/interfaces/schema";

interface Props {
  route: string;
  config: ResolverObject;
}

export class ResolverValidator {
  execute({ config, route }: Props): void {
    // sequence
    if (config.type instanceof SequenceFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The sequence field '${route}' can not be an array field`,
        );
      }
    }

    // sequential
    else if (config.type instanceof SequentialFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The sequential field '${route}' can not be an array field`,
        );
      }
    }

    // key
    else if (config.type instanceof KeyFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The key field '${route}' can not be an array field`,
        );
      }

      if (config.possibleNull.can()) {
        throw new ChacaError(
          `The key field '${route}' can not be a null field`,
        );
      }
    }
  }
}
