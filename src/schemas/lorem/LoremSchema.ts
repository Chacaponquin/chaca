import { faker } from "@faker-js/faker";
import { SchemaField } from "../SchemaField";
import { loremIpsum } from "lorem-ipsum";

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

type LinesProps = {
  linesCount?: number;
};

export class LoremSchema {
  public paragraphs(args?: ParagraphsProps) {
    return new SchemaField<string, ParagraphsProps>(
      "paragraphs",
      (a) => {
        const separator = typeof a.separator === "string" ? a.separator : "\n";
        const cant =
          typeof a.paragraphsCount === "number" && a.paragraphsCount > 0
            ? a.paragraphsCount
            : 3;
        const maxS =
          typeof a.maxSentences === "number" && a.maxSentences > 0
            ? a.maxSentences
            : undefined;
        const minS =
          typeof a.minSentences === "number" && a.minSentences > 0
            ? a.minSentences
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

  public slug(args: SlugProps) {
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

  public text(args: TextProps) {
    return new SchemaField<string, TextProps>(
      "text",
      (a) => {
        const text = loremIpsum({
          format: "plain",
          units: "paragraph",
          count: 30000,
        });

        if (a.character_max || a.character_min) {
          let charMin =
            typeof a.character_min === "number" && a.character_min > 0
              ? a.character_min
              : 0;
          let charMax =
            typeof a.character_max === "number" && a.character_max > charMin
              ? a.character_max
              : undefined;

          return text.slice(charMin, charMax);
        } else return text;
      },
      args || {},
    );
  }
}
