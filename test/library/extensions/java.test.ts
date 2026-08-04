import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { SIMPLE_ARRAY } from "./core/simple-array";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Java", () => {
  it("array of objects. should generate one class file per object type and a Main file", () => {
    const files = chaca.transform(
      [
        { id: 1, name: "Alberto", admin: true },
        { id: 2, name: "Carolina", admin: false },
      ],
      { filename: "users", format: "java" },
    );

    expect(files.map((f) => f.filename)).toEqual(["Users.java", "Main.java"]);

    expect(files[0].content).toBe(
      [
        `package chaca.data;`,
        ``,
        `public class Users {`,
        `   private Integer id;`,
        `   private String name;`,
        `   private Boolean admin;`,
        ``,
        `   public Users(Integer id, String name, Boolean admin) {`,
        `      this.id = id;`,
        `      this.name = name;`,
        `      this.admin = admin;`,
        `   }`,
        ``,
        `   public Integer getId() {`,
        `      return this.id;`,
        `   }`,
        ``,
        `   public void setId(Integer id) {`,
        `      this.id = id;`,
        `   }`,
        ``,
        `   public String getName() {`,
        `      return this.name;`,
        `   }`,
        ``,
        `   public void setName(String name) {`,
        `      this.name = name;`,
        `   }`,
        ``,
        `   public Boolean getAdmin() {`,
        `      return this.admin;`,
        `   }`,
        ``,
        `   public void setAdmin(Boolean admin) {`,
        `      this.admin = admin;`,
        `   }`,
        `}`,
      ].join("\n"),
    );

    expect(files[1].content).toBe(
      [
        `package chaca.data;`,
        ``,
        `import java.util.List;`,
        `import java.util.LinkedList;`,
        ``,
        `public class Main {`,
        `   public static void main(String[] args) {`,
        `      List<Users> users = new LinkedList<>();`,
        `      users.add(`,
        `         new Users(`,
        `            1,`,
        `            "Alberto",`,
        `            true`,
        `         )`,
        `      );`,
        `      users.add(`,
        `         new Users(`,
        `            2,`,
        `            "Carolina",`,
        `            false`,
        `         )`,
        `      );`,
        `   }`,
        `}`,
      ].join("\n"),
    );
  });

  it("float fields. should be typed as Float with an 'f' suffixed literal", () => {
    const files = chaca.transform([{ score: 5.5 }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`private Float score;`);
    expect(files[1].content).toContain(`5.5f`);
  });

  it("bigint fields. should be typed as BigInteger and built from a decimal string", () => {
    const files = chaca.transform([{ v: BigInt("9007199254740993") }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`import java.math.BigInteger;`);
    expect(files[0].content).toContain(`private BigInteger v;`);
    expect(files[1].content).toContain(`new BigInteger("9007199254740993")`);
  });

  it("date fields. should be typed as LocalDateTime with a parseable value", () => {
    const files = chaca.transform(
      [{ v: new Date("2020-01-01T00:00:00.000Z") }],
      { filename: "data", format: "java" },
    );

    expect(files[0].content).toContain(`import java.time.LocalDateTime;`);
    expect(files[0].content).toContain(`private LocalDateTime v;`);
    expect(files[1].content).toContain(
      `LocalDateTime.parse("2020-01-01T00:00:00.000")`,
    );
  });

  it("fields named like java reserved words. should be renamed with the Value suffix", () => {
    const files = chaca.transform([{ class: 1, int: 2 }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`private Integer classValue;`);
    expect(files[0].content).toContain(`private Integer intValue;`);
    expect(files[0].content).toContain(`public Integer getClassValue() {`);
    expect(files[0].content).not.toContain(`getClass()`);
  });

  it("mixed types across documents. should throw an error with a descriptive message", () => {
    expect(() =>
      chaca.transform([{ v: 1 }, { v: "x" }], {
        filename: "data",
        format: "java",
      }),
    ).toThrow(
      `On field 'v' exist values of type number and string. The data must be uniform`,
    );
  });

  it("nested objects. should generate one class per nested object type", () => {
    const files = chaca.transform(
      [{ username: "ana", address: { city: "Madrid", zip: 28001 } }],
      { filename: "nested", format: "java" },
    );

    expect(files.map((f) => f.filename)).toEqual([
      "Nested.java",
      "NestedAddress.java",
      "Main.java",
    ]);

    expect(files[1].content).toContain(`public class NestedAddress {`);
    expect(files[1].content).toContain(`private String city;`);
    expect(files[1].content).toContain(`private Integer zip;`);
    expect(files[2].content).toContain(`new NestedAddress(`);
  });

  it("array fields. should be typed as List and built with Arrays.asList", () => {
    const files = chaca.transform([{ tags: ["a", "b"] }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`private List<String> tags;`);
    expect(files[1].content).toContain(`import java.util.Arrays;`);
    expect(files[1].content).toContain(`Arrays.asList(`);
  });

  it("null and undefined fields. should be typed as Object with null value", () => {
    const files = chaca.transform([{ n: null, u: undefined }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`private Object n;`);
    expect(files[0].content).toContain(`private Object u;`);
  });

  it("NaN fields. should be typed as Float with Float.NaN value", () => {
    const files = chaca.transform([{ v: NaN }], {
      filename: "data",
      format: "java",
    });

    expect(files[0].content).toContain(`private Float v;`);
    expect(files[1].content).toContain(`Float.NaN`);
  });

  it("string fields. should escape quotes and line breaks", () => {
    const files = chaca.transform([{ v: 'hola "mundo"\nsegunda' }], {
      filename: "data",
      format: "java",
    });

    expect(files[1].content).toContain(`"hola \\"mundo\\"\\nsegunda"`);
  });

  describe("package argument", () => {
    it("package = 'com.example.demo'. every file should declare that package", () => {
      const files = chaca.transform([{ a: 1 }], {
        filename: "data",
        format: { ext: "java", package: "com.example.demo" },
      });

      for (const file of files) {
        expect(file.content).toContain(`package com.example.demo;`);
      }
    });

    it("no package. should default to chaca.data", () => {
      const files = chaca.transform([{ a: 1 }], {
        filename: "data",
        format: "java",
      });

      for (const file of files) {
        expect(file.content).toContain(`package chaca.data;`);
      }
    });
  });

  describe("declarationOnly argument", () => {
    it("declarationOnly = true. should generate only the class files without Main", () => {
      const files = chaca.transform([{ a: 1 }], {
        filename: "data",
        format: { ext: "java", declarationOnly: true },
      });

      expect(files.map((f) => f.filename)).toEqual(["Data.java"]);
    });
  });

  describe("indent argument", () => {
    it("indent = 5. should use 5 spaces", () => {
      const files = chaca.transform([{ a: 1 }], {
        filename: "data",
        format: { ext: "java", indent: 5 },
      });

      expect(files[0].content).toContain(`     private Integer a;`);
    });
  });

  describe("skipInvalid argument", () => {
    it("skipInvalid = false (default). a function value should throw an error", () => {
      expect(() =>
        chaca.transform([{ v: () => 1 }], {
          filename: "data",
          format: "java",
        }),
      ).toThrow(ChacaError);
    });

    it("skipInvalid = true. a function value should be omitted", () => {
      const files = chaca.transform([{ v: () => 1, a: 1 }], {
        filename: "data",
        format: { ext: "java", skipInvalid: true },
      });

      expect(files[0].content).toContain(`private Integer a;`);
      expect(files[0].content).not.toContain(` v;`);
      expect(files[0].content).not.toContain(`getV`);
    });
  });

  describe("filename casing", () => {
    it("kebab-case filename. should generate pascal case class and camel case variable", () => {
      const files = chaca.transform([{ id: 1 }], {
        filename: "one-row",
        format: "java",
      });

      expect(files[0].filename).toBe("OneRow.java");
      expect(files[0].content).toContain(`public class OneRow {`);
      expect(files[1].content).toContain(
        `List<OneRow> oneRow = new LinkedList<>();`,
      );
    });
  });

  describe("invalid inputs", () => {
    it.each([
      ["simple object", SIMPLE_OBJECT],
      ["mixed array", SIMPLE_ARRAY],
      ["string", "foo"],
      ["int", 5],
      ["boolean", true],
      ["null", null],
      ["undefined", undefined],
    ])("%s. should throw an error", (_, value) => {
      expect(() =>
        chaca.transform(value, { filename: "data", format: "java" }),
      ).toThrow(ChacaError);
    });
  });
});
