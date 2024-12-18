import { ChacaUtils } from "../../../core/utils";
import { DatatypeModule } from "../../datatype";

type OS = "lin" | "mac" | "win";

type Browser = "chrome" | "iexplorer" | "firefox" | "safari" | "opera";

const LANGUAGES = [
  "AB",
  "AF",
  "AN",
  "AR",
  "AS",
  "AZ",
  "BE",
  "BG",
  "BN",
  "BO",
  "BR",
  "BS",
  "CA",
  "CE",
  "CO",
  "CS",
  "CU",
  "CY",
  "DA",
  "DE",
  "EL",
  "EN",
  "EO",
  "ES",
  "ET",
  "EU",
  "FA",
  "FI",
  "FJ",
  "FO",
  "FR",
  "FY",
  "GA",
  "GD",
  "GL",
  "GV",
  "HE",
  "HI",
  "HR",
  "HT",
  "HU",
  "HY",
  "ID",
  "IS",
  "IT",
  "JA",
  "JV",
  "KA",
  "KG",
  "KO",
  "KU",
  "KW",
  "KY",
  "LA",
  "LB",
  "LI",
  "LN",
  "LT",
  "LV",
  "MG",
  "MK",
  "MN",
  "MO",
  "MS",
  "MT",
  "MY",
  "NB",
  "NE",
  "NL",
  "NN",
  "NO",
  "OC",
  "PL",
  "PT",
  "RM",
  "RO",
  "RU",
  "SC",
  "SE",
  "SK",
  "SL",
  "SO",
  "SQ",
  "SR",
  "SV",
  "SW",
  "TK",
  "TR",
  "TY",
  "UK",
  "UR",
  "UZ",
  "VI",
  "VO",
  "YI",
  "ZH",
];

export function GenerateUserAgent(
  datatypeModule: DatatypeModule,
  utils: ChacaUtils,
): string {
  const weightedKeyFromObject = <T extends Record<string, number>>(
    obj: T,
  ): keyof T => {
    //returns a random key from the passed object; keys are weighted by the decimal probability in their value
    const rand = datatypeModule.int({ min: 0, max: 100 }) / 100;
    let min = 0;
    let max = 0;
    let return_val = "";

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        max = obj[key] + min;
        return_val = key;
        if (rand >= min && rand <= max) {
          break;
        }
        min = min + obj[key];
      }
    }

    return return_val;
  };

  const randomLang = (): string => utils.oneOfArray(LANGUAGES);

  const randomBrowserAndOS = (): [Browser, OS] => {
    const browser: Browser = weightedKeyFromObject({
      chrome: 0.45132810566,
      iexplorer: 0.27477061836,
      firefox: 0.19384170608,
      safari: 0.06186781118,
      opera: 0.01574236955,
    });

    const os: OS = weightedKeyFromObject(
      {
        chrome: { win: 0.89, mac: 0.09, lin: 0.02 },
        firefox: { win: 0.83, mac: 0.16, lin: 0.01 },
        opera: { win: 0.91, mac: 0.03, lin: 0.06 },
        safari: { win: 0.04, mac: 0.96 },
        iexplorer: { win: 1 },
      }[browser],
    ) as OS;

    return [browser, os];
  };

  const randomProc = (arch: OS): string => {
    const procs = {
      lin: ["i686", "x86_64"],
      mac: { Intel: 0.48, PPC: 0.01, "U; Intel": 0.48, "U; PPC": 0.01 },
      win: ["", "WOW64", "Win64; x64"],
    };
    const archValue = procs[arch];
    const proc = Array.isArray(archValue)
      ? utils.oneOfArray(archValue)
      : weightedKeyFromObject(archValue);

    return proc;
  };

  const randomRevision = (dots: number): string => {
    let return_val = "";
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (let x = 0; x < dots; x++) {
      return_val += `.${datatypeModule.int({ min: 0, max: 9 })}`;
    }
    return return_val;
  };

  const version_string = {
    net() {
      return [
        datatypeModule.int({ min: 1, max: 4 }),
        datatypeModule.int({ min: 0, max: 9 }),
        datatypeModule.int({ min: 10000, max: 99999 }),
        datatypeModule.int({ min: 0, max: 9 }),
      ].join(".");
    },
    nt() {
      return [
        datatypeModule.int({ min: 5, max: 6 }),
        datatypeModule.int({ min: 0, max: 3 }),
      ].join(".");
    },
    ie() {
      return datatypeModule.int({ min: 7, max: 11 });
    },
    trident() {
      return [
        datatypeModule.int({ min: 3, max: 7 }),
        datatypeModule.int({ min: 0, max: 1 }),
      ].join(".");
    },
    osx(delim?: string) {
      return [
        10,
        datatypeModule.int({ min: 5, max: 10 }),
        datatypeModule.int({ min: 0, max: 9 }),
      ].join(delim || ".");
    },
    chrome() {
      return [
        datatypeModule.int({ min: 13, max: 39 }),
        0,
        datatypeModule.int({ min: 800, max: 899 }),
        0,
      ].join(".");
    },
    presto() {
      return `2.9.${datatypeModule.int({ min: 160, max: 190 })}`;
    },
    presto2() {
      return `${datatypeModule.int({ min: 10, max: 12 })}.00`;
    },
    safari() {
      return [
        datatypeModule.int({ min: 531, max: 538 }),
        datatypeModule.int({ min: 0, max: 2 }),
        datatypeModule.int({ min: 0, max: 2 }),
      ].join(".");
    },
  };

  const browserMap = {
    firefox(arch: OS): string {
      //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
      const firefox_ver = `${datatypeModule.int({
          min: 5,
          max: 15,
        })}${randomRevision(2)}`,
        gecko_ver = `Gecko/20100101 Firefox/${firefox_ver}`,
        proc = randomProc(arch),
        os_ver =
          arch === "win"
            ? `(Windows NT ${version_string.nt()}${proc ? `; ${proc}` : ""}`
            : arch === "mac"
            ? `(Macintosh; ${proc} Mac OS X ${version_string.osx()}`
            : `(X11; Linux ${proc}`;

      return `Mozilla/5.0 ${os_ver}; rv:${firefox_ver.slice(
        0,
        -2,
      )}) ${gecko_ver}`;
    },

    iexplorer(): string {
      const ver = version_string.ie();

      if (ver >= 11) {
        //http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
        return `Mozilla/5.0 (Windows NT 6.${datatypeModule.int({
          min: 1,
          max: 3,
        })}; Trident/7.0; ${
          datatypeModule.boolean() ? "Touch; " : ""
        }rv:11.0) like Gecko`;
      }

      //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
      return `Mozilla/5.0 (compatible; MSIE ${ver}.0; Windows NT ${version_string.nt()}; Trident/${version_string.trident()}${
        datatypeModule.boolean() ? `; .NET CLR ${version_string.net()}` : ""
      })`;
    },

    opera(arch: OS): string {
      //http://www.opera.com/docs/history/
      const presto_ver = ` Presto/${version_string.presto()} Version/${version_string.presto2()})`,
        os_ver =
          arch === "win"
            ? `(Windows NT ${version_string.nt()}; U; ${randomLang()}${presto_ver}`
            : arch === "lin"
            ? `(X11; Linux ${randomProc(arch)}; U; ${randomLang()}${presto_ver}`
            : `(Macintosh; Intel Mac OS X ${version_string.osx()} U; ${randomLang()} Presto/${version_string.presto()} Version/${version_string.presto2()})`;

      return `Opera/${datatypeModule.int({
        min: 9,
        max: 14,
      })}.${datatypeModule.int({
        min: 0,
        max: 99,
      })} ${os_ver}`;
    },

    safari(arch: OS): string {
      const safari = version_string.safari(),
        ver = `${datatypeModule.int({
          min: 4,
          max: 7,
        })}.${datatypeModule.int({
          min: 0,
          max: 1,
        })}.${datatypeModule.int({ min: 0, max: 10 })}`,
        os_ver =
          arch === "mac"
            ? `(Macintosh; ${randomProc("mac")} Mac OS X ${version_string.osx(
                "_",
              )} rv:${datatypeModule.int({
                min: 2,
                max: 6,
              })}.0; ${randomLang()}) `
            : `(Windows; U; Windows NT ${version_string.nt()})`;

      return `Mozilla/5.0 ${os_ver}AppleWebKit/${safari} (KHTML, like Gecko) Version/${ver} Safari/${safari}`;
    },

    chrome(arch: OS): string {
      const safari = version_string.safari(),
        os_ver =
          arch === "mac"
            ? `(Macintosh; ${randomProc("mac")} Mac OS X ${version_string.osx(
                "_",
              )}) `
            : arch === "win"
            ? `(Windows; U; Windows NT ${version_string.nt()})`
            : `(X11; Linux ${randomProc(arch)}`;

      return `Mozilla/5.0 ${os_ver} AppleWebKit/${safari} (KHTML, like Gecko) Chrome/${version_string.chrome()} Safari/${safari}`;
    },
  };

  const [browser, arch] = randomBrowserAndOS();
  return browserMap[browser](arch);
}
