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
  paragraphs(a?: ParagraphsProps): string {
    const {
      maxSentences = undefined,
      minSentences = undefined,
      paragraphsCount = undefined,
      separator: iseparator = undefined,
    } = a ? a : {};

    const separator = iseparator ? iseparator : "\n";
    const cant = paragraphsCount && paragraphsCount > 0 ? paragraphsCount : 3;
    const minS = minSentences && minSentences > 0 ? minSentences : undefined;
    const maxS = maxSentences && maxSentences > 0 ? maxSentences : undefined;

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
  sentences(a?: SentencesProps): string {
    const {
      sentencesCount = undefined,
      separator: iseparator = undefined,
      wordsMax = undefined,
      wordsMin = undefined,
    } = a ? a : {};

    const cant = sentencesCount && sentencesCount > 0 ? sentencesCount : 3;
    const separator = iseparator ? iseparator : "\n";
    const wordMin = wordsMin && wordsMin > 0 ? wordsMin : undefined;
    const wordMax = wordsMax && wordsMax > 0 ? wordsMax : undefined;

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
   * @param args.wordCount Number of words in the slug
   * @example modules.lorem.slug() // 'lorem-ipsum-ad'
   * @returns string
   */
  slug(a?: SlugProps): string {
    const { wordCount = undefined } = a ? a : {};

    const cant = wordCount && wordCount > 0 ? wordCount : 3;

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
  words(a?: WordsProps) {
    const { count: icount = undefined } = a ? a : {};
    const count = icount && icount > 0 ? icount : 5;

    return loremIpsum({ format: "plain", units: "words", count: count });
  }
}
