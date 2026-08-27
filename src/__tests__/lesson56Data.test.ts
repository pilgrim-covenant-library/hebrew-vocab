import { hw5Meta, hw5Sections } from '@/data/homework/hw5-questions';
import { hw6Meta, hw6Sections } from '@/data/homework/hw6-questions';
import {
  EXTENDED_HOMEWORKS,
  EXTENDED_HOMEWORK_ORDER,
  getHomework,
} from '@/data/homework/extended-registry';
import { LEGACY_EXTENDED_HOMEWORKS } from '@/data/homework/legacy/extended-registry';
import type { ExtendedHomeworkMeta } from '@/types/homework-extended';
import type { HomeworkQuestion } from '@/types/homework';

const hasHebrew = (s: string) => /[֐-׿]/.test(s);
// Strip Hebrew points/accents (niqqud + te'amim + Maqqef, U+0591–U+05C7).
const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');

function validateOptions(options: string[], correctIndex: number) {
  expect(options).toHaveLength(4);
  expect(new Set(options).size).toBe(4);
  expect(correctIndex).toBeGreaterThanOrEqual(0);
  expect(correctIndex).toBeLessThan(4);
}

const cases: Array<{
  name: string;
  meta: ExtendedHomeworkMeta;
  sections: Record<number, HomeworkQuestion[]>;
}> = [
  { name: 'HW5 (ch 11-13)', meta: hw5Meta, sections: hw5Sections },
  { name: 'HW6 (ch 14-16)', meta: hw6Meta, sections: hw6Sections },
];

describe.each(cases)('$name data', ({ meta, sections }) => {
  const allQuestions: HomeworkQuestion[] = Object.values(sections).flat();

  it('has five sections whose counts match the meta', () => {
    expect(meta.sections).toHaveLength(5);
    for (const section of meta.sections) {
      expect(meta.sectionQuestions[section.id]).toHaveLength(section.questionCount);
    }
    expect(meta.totalQuestions).toBe(allQuestions.length);
  });

  it('has a verse-translation section showing Hebrew with English-only options', () => {
    const verses = sections[5];
    expect(verses.length).toBeGreaterThanOrEqual(6);
    for (const question of verses) {
      expect(question.type).toBe('mcq');
      if (question.type !== 'mcq') continue;
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('uses unique IDs and valid options without any heavily skewed answer position', () => {
    expect(new Set(allQuestions.map((q) => q.id)).size).toBe(allQuestions.length);
    const tally = [0, 0, 0, 0];
    for (const question of allQuestions) {
      if (question.type === 'mcq') {
        validateOptions(question.options, question.correctIndex);
        tally[question.correctIndex] += 1;
      }
      if (question.type === 'paired_mcq') {
        validateOptions(question.transliterationOptions, question.transliterationCorrectIndex);
        validateOptions(question.meaningOptions, question.meaningCorrectIndex);
        tally[question.transliterationCorrectIndex] += 1;
        tally[question.meaningCorrectIndex] += 1;
      }
    }
    const positions = tally.reduce((sum, count) => sum + count, 0);
    for (const count of tally) {
      expect(count / positions).toBeLessThan(0.4);
    }
  });

  it('has no MCQ whose four Hebrew options differ only by vowel/dagesh marks', () => {
    const offenders = allQuestions
      .filter((q): q is typeof q & { type: 'mcq' } => q.type === 'mcq')
      .filter((q) => q.options.every(hasHebrew) && new Set(q.options.map(skeleton)).size <= 1)
      .map((q) => q.id);
    expect(offenders).toEqual([]);
  });
});

describe('HW5 and HW6 are both released', () => {
  it('wires HW5 into the active homework registry', () => {
    expect(getHomework('hw5')).toBe(hw5Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw5');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw5');
  });

  it('wires HW6 into the active homework registry', () => {
    expect(getHomework('hw6')).toBe(hw6Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw6');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw6');
  });

  it('keeps the archived construct/qal banks reachable via the legacy registry', () => {
    expect(LEGACY_EXTENDED_HOMEWORKS.hw5.title).toMatch(/construct/i);
    expect(LEGACY_EXTENDED_HOMEWORKS.hw6.title).toMatch(/qal/i);
  });
});
