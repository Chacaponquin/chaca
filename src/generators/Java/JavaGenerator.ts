import { FileConfig } from "../../core/interfaces/export.interface.js";
import { Generator } from "./../Generator.js";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

import {
  ArrayType,
  BigintType,
  BooleanType,
  DataType,
  DateType,
  FloatType,
  IntegerType,
  NullType,
  NumberType,
  ObjectType,
  RegExpType,
  StringType,
} from "./classes/types/index.js";
import { MultiGenerateResolver } from "../../core/classes/MultiGenerate/MultiGenerateResolver.js";
import { IdSchema } from "../../schemas/id/IdSchema.js";

interface JavaClassCreated {
  className: string;
  classType: ObjectType;
}

interface MainContentData {
  variableName: string;
  dataType: DataType;
}

export class JavaGenerator extends Generator {
  private idSchema = new IdSchema();

  private classesCreated: Array<JavaClassCreated> = [];

  constructor(config: FileConfig) {
    super("java", config);
  }

  public async generateRelationalDataFile(
    resolver: MultiGenerateResolver<any>,
  ): Promise<string> {
    this.classesCreated = [];
    const resolversData = [] as Array<MainContentData>;
    resolver.getResolvers().forEach((r) => {
      resolversData.push({
        variableName: r.getSchemaName(),
        dataType: this.createDataTypes(r.resolve()),
      });
    });

    const mainContent = this.generateMainContent(resolversData);

    return await this.createAllFiles(mainContent);
  }

  public async generateFile(data: any): Promise<string> {
    this.classesCreated = [];
    const dataType = this.createDataTypes(data);
    const mainContent = this.generateMainContent([
      { dataType, variableName: this.config.fileName },
    ]);

    return await this.createAllFiles(mainContent);
  }

  private async createAllFiles(mainContent: string): Promise<string> {
    const classesContents = [mainContent];
    const filesRoutes = [];

    this.classesCreated.forEach((c) => {
      classesContents.push(this.createClassFileContent(c));
    });

    for (let i = 0; i < classesContents.length; i++) {
      if (i === 0) {
        const mainRoute = this.buildClassFileName("Main");
        await fs.promises.writeFile(mainRoute, classesContents[i], "utf-8");

        filesRoutes.push(mainRoute);
      } else {
        const objectClassRoute = this.buildClassFileName(
          this.classesCreated[i - 1].className,
        );

        await fs.promises.writeFile(
          objectClassRoute,
          classesContents[i],
          "utf-8",
        );

        filesRoutes.push(objectClassRoute);
      }
    }

    const zp = new AdmZip();
    const zipName = `${this.config.fileName}.zip`;
    const zipPath = path.join(this.baseLocation, zipName);

    for (let i = 0; i < filesRoutes.length; i++) {
      const r = filesRoutes[i];
      zp.addLocalFile(r);
      await fs.promises.unlink(r);
    }

    zp.writeZip(zipPath);

    return zipPath;
  }

  private createDataTypes(data: any): DataType {
    const dType = DataType.filterTypeByValue(data);
    return dType;
  }

  public generateMainContent(content: Array<MainContentData>): string {
    let mainContent = "";
    mainContent += `public class Main {\n`;
    mainContent += `\tpublic static void main(String[] args){\n\t`;

    for (const { dataType, variableName } of content) {
      if (dataType instanceof ArrayType) {
        const arrayType = this.getArrayType(dataType);
        mainContent +=
          `\t\tList<` +
          `${arrayType}` +
          `> ${variableName} = LinkedList<` +
          `>();\n`;

        dataType.getValues().forEach((v, index) => {
          mainContent += `\t\t${arrayType} ${variableName}${
            index + 1
          } = ${this.createValueByType(v)};\n`;
        });

        for (let i = 0; i < dataType.getValues().length; i++) {
          mainContent += `\t\t${variableName}.add(${variableName}${i + 1});\n`;
        }

        mainContent += "\n";
      } else {
        mainContent += `\t\t${this.filterTypeByValue(
          dataType,
        )} ${variableName} = ${this.createValueByType(dataType)};\n\n`;
      }
    }

    mainContent += "\t}\n}\n";

    return mainContent;
  }

  public createValueByType(value: DataType): string {
    let returnValue: string;

    if (value instanceof StringType) {
      returnValue = `${JSON.stringify(value.value)}`;
    } else if (value instanceof NumberType) {
      if (value.value === Infinity) {
        returnValue = "Double.POSITIVE_INFINITY";
      } else if (value.value === -Infinity) {
        returnValue = "Double.NEGATIVE_INFINITY";
      } else if (Number.isNaN(value.value)) {
        returnValue = "Double.NaN";
      } else {
        returnValue = `${value.value}`;
      }
    } else if (value instanceof BooleanType) {
      returnValue = `${value.value}`;
    } else if (value instanceof NullType) {
      returnValue = "null";
    } else if (value instanceof RegExpType) {
      returnValue = `java.util.regex.Pattern.compile("${value.value.source}")`;
    } else if (value instanceof BigintType) {
      returnValue = `new java.math.BigInteger(${value.value.toString()})`;
    } else if (value instanceof DateType) {
      const year = value.value.getFullYear().toString();
      const month = (value.value.getMonth() + 1).toString().padStart(2, "0");
      const day = value.value.getDate().toString().padStart(2, "0");

      returnValue = `java.time.LocalDate.of(${year}, ${month}, ${day})`;
    } else if (value instanceof ArrayType) {
      returnValue = `java.util.Arrays.asList(new ${this.getArrayType(
        value,
      )}[]{`;

      returnValue += value
        .getValues()
        .map((v) => this.createValueByType(v))
        .join(", ");

      returnValue += "})";
    } else {
      const object = value as ObjectType;
      const foundClass = this.createObjectClass(object);

      const objectArguments = foundClass.classType
        .getKeys()
        .map((k) => this.createValueByType(k.dataType))
        .join(", ");
      returnValue = `new ${foundClass.className}(${objectArguments})`;
    }

    return returnValue;
  }

  public filterTypeByValue(value: DataType): string {
    let returnType: string;

    if (value instanceof StringType) {
      returnType = "String";
    } else if (value instanceof FloatType) {
      returnType = "Double";
    } else if (value instanceof IntegerType) {
      returnType = "Integer";
    } else if (value instanceof BooleanType) {
      returnType = "Boolean";
    } else if (value instanceof DateType) {
      returnType = "java.time.LocalDate";
    } else if (value instanceof NullType) {
      returnType = "Object";
    } else if (value instanceof ArrayType) {
      returnType = `java.util.List<` + `${this.getArrayType(value)}` + `>`;
    } else if (value instanceof BigintType) {
      returnType = `java.math.BigInteger`;
    } else if (value instanceof RegExpType) {
      returnType = "java.util.regex.Pattern";
    } else {
      returnType = this.createObjectClass(value as ObjectType).className;
    }

    return returnType;
  }

  private getArrayType(array: ArrayType): string {
    const arrayType = array.getArrayType();
    return arrayType ? this.filterTypeByValue(arrayType) : "Object";
  }

  private createObjectClass(object: ObjectType): JavaClassCreated {
    const foundClass = this.classesCreated.find((c) =>
      c.classType.equal(object),
    );

    if (foundClass) {
      return { classType: object, className: foundClass.className };
    } else {
      const className = `Object${this.idSchema.mongodbID().getValue()}`;

      const newClass = {
        className,
        classType: object,
      };

      this.classesCreated.push(newClass);

      return newClass;
    }
  }

  public createClassFileContent(classInf: JavaClassCreated): string {
    let classContent = "";

    classContent += `public class ${classInf.className}{\n`;

    classInf.classType.getKeys().forEach((k) => {
      classContent += `\tprivate ${this.filterTypeByValue(k.dataType)} ${
        k.key
      };\n`;
    });

    const constructorArguments = classInf.classType
      .getKeys()
      .map(
        (k) =>
          `${this.filterTypeByValue(k.dataType)} ${this.createObjectKeyName(
            k.key,
          )}`,
      )
      .join(", ");
    classContent += `\tpublic ${classInf.className}(${constructorArguments}){\n`;
    classInf.classType.getKeys().forEach((c) => {
      classContent += `\t\tthis.${this.createObjectKeyName(
        c.key,
      )} = ${this.createObjectKeyName(c.key)};\n`;
    });
    classContent += "\t}";

    classContent += `}\n`;

    return classContent;
  }

  private createObjectKeyName(key: string): string {
    return key.trim().replace(" ", "_");
  }

  private buildClassFileName(className: string): string {
    return path.join(this.baseLocation, `${className}.java`);
  }
}
