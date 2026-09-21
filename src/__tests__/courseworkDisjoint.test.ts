// The three vocabulary banks must not overlap: homework is the baseline, the
// practice-paper vocabulary section may not reuse a homework word, and the
// top-300 drill may not reuse a word from either. Overlap used to be invisible —
// 30% of the practice paper's vocabulary words were already in a homework.

import * as fs from 'fs';
import * as path from 'path';

import * as hw1 from '@/data/homework/hw1-questions';
import * as hw2 from '@/data/homework/hw2-questions';
import * as hw3 from '@/data/homework/hw3-questions';
import * as hw4 from '@/data/homework/hw4-questions';
import * as hw5 from '@/data/homework/hw5-questions';
import * as hw6 from '@/data/homework/hw6-questions';
import * as hw7 from '@/data/homework/hw7-questions';
import * as hw8 from '@/data/homework/hw8-questions';
import * as hw9 from '@/data/homework/hw9-questions';
import * as hw10 from '@/data/homework/hw10-questions';
import {
  class13GrammarQuestions,
  class13VocabQuestions,
  class13VerseAnalysisQuestions,
} from '@/data/review/class13PracticePaper';
import {
  class13ExamGrammarQuestions,
  class13ExamVocabQuestions,
  class13ExamVerseAnalysisQuestions,
} from '@/data/review/class13FinalExam';
import type { PracticeMCQ } from '@/data/review/practicePaper';
import { collectCourseworkWords, courseworkWordKey } from '@/lib/coursework';
import { COURSEWORK_WORDS } from '@/data/courseworkWords';
import { getCommonOTVocab } from '@/lib/commonVocab';

const homeworkModules = [hw1, hw2, hw3, hw4, hw5, hw6, hw7, hw8, hw9, hw10];
const paperBanks = [
  class13GrammarQuestions,
  class13VocabQuestions,
  class13VerseAnalysisQuestions,
  class13ExamGrammarQuestions,
  class13ExamVocabQuestions,
  class13ExamVerseAnalysisQuestions,
];

const homeworkWords = new Set<string>();
for (const mod of homeworkModules) collectCourseworkWords(mod, homeworkWords);

const paperWords = new Set<string>();
for (const bank of paperBanks) collectCourseworkWords(bank, paperWords);

const expectedCoursework = [...new Set([...homeworkWords, ...paperWords])].sort();

describe('the generated coursework word list', () => {
  const file = path.join(__dirname, '..', 'data', 'courseworkWords.ts');

  it('matches the live question banks', () => {
    if (process.env.UPDATE_COURSEWORK_WORDS) {
      const source = fs.readFileSync(file, 'utf8');
      const rewritten = source.replace(
        /export const COURSEWORK_WORDS: readonly string\[\] = \[[\s\S]*?\];/,
        `export const COURSEWORK_WORDS: readonly string[] = [\n${expectedCoursework
          .map((w) => `  '${w}',`)
          .join('\n')}\n];`,
      );
      fs.writeFileSync(file, rewritten);
    }
    expect([...COURSEWORK_WORDS].sort()).toEqual(expectedCoursework);
  });

  it('is not empty and holds only consonantal keys', () => {
    expect(COURSEWORK_WORDS.length).toBeGreaterThan(300);
    for (const word of COURSEWORK_WORDS) {
      expect(word).toMatch(/^[א-ת]{2,}$/);
    }
  });
});

// Both the word an item asks about and any Hebrew quoted in its options: a
// familiar word offered as a distractor is still a word out of the homeworks.
function homeworkRepeats(questions: readonly PracticeMCQ[]): string[] {
  const repeats: string[] = [];
  for (const question of questions) {
    const words = new Set<string>();
    collectCourseworkWords([{ hebrew: question.hebrew, options: question.options }], words);
    for (const word of words) {
      if (homeworkWords.has(word)) repeats.push(`${question.id}: ${word}`);
    }
  }
  return repeats;
}

describe('practice-paper vocabulary section', () => {
  it('reuses no homework word', () => {
    expect(homeworkRepeats(class13VocabQuestions)).toEqual([]);
  });

  it('asks each word only once', () => {
    const asked = class13VocabQuestions.map((q) => courseworkWordKey(q.hebrew ?? ''));
    const duplicated = asked.filter((w, i) => w && asked.indexOf(w) !== i);
    expect(duplicated).toEqual([]);
  });
});

describe('final-exam vocabulary section', () => {
  // Thirty-four of its forty items come from the practice paper, but the six
  // exam-only replacements are authored here and were not covered before.
  it('reuses no homework word', () => {
    expect(homeworkRepeats(class13ExamVocabQuestions)).toEqual([]);
  });

  it('asks each word only once', () => {
    const asked = class13ExamVocabQuestions.map((q) => courseworkWordKey(q.hebrew ?? ''));
    const duplicated = asked.filter((w, i) => w && asked.indexOf(w) !== i);
    expect(duplicated).toEqual([]);
  });
});

describe('top-300 common vocabulary drill', () => {
  const drill = getCommonOTVocab();

  it('reuses no homework word', () => {
    const repeats = drill
      .filter((w) => homeworkWords.has(courseworkWordKey(w.hebrew)))
      .map((w) => `${w.id} ${w.hebrew}`);
    expect(repeats).toEqual([]);
  });

  it('reuses no practice-paper or final-exam word', () => {
    const repeats = drill
      .filter((w) => paperWords.has(courseworkWordKey(w.hebrew)))
      .map((w) => `${w.id} ${w.hebrew}`);
    expect(repeats).toEqual([]);
  });

  it('still holds 300 words, most frequent first', () => {
    expect(drill).toHaveLength(300);
    for (let i = 1; i < drill.length; i++) {
      expect(drill[i - 1].frequency).toBeGreaterThanOrEqual(drill[i].frequency);
    }
  });
});
