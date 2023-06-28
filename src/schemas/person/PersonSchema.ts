import { SchemaField } from "../SchemaField.js";
import { ILanguageNames, NAMES, GENDERS, JOBS } from "./constants/index.js";
import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
import { DataTypeSchema } from "../dataType/DataTypeSchema.js";

type AllLanguages = "es" | "en";

type LangugeProps = {
  language?: AllLanguages;
};

type Sex = "male" | "female";

type NameProps = {
  language?: AllLanguages;
  sex?: Sex;
};

type SexProps = {
  sex?: Sex;
};

export class PersonSchema {
  private dataTypeSchema = new DataTypeSchema();

  /**
   * Returns a Job Level
   * @example schemas.person.jobLevel() // Schema
   * @example schemas.person.jobLevel().getValue() // 'Investor'
   * @returns string
   */
  jobLevel() {
    return new SchemaField<string>(
      "jobLevel",
      () => PrivateUtils.oneOfArray(JOBS.JOB_LEVELS),
      {},
    );
  }

  /**
   * Returns a Job Area
   * @example schemas.person.jobArea() // Schema
   * @example schemas.person.jobLevel().getValue() // 'Supervisor'
   * @returns string
   */
  jobArea() {
    return new SchemaField<string>(
      "jobArea",
      () => PrivateUtils.oneOfArray(JOBS.JOBS_AREAS),
      {},
    );
  }

  /**
   * Returns a person gender
   * @example schemas.person.gender() // Schema
   * @example schemas.person.gender().getValue() // 'Bigender'
   * @returns string
   */
  gender() {
    return new SchemaField<string>(
      "gender",
      () => PrivateUtils.oneOfArray(GENDERS),
      {},
    );
  }

  /**
   * Returns a person sex
   * @example schemas.person.sex() // Schema
   * @example schemas.person.sex().getValue() // 'Male'
   * @returns `Male` | `Female`
   */
  sex() {
    return new SchemaField<string>(
      "sex",
      () => PrivateUtils.oneOfArray(["Male", "Female"]),
      {},
    );
  }

  /**
   * Returns a first name from a selected lenguage
   * @param args.language (`'en'` | `'es'`). Default `'en'`
   * @param args.sex Person name sex (`'male'` | `'female'`)
   * @example schemas.person.firstName() // Schema
   * @example schemas.person.firstName().getValue() // 'Juan'
   * @returns string
   */
  firstName(args?: NameProps) {
    return new SchemaField<string, NameProps>(
      "firstName",
      (a) => {
        return PrivateUtils.oneOfArray(
          this.filterBySex(this.filterNameByLanguage(a.language), a.sex),
        );
      },
      args || {},
    );
  }

  /**
   * Returns a last name from a selected lenguage
   * @param args.language (`en` | `es`). Default `en`
   * @example schemas.person.lastName() // Schema
   * @example schemas.person.lastName().getValue() // 'Scott'
   * @returns string
   */
  lastName(args?: LangugeProps) {
    return new SchemaField<string, LangugeProps>(
      "lastName",
      (a) => {
        return PrivateUtils.oneOfArray(
          this.filterNameByLanguage(a.language).lastNames,
        );
      },
      args || {},
    );
  }

  /**
   * Returns a full name from a selected lenguage
   * @param args.language (`en` | `es`). Default `en`
   * @param args.sex (`male` | `female`)
   * @example schemas.person.fullName() // Schema
   * @example schemas.person.fullName().getValue() // 'Juan Rodriguez Perez'
   * @returns string
   */
  fullName(args?: NameProps) {
    return new SchemaField<string, NameProps>(
      "fullName",
      (a) => {
        const lan = this.filterNameByLanguage(a.language);

        const sex = a.sex
          ? a.sex
          : (PrivateUtils.oneOfArray(["male", "female"]) as Sex);

        const firstName = PrivateUtils.oneOfArray(this.filterBySex(lan, sex));
        const middleName = this.dataTypeSchema.boolean().getValue()
          ? PrivateUtils.oneOfArray(this.filterBySex(lan, sex))
          : undefined;
        const lastNameFirst = PrivateUtils.oneOfArray(lan.lastNames);
        const lastNameSecond = PrivateUtils.oneOfArray(lan.lastNames);

        const fullName = [
          firstName,
          middleName || "",
          lastNameFirst,
          lastNameSecond,
        ];

        return fullName.join(" ");
      },
      args || {},
    );
  }

  /**
   * Returns a random name prefix
   * @param args.sex Sex of the person. (`male` | `female`)
   * @example schemas.person.prefix() // Schema
   * @example schemas.person.prefix().getValue() // 'Ms.'
   * @returns string
   */
  prefix(args?: SexProps) {
    return new SchemaField<string, SexProps>(
      "preffix",
      (a) => {
        const sex = typeof a.sex === "string" ? a.sex : undefined;

        const male = ["Mr.", "Mrs.", "Dr."];
        const female = ["Ms.", "Miss"];

        if (sex) {
          if (sex === "male") return PrivateUtils.oneOfArray(male);
          else if (sex === "female") return PrivateUtils.oneOfArray(female);
          else return PrivateUtils.oneOfArray([...male, ...female]);
        } else return PrivateUtils.oneOfArray([...male, ...female]);
      },
      args || {},
    );
  }

  private filterNameByLanguage(
    language: AllLanguages | undefined,
  ): ILanguageNames {
    if (language && typeof language === "string") {
      const nameSelected = NAMES[language];
      if (nameSelected) return nameSelected;
      else return NAMES["en"];
    } else return NAMES["en"];
  }

  private filterBySex(nameSel: ILanguageNames, sex: Sex | undefined): string[] {
    if (sex && typeof sex === "string") {
      const selSex = nameSel[sex];
      if (selSex) return selSex;
      else return [...nameSel.male, ...nameSel.female];
    } else return [...nameSel.male, ...nameSel.female];
  }
}
