// A drill question may have only one option a student could defend. Two
// distinct words glossed alike — שָׁלַךְ and יָרָה both "To throw", עוֹף and
// צִפּוֹר both "Bird" — would make a distractor read as a second right answer.

import vocabularyData from '@/data/vocabulary.json';
import { getCommonOTVocab, isProperName } from '@/lib/commonVocab';
import { generateChallengeQuestion, generateQuizQuestion, leadingSense } from '@/lib/commonVocabQuiz';
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

describe('generateQuizQuestion distractors', () => {
  it('should never offer a name or a blank as a wrong option', () => {
    // A gloss is a name's only if no ordinary word shares it ("Seven" is שֶׁבַע too).
    const ordinaryGlosses = new Set(allWords.filter((w) => !isProperName(w)).map((w) => w.gloss));
    const names = new Set([...allWords.filter(isProperName).map((w) => w.gloss).filter((g) => !ordinaryGlosses.has(g)), '']);
    const offered: string[] = [];
    for (let round = 0; round < 3; round++) {
      for (const word of getCommonOTVocab()) {
        const q = generateQuizQuestion(word, allWords);
        q.options.forEach((option, i) => {
          if (i !== q.correctIndex && names.has(option)) offered.push(option);
        });
      }
    }
    expect([...new Set(offered)]).toEqual([]);
  });
});

describe('generateChallengeQuestion', () => {
  // Wrong options drawn from all 8,674 entries were raw Strong's prose at the
  // deeper levels ("Almug sticks", "Properly") beside a cleaned answer, so the
  // answer was the only polished option. They now come from the challenge itself.
  it('should draw every option from the challenge\'s own glosses', () => {
    const challengeGlosses = new Set(getCommonOTVocab().map((w) => w.gloss));
    const outside: string[] = [];
    for (let round = 0; round < 3; round++) {
      for (const word of getCommonOTVocab()) {
        for (const option of generateChallengeQuestion(word).options) {
          if (!challengeGlosses.has(option)) outside.push(option);
        }
      }
    }
    expect([...new Set(outside)]).toEqual([]);
  });

  it('should still offer four distinct options with the answer among them', () => {
    for (const word of getCommonOTVocab()) {
      const q = generateChallengeQuestion(word);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options[q.correctIndex]).toBe(word.gloss);
    }
  });
});
