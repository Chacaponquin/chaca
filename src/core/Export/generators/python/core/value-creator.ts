import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { Datatype } from "../../../core/datatype";
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
  ) {}

  execute({ route, value }: Props): PythonDatatype {
    const type = Datatype.filter<PythonDatatype>(value, {
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
          const datatype = this.execute({ route: route, value: v });

          array.setValue(datatype);
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

        for (const [key, data] of Object.entries(value)) {
          const fieldname = new PythonClassFieldName(this.utils, key);

          const datatype = this.execute({
            route: route.create(key),
            value: data,
          });

          const saveField = save.search(
            new SaveClassField(fieldname, datatype),
          );

          const field = new PythonClassField(saveField, datatype);

          object.setField(field);
        }

        return object;
      },
      bigint(value) {
        return new PythonInt(value);
      },
      function() {
        throw new ChacaError(
          `You can not export a function into a python file.`,
        );
      },
      symbol() {
        throw new ChacaError(`You can not export a Symbol into a python file.`);
      },
    });

    return type;
  }
}
