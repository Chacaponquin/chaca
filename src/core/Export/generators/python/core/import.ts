export interface Import {
  from: string;
  modules: string[];
}

export class Imports {
  imports: Import[];

  constructor() {
    this.imports = [];
  }

  add(imp: Import): void {
    const result = [] as Import[];

    let found = false;
    for (let i = 0; i < this.imports.length; i++) {
      const save = this.imports[i];

      if (save.from === imp.from) {
        found = true;

        const newModules = [...save.modules] as string[];

        for (const module of imp.modules) {
          const exist = newModules.includes(module);

          if (!exist) {
            newModules.push(module);
          }
        }

        save.modules = newModules;
      }

      result.push(save);
    }

    if (!found) {
      result.push(imp);
    }

    this.imports = result;
  }

  string(): string {
    let code = ``;

    this.imports.forEach((i) => {
      if (i.modules.length > 0) {
        code += `from ${i.from} import ${i.modules.join(", ")}\n`;
      } else {
        code += `import ${i.from}\n`;
      }
    });

    return code;
  }
}
