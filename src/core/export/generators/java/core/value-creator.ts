import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { Datatype } from "../../../core/datatype";
import { SkipInvalid } from "../../../core/skip-invalid";
import { JavaClasses } from "./classes";
import { JavaClassFieldName, JavaClassName } from "./names";
import { Parent } from "./parent";
import {
  JavaArray,
  JavaBigint,
  JavaBoolean,
  JavaClass,
  JavaClassField,
  JavaDatatype,
  JavaDate,
  JavaFloat,
  JavaInt,
  JavaNull,
  JavaRegexp,
  JavaString,
} from "./types";

interface CreateProps {
  value: any;
  parent: Parent;
}

export class ValueCreator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly classes: JavaClasses,
    private readonly skipInvalid: SkipInvalid,
  ) {}

  execute({ value, parent }: CreateProps): JavaDatatype | null {
    const type = Datatype.filter<JavaDatatype | null>(value, {
      bigint(value) {
        return new JavaBigint(value);
      },
      string(value) {
        return new JavaString(value);
      },
      boolean(value) {
        return new JavaBoolean(value);
      },
      regexp: (value) => {
        return new JavaRegexp(value);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        }

        throw new ChacaError(`You can not export a function into a java file.`);
      },
      date(value) {
        return new JavaDate(value);
      },
      null() {
        return new JavaNull();
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        }

        throw new ChacaError(
          `You can not export a Symbol into a javascript file.`,
        );
      },
      float(value) {
        return new JavaFloat(value);
      },
      nan(value) {
        return new JavaFloat(value);
      },
      int(value) {
        return new JavaInt(value);
      },
      undefined() {
        return new JavaNull();
      },
      object: (value) => {
        const classname = new JavaClassName(this.utils, parent);
        const saveClass = this.classes.find(classname);

        const object = new JavaClass(saveClass, parent);

        for (const [key, data] of Object.entries(value)) {
          const fieldName = new JavaClassFieldName(this.utils, key);

          const newParent = parent.create(key);

          const datatype = this.execute({
            value: data,
            parent: newParent,
          });

          if (datatype) {
            const saveField = saveClass.find(fieldName, datatype);

            const field = new JavaClassField(datatype, saveField);

            object.setField(field);
          }
        }

        saveClass.add(object);

        return object;
      },
      array: (value) => {
        const array = new JavaArray();

        for (const v of value) {
          const datatype = this.execute({ parent: parent, value: v });

          if (datatype) {
            array.add(datatype);
          }
        }

        return array;
      },
    });

    return type;
  }
}
