import { DatasetResolver } from "../../../../../dataset-resolver/resolver";
import { SchemaResolver } from "../../../../../schema-resolver";

interface Props {
  resolver: DatasetResolver;
}

export class TableOrganizer {
  private schemas = [] as SchemaResolver[];

  execute({ resolver }: Props): SchemaResolver[] {
    for (const schema of resolver.getResolvers()) {
      this.search(schema);
    }

    return this.schemas;
  }

  private search(resolver: SchemaResolver) {
    const refs = resolver.getRefNodes();

    for (const ref of refs) {
      const r = ref.getSchemaRef() as SchemaResolver;

      if (resolver !== r) {
        this.search(r);
      }
    }

    this.add(resolver);
  }

  private add(schema: SchemaResolver) {
    if (!this.schemas.includes(schema)) {
      this.schemas = [...this.schemas, schema];
    }
  }
}
