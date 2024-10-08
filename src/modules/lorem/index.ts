import { loremIpsum } from "lorem-ipsum";

export type WordsProps = {
  count?: number;
};

export type SlugProps = {
  wordCount?: number;
};

export type SentencesProps = {
  sentencesCount?: number;
  separator?: string;
  wordsMax?: number;
  wordsMin?: number;
};

export type ParagraphsProps = {
  paragraphsCount?: number;
  separator?: string;
  minSentences?: number;
  maxSentences?: number;
};

export class LoremModule {
  /**
   * @param args.paragraphsCount Number of paragraphs. Default `3`
   * @param args.separator Separator between paragraphs. Default `\n`
   * @param args.maxSentences Maximun of sentences of each paragraphs
   * @param args.minSentences Min of sentences of each paragraphs
   *
   * @example modules.lorem.paragraphs()
   * @returns string
   */
  paragraphs({
    maxSentences,
    minSentences,
    paragraphsCount,
    separator: iseparator,
  }: ParagraphsProps = {}): string {
    const separator = iseparator ? iseparator : "\n";
    const cant =
      typeof paragraphsCount === "number" && paragraphsCount > 0
        ? paragraphsCount
        : 3;
    const minS =
      typeof minSentences === "number" && minSentences > 0
        ? minSentences
        : undefined;
    const maxS =
      typeof maxSentences === "number" && maxSentences > 0
        ? maxSentences
        : undefined;

    return loremIpsum({
      format: "plain",
      suffix: separator,
      count: cant,
      paragraphUpperBound: maxS,
      paragraphLowerBound: minS,
      units: "paragraphs",
    });
  }

  /**
   * @param args.sentencesCount Number of sentences. Default in `3`
   * @param args.separator Separator between sentences. Default `\n`
   * @param args.wordsMin Minimun of words in each sentence
   * @param args.wordsMax Maximun of words in each sentence
   *
   * @example modules.lorem.sentences()
   * @returns
   */
  sentences({
    sentencesCount,
    separator: iseparator,
    wordsMax,
    wordsMin,
  }: SentencesProps = {}): string {
    const cant =
      typeof sentencesCount === "number" && sentencesCount > 0
        ? sentencesCount
        : 3;
    const separator = iseparator ? iseparator : "\n";
    const wordMin =
      typeof wordsMin === "number" && wordsMin > 0 ? wordsMin : undefined;
    const wordMax =
      typeof wordsMax === "number" && wordsMax > 0 ? wordsMax : undefined;

    return loremIpsum({
      format: "plain",
      units: "sentences",
      count: cant,
      suffix: separator,
      sentenceLowerBound: wordMin,
      sentenceUpperBound: wordMax,
    });
  }

  /**
   * @param args.wordCount Number of words in the slug. Default `3`
   * @example modules.lorem.slug() // 'lorem-ipsum-ad'
   * @returns string
   */
  slug({ wordCount }: SlugProps = {}): string {
    const cant = typeof wordCount === "number" && wordCount > 0 ? wordCount : 3;

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
  }

  /**
   *
   * @param args.count Number or words. Default `5`
   * @example modules.lorem.words() // 'lorem ipsum in'
   * @returns string
   */
  words({ count: icount }: WordsProps = {}): string {
    const count = typeof icount === "number" && icount > 0 ? icount : 5;

    return loremIpsum({ format: "plain", units: "words", count: count });
  }

  /**
   * Generates a word .
   *
   * @example
   * modules.lorem.word() // 'temporibus'
   */
  word(): string {
    return loremIpsum({ format: "plain", units: "words", count: 1 });
  }
}
