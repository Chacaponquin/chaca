import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { Datatype } from "../../../core/datatype";
import { SkipInvalid } from "../../../core/skip-invalid";
import { PythonClasses, SaveClassField } from "./classes";
import { PythonClassFieldName, PythonClassName } from "./names";
import { Route } from "./route";
import {
  PythonArray,
  PythonBoolean,
  PythonDatatype,
  PythonClass,
  PythonClassField,
  PythonDate,
  PythonFloat,
  PythonInt,
  PythonNone,
  PythonRegExp,
  PythonString,
} from "./type";

interface Props {
  route: Route;
  value: any;
}

export class ValueCreator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly classes: PythonClasses,
    private readonly skipInvalid: SkipInvalid,
  ) {}

  execute({ route, value }: Props): PythonDatatype | null {
    const type = Datatype.filter<PythonDatatype | null>(value, {
      string(value) {
        return new PythonString(value);
      },
      int(value) {
        return new PythonInt(value);
      },
      float(value) {
        return new PythonFloat(value);
      },
      nan(value) {
        return new PythonFloat(value);
      },
      undefined() {
        return new PythonNone();
      },
      boolean(value) {
        return new PythonBoolean(value);
      },
      array: (value) => {
        const array = new PythonArray();

        for (const v of value) {
          const datatype = this.execute({ route: route.clone(), value: v });

          if (datatype) {
            array.setValue(datatype);
          }
        }

        return array;
      },
      null() {
        return new PythonNone();
      },
      date(value) {
        return new PythonDate(value);
      },
      regexp(value) {
        return new PythonRegExp(value);
      },
      object: (value) => {
        const classname = new PythonClassName(this.utils, route);
        const save = this.classes.search(classname);

        const object = new PythonClass(save);
        const fields: PythonClassField[] = [];

        for (const [key, data] of Object.entries(value)) {
          const fieldname = new PythonClassFieldName(this.utils, key);

          const datatype = this.execute({
            route: route.create(key),
            value: data,
          });

          if (datatype) {
            const saveField = save.search(
              new SaveClassField(fieldname, datatype),
            );

            const field = new PythonClassField(saveField, datatype);

            fields.push(field);
          }
        }

        object.setFields(fields);

        return object;
      },
      bigint(value) {
        return new PythonInt(value);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        }

        throw new ChacaError(
          `You can not export a function into a python file.`,
        );
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        }

        throw new ChacaError(`You can not export a Symbol into a python file.`);
      },
    });

    return type;
  }
}
