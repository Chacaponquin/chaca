import { SchemaResolver } from "../schema-resolver/schema-resolver";

export class SchemaStopper {
  constructor(private readonly resolver: SchemaResolver) {}

  stop(): void {
    this.resolver.stop();
  }
}
