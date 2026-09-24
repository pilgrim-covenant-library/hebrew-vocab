// A drill question may have only one option a student could defend. Two
// distinct words glossed alike — שָׁלַךְ and יָרָה both "To throw", עוֹף and
// צִפּוֹר both "Bird" — would make a distractor read as a second right answer.

import vocabularyData from '@/data/vocabulary.json';
import { getCommonOTVocab } from '@/lib/commonVocab';
import { generateQuizQuestion, leadingSense } from '@/lib/commonVocabQuiz';
import type { VocabularyWord } from '@/types';

const allWords = vocabularyData.words as VocabularyWord[];
const byGloss = new Map(allWords.map((w) => [w.gloss, w]));

describe('generateQuizQuestion', () => {
  it('should offer four distinct options with the gloss at correctIndex', () => {
    for (const word of getCommonOTVocab()) {
      const q = generateQuizQuestion(word, allWords);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options[q.correctIndex]).toBe(word.gloss);
    }
  });

  it('should never offer a distractor that opens with the answer\'s sense', () => {
    const clashes: string[] = [];
    for (let round = 0; round < 5; round++) {
      for (const word of getCommonOTVocab()) {
        const q = generateQuizQuestion(word, allWords);
        const sense = leadingSense(word.gloss);
        q.options.forEach((option, i) => {
          if (i !== q.correctIndex && leadingSense(option) === sense) clashes.push(`${word.hebrew}: ${option}`);
        });
      }
    }
    expect([...new Set(clashes)]).toEqual([]);
  });

  it('should never offer a homograph of the prompt as a distractor', () => {
    for (let round = 0; round < 3; round++) {
      for (const word of getCommonOTVocab()) {
        const q = generateQuizQuestion(word, allWords);
        q.options.forEach((option, i) => {
          if (i !== q.correctIndex) expect(byGloss.get(option)?.hebrew).not.toBe(word.hebrew);
        });
      }
    }
  });
});

describe('leadingSense', () => {
  it('should compare the first sense of a gloss case-insensitively', () => {
    expect(leadingSense('To throw, cast, hurl')).toBe(leadingSense('To throw, shoot; to teach'));
    expect(leadingSense('Bird, sparrow')).toBe(leadingSense('Bird, flying creatures'));
    expect(leadingSense('To praise')).not.toBe(leadingSense('To pray, intercede'));
  });
});
