import { ChacaError } from "../../../../../errors";
import { ChacaUtils } from "../../../../utils";
import { Datatype } from "../../../core/datatype";
import { SkipInvalid } from "../../../core/skip-invalid";
import {
  JavascriptClasses,
  SaveClassField,
  SaveJavascriptClass,
} from "./classes";
import { JavascriptClassFieldName, JavascriptClassName } from "./names";
import { Route } from "./route";
import {
  JavascriptArray,
  JavascriptBignInt,
  JavascriptBoolean,
  JavascriptClass,
  JavascriptClassField,
  JavascriptDatatype,
  JavascriptDate,
  JavascriptNull,
  JavascriptNumber,
  JavascriptRegExp,
  JavascriptString,
  JavascriptUndefined,
} from "./types";

interface Props {
  route: Route;
  value: any;
}

export class ValueCreator {
  constructor(
    private readonly classes: JavascriptClasses,
    private readonly utils: ChacaUtils,
    private readonly skipInvalid: SkipInvalid,
  ) {}

  execute({ route, value }: Props): JavascriptDatatype | null {
    const type = Datatype.filter<JavascriptDatatype | null>(value, {
      string(value) {
        return new JavascriptString(value);
      },
      int(value) {
        return new JavascriptNumber(value);
      },
      float(value) {
        return new JavascriptNumber(value);
      },
      nan() {
        return new JavascriptNumber(value);
      },
      bigint(value) {
        return new JavascriptBignInt(value);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        } else {
          throw new ChacaError(
            `You can not export a function to a javascript file.`,
          );
        }
      },
      boolean(value) {
        return new JavascriptBoolean(value);
      },
      undefined() {
        return new JavascriptUndefined();
      },
      array: (value) => {
        const array = new JavascriptArray();

        for (const v of value) {
          const sub = this.execute({ route: route.clone(), value: v });

          if (sub) {
            array.setValue(sub);
          }
        }

        return array;
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        } else {
          throw new ChacaError(
            `You can not export a Symbol into a javascript file.`,
          );
        }
      },
      null() {
        return new JavascriptNull();
      },
      date(value) {
        return new JavascriptDate(value);
      },
      regexp(value) {
        return new JavascriptRegExp(value);
      },
      object: (value) => {
        const classname = new JavascriptClassName(this.utils, route);
        const save = this.classes.search(new SaveJavascriptClass(classname));
        const object = new JavascriptClass(save);

        for (const [key, data] of Object.entries(value)) {
          const fieldname = new JavascriptClassFieldName(this.utils, key);

          const datatype = this.execute({
            value: data,
            route: route.create(key),
          });

          if (datatype) {
            const saveField = save.search(
              new SaveClassField(fieldname, datatype),
            );

            const field = new JavascriptClassField(saveField, datatype);

            object.setField(field);
          }
        }

        return object;
      },
    });

    return type;
  }
}
