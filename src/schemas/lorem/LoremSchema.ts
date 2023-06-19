import { SchemaField } from "../SchemaField.js";
import { loremIpsum } from "lorem-ipsum";
import { DataTypeSchema } from "../dataType/DataTypeSchema.js";

type WordsProps = {
  count?: number;
};

type TextProps = {
  character_min?: number;
  character_max?: number;
};

type SlugProps = {
  wordCount?: number;
};

type SentencesProps = {
  sentencesCount?: number;
  separator?: string;
  wordsMax?: number;
  wordsMin?: number;
};

type ParagraphsProps = {
  paragraphsCount?: number;
  separator?: string;
  minSentences?: number;
  maxSentences?: number;
};

export class LoremSchema {
  private dataTypeSchema = new DataTypeSchema();

  /**
   * @param args.paragraphsCount Number of paragraphs. Default `3`
   * @param args.separator Separator between paragraphs. Default `\n`
   * @param args.maxSentences Maximun of sentences of each paragraphs
   * @param args.minSentences Min of sentences of each paragraphs
   * @example schemas.lorem.paragraphs() // Schema
   * @example schemas.lorem.paragraphs().getValue()
   * @returns string
   */
  public paragraphs(args?: ParagraphsProps) {
    return new SchemaField<string, ParagraphsProps>(
      "paragraphs",
      (a) => {
        const separator = typeof a.separator === "string" ? a.separator : "\n";
        const cant =
          typeof a.paragraphsCount === "number" && a.paragraphsCount > 0
            ? a.paragraphsCount
            : 3;
        const minS =
          typeof a.minSentences === "number" && a.minSentences > 0
            ? a.minSentences
            : undefined;
        const maxS =
          typeof a.maxSentences === "number" && a.maxSentences > 0
            ? a.maxSentences
            : undefined;

        return loremIpsum({
          format: "plain",
          suffix: separator,
          count: cant,
          paragraphUpperBound: maxS,
          paragraphLowerBound: minS,
          units: "paragraphs",
        });
      },
      args || {},
    );
  }

  /**
   * @param args.sentencesCount Number of sentences. Default in `3`
   * @param args.separator Separator between sentences. Default `\n`
   * @param args.wordsMin Minimun of words in each sentence
   * @param args.wordsMax Maximun of words in each sentence
   * @example schemas.lorem.sentences() // Schema
   * @example schemas.lorem.sentences().getValue()
   * @returns
   */
  public sentences(args?: SentencesProps) {
    return new SchemaField<string, SentencesProps>(
      "sentences",
      (a) => {
        const cant =
          typeof a.sentencesCount === "number" && a.sentencesCount > 0
            ? a.sentencesCount
            : 3;
        const separator = typeof a.separator === "string" ? a.separator : "\n";
        const wordMin =
          typeof a.wordsMin === "number" && a.wordsMin > 0
            ? a.wordsMin
            : undefined;
        const wordMax =
          typeof a.wordsMax === "number" && a.wordsMax > 0
            ? a.wordsMax
            : undefined;

        return loremIpsum({
          format: "plain",
          units: "sentences",
          count: cant,
          suffix: separator,
          sentenceLowerBound: wordMin,
          sentenceUpperBound: wordMax,
        });
      },
      args || {},
    );
  }

  /**
   * @param args.wordCount Number of words in the slug
   * @example schemas.lorem.slug() // Schema
   * @example schemas.lorem.slug().getValue() // 'lorem-ipsum-ad'
   * @returns string
   */
  public slug(args?: SlugProps) {
    return new SchemaField<string, SlugProps>(
      "slug",
      (a) => {
        const cant =
          typeof a.wordCount === "number" && a.wordCount > 0 ? a.wordCount : 3;

        const words = loremIpsum({
          format: "plain",
          count: cant,
          units: "words",
        });

        let retString = "";
        for (let i = 0; i < words.length; i++) {
          retString = retString.concat(words[i] === " " ? "-" : words[i]);
        }

        return retString;
      },
      args || {},
    );
  }

  /**
   *
   * @param args.count Number or words. Default `5`
   * @example schemas.lorem.words() // Schema
   * @example schemas.lorem.words().getValue() // 'lorem ipsum in'
   * @returns string
   */
  public words(args?: WordsProps) {
    return new SchemaField<string, WordsProps>(
      "words",
      (a) => {
        const cant = typeof a.count === "number" && a.count > 0 ? a.count : 5;
        return loremIpsum({ format: "plain", units: "words", count: cant });
      },
      args || {},
    );
  }

  /**
   * @param args.character_min Minimun of characters in the text
   * @param args.character_max Maximun of characters in the text
   * @example schemas.lorem.text() // Schema
   * @example schemas.lorem.text().getValue()
   * @returns string
   */
  public text(args?: TextProps) {
    return new SchemaField<string, TextProps>(
      "text",
      (a) => {
        const text = loremIpsum({
          format: "plain",
          units: "paragraph",
          count: this.dataTypeSchema.int().getValue({ min: 100, max: 3000 }),
        });

        if (a.character_max || a.character_min) {
          const charMin =
            typeof a.character_min === "number" && a.character_min > 0
              ? a.character_min
              : 0;
          const charMax =
            typeof a.character_max === "number" && a.character_max > charMin
              ? a.character_max
              : this.dataTypeSchema.int().getValue({ min: 300, max: 1000 });

          return text.slice(
            0,
            this.dataTypeSchema.int().getValue({ min: charMin, max: charMax }),
          );
        } else return text;
      },
      args || {},
    );
  }
}
