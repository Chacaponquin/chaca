import { SchemaField } from '../../utils/SchemaField';
import { faker } from '@faker-js/faker';

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
};

type ParagraphsProps = {
  paragraphsCount?: number;
  separator?: string;
};

type LinesProps = {
  linesCount?: number;
};

export class LoremSchema {
  public lines(args?: LinesProps) {
    return new SchemaField<string, LinesProps>(
      'lines',
      (a) => {
        return faker.lorem.lines(a.linesCount);
      },
      args || {},
    );
  }

  public paragraphs(args?: ParagraphsProps) {
    return new SchemaField<string, ParagraphsProps>(
      'paragraphs',
      (a) => {
        return faker.lorem.paragraphs(a.paragraphsCount, a.separator);
      },
      args || {},
    );
  }

  public sentences(args?: SentencesProps) {
    return new SchemaField<string, SentencesProps>(
      'sentences',
      (a) => {
        return faker.lorem.sentences(a.sentencesCount, a.separator);
      },
      args || {},
    );
  }

  public slug(args: SlugProps) {
    return new SchemaField<string, SlugProps>(
      'slug',
      (a) => {
        return faker.lorem.slug(a.wordCount);
      },
      args || {},
    );
  }

  public words(args?: WordsProps) {
    return new SchemaField<string, WordsProps>(
      'words',
      (a) => {
        return faker.lorem.words(a.count);
      },
      args || {},
    );
  }

  public text(args: TextProps) {
    return new SchemaField<string, TextProps>(
      'text',
      (a) => {
        const text = faker.lorem.text();

        if (a.character_max || a.character_min) {
          let charMin =
            typeof a.character_min === 'number' && a.character_min > 0
              ? a.character_min
              : 0;
          let charMax =
            typeof a.character_max === 'number' && a.character_max > charMin
              ? a.character_max
              : undefined;

          return text.slice(charMin, charMax);
        } else return text;
      },
      args || {},
    );
  }
}
