import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { CLASS7_CONFIG, CLASS7_MODES, buildClass7Session } from '@/lib/class7Practice';
import { CLASS8_CONFIG, CLASS8_MODES, buildClass8Session } from '@/lib/class8Practice';
import { CLASS9_CONFIG, CLASS9_MODES, buildClass9Session } from '@/lib/class9Practice';
import { CLASS10_CONFIG, CLASS10_MODES, buildClass10Session } from '@/lib/class10Practice';
import { CLASS11_CONFIG, CLASS11_MODES, buildClass11Session } from '@/lib/class11Practice';
import { CLASS12_CONFIG, CLASS12_MODES, buildClass12Session } from '@/lib/class12Practice';
import { allModeCount, type ClassSessionConfig } from '@/lib/classSession';
import { hw7Meta, hw7Sections } from '@/data/homework/hw7-questions';
import { hw8Meta, hw8Sections } from '@/data/homework/hw8-questions';
import { hw9Meta, hw9Sections } from '@/data/homework/hw9-questions';
import { hw10Meta, hw10Sections } from '@/data/homework/hw10-questions';
import { hw11Meta, hw11Sections } from '@/data/homework/hw11-questions';
import { hw12Meta, hw12Sections } from '@/data/homework/hw12-questions';
import {
  EXTENDED_HOMEWORKS,
  EXTENDED_HOMEWORK_ORDER,
  getHomework,
} from '@/data/homework/extended-registry';
import type { PracticeQuestion, PracticeQuestionGroup, PracticeSessionMode } from '@/types/class-practice';
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

interface ClassCase {
  name: string;
  slug: string;
  config: ClassSessionConfig;
  modes: PracticeSessionMode[];
  build: (mode: string) => PracticeQuestion[];
}

interface HomeworkCase {
  name: string;
  id: string;
  meta: ExtendedHomeworkMeta;
  sections: Record<number, HomeworkQuestion[]>;
}

const classCases: ClassCase[] = [
  { name: 'Class 7 (ch 17-19)', slug: 'class-7-mcq', config: CLASS7_CONFIG, modes: CLASS7_MODES, build: buildClass7Session },
  { name: 'Class 8 (ch 20-22)', slug: 'class-8-mcq', config: CLASS8_CONFIG, modes: CLASS8_MODES, build: buildClass8Session },
  { name: 'Class 9 (ch 23-25)', slug: 'class-9-mcq', config: CLASS9_CONFIG, modes: CLASS9_MODES, build: buildClass9Session },
  { name: 'Class 10 (ch 26-29)', slug: 'class-10-mcq', config: CLASS10_CONFIG, modes: CLASS10_MODES, build: buildClass10Session },
  { name: 'Class 11 (ch 30-33)', slug: 'class-11-mcq', config: CLASS11_CONFIG, modes: CLASS11_MODES, build: buildClass11Session },
  { name: 'Class 12 (ch 34-35)', slug: 'class-12-mcq', config: CLASS12_CONFIG, modes: CLASS12_MODES, build: buildClass12Session },
];

const homeworkCases: HomeworkCase[] = [
  { name: 'HW7 (ch 17-19)', id: 'hw7', meta: hw7Meta, sections: hw7Sections },
  { name: 'HW8 (ch 20-22)', id: 'hw8', meta: hw8Meta, sections: hw8Sections },
  { name: 'HW9 (ch 23-25)', id: 'hw9', meta: hw9Meta, sections: hw9Sections },
  { name: 'HW10 (ch 26-29)', id: 'hw10', meta: hw10Meta, sections: hw10Sections },
  { name: 'HW11 (ch 30-33)', id: 'hw11', meta: hw11Meta, sections: hw11Sections },
  { name: 'HW12 (ch 34-35)', id: 'hw12', meta: hw12Meta, sections: hw12Sections },
];

const DARK_HOMEWORK_IDS = ['hw11', 'hw12'];
const DARK_CLASS_SLUGS = ['class-11-mcq', 'class-12-mcq'];

describe.each(classCases)('$name practice data', ({ config, modes, build }) => {
  const allGroups: PracticeQuestionGroup[] = [
    ...config.chapters.flatMap((chapter) => chapter.groups),
    ...config.verseGroups,
    ...config.wordGroups,
  ];
  const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

  it('advertises 40 screens in All mode and builds exactly that many', () => {
    expect(allModeCount(config)).toBe(40);
    for (let run = 0; run < 10; run += 1) {
      const session = build('all');
      expect(session).toHaveLength(40);
      expect(new Set(session.map((question) => question.id)).size).toBe(40);
    }
  });

  it('builds the exact advertised number of unique screens for every mode', () => {
    for (const mode of modes) {
      const session = build(mode.id);
      expect(session).toHaveLength(mode.count);
      expect(new Set(session.map((question) => question.id)).size).toBe(session.length);
    }
  });

  it('gives every chapter a bank, a recall subset, and four passages', () => {
    for (const chapter of config.chapters) {
      expect(chapter.memoryGroups.length).toBeGreaterThanOrEqual(config.chapterSample);
      expect(chapter.groups.length).toBeGreaterThan(chapter.memoryGroups.length);
      expect(chapter.contextGroups).toHaveLength(4);
      for (const group of chapter.memoryGroups) {
        expect(chapter.groups).toContain(group);
      }
    }
    expect(config.contextGroups).toHaveLength(config.chapters.length * 4);
  });

  it('shows Hebrew and offers English-only options in every passage', () => {
    for (const group of config.verseGroups) {
      expect(group.questions).toHaveLength(1);
      const question = group.questions[0];
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('keeps vocabulary stages paired (transliteration before meaning)', () => {
    for (const group of config.wordGroups) {
      expect(group.questions).toHaveLength(2);
      expect(group.questions[0].category).toBe('word-transliteration');
      expect(group.questions[1].category).toBe('word-meaning');
    }
  });

  it('uses valid four-option MCQs with unique IDs', () => {
    expect(new Set(allPractice.map((question) => question.id)).size).toBe(allPractice.length);
    for (const question of allPractice) {
      validateOptions(question.options, question.correctIndex);
    }
  });

  it('does not reveal a meaning answer by repeating the displayed form in the options', () => {
    const offenders = allPractice
      .filter((question) => question.hebrew && /^What does /i.test(question.prompt))
      .filter((question) => question.options.includes(question.hebrew as string))
      .map((question) => question.id);
    expect(offenders).toEqual([]);
  });

  it('has no MCQ whose four Hebrew options differ only by vowel/dagesh marks', () => {
    const offenders = allPractice
      .filter((q) => q.options.every(hasHebrew) && new Set(q.options.map(skeleton)).size <= 1)
      .map((q) => q.id);
    expect(offenders).toEqual([]);
  });

  it('keeps every answer position well below a skewed share', () => {
    const tally = [0, 0, 0, 0];
    for (const question of allPractice) {
      tally[question.correctIndex] += 1;
    }
    const positions = tally.reduce((sum, current) => sum + current, 0);
    for (const current of tally) {
      expect(current / positions).toBeLessThan(0.4);
    }
  });
});

describe.each(homeworkCases)('$name data', ({ meta, sections }) => {
  const allQuestions: HomeworkQuestion[] = Object.values(sections).flat();

  it('has 50 questions in sections whose counts match the meta', () => {
    expect(meta.sections.length).toBeGreaterThanOrEqual(4);
    for (const section of meta.sections) {
      expect(meta.sectionQuestions[section.id]).toHaveLength(section.questionCount);
    }
    expect(meta.totalQuestions).toBe(allQuestions.length);
    expect(allQuestions).toHaveLength(50);
  });

  it('ends with a verse-translation section showing Hebrew and English-only options', () => {
    const lastSection = meta.sections[meta.sections.length - 1];
    expect(lastSection.title).toMatch(/verse/i);
    const verses = sections[lastSection.id];
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

describe('HW11-HW12 and Class 11-12 are built but still DARK', () => {
  it('keeps every new homework out of the active registry', () => {
    for (const id of DARK_HOMEWORK_IDS) {
      expect(getHomework(id)).toBeUndefined();
      expect(EXTENDED_HOMEWORK_ORDER).not.toContain(id);
      expect(Object.keys(EXTENDED_HOMEWORKS)).not.toContain(id);
    }
  });

  it('gives no new class practice a route, so none is reachable in the app', () => {
    for (const slug of DARK_CLASS_SLUGS) {
      const route = join(process.cwd(), 'src/app/class-practice', slug, 'page.tsx');
      expect(existsSync(route)).toBe(false);
    }
  });
});

describe('HW7-HW10 and Class 7-10 are released', () => {
  it('wires HW7, HW8, HW9, and HW10 into the active homework registry', () => {
    expect(getHomework('hw7')).toBe(hw7Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw7');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw7');

    expect(getHomework('hw8')).toBe(hw8Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw8');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw8');

    expect(getHomework('hw9')).toBe(hw9Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw9');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw9');

    expect(getHomework('hw10')).toBe(hw10Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw10');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw10');
  });

  it('provides valid routes for Class 7, Class 8, Class 9, and Class 10 practice', () => {
    const route7 = join(process.cwd(), 'src/app/class-practice', 'class-7-mcq', 'page.tsx');
    expect(existsSync(route7)).toBe(true);

    const route8 = join(process.cwd(), 'src/app/class-practice', 'class-8-mcq', 'page.tsx');
    expect(existsSync(route8)).toBe(true);

    const route9 = join(process.cwd(), 'src/app/class-practice', 'class-9-mcq', 'page.tsx');
    expect(existsSync(route9)).toBe(true);

    const route10 = join(process.cwd(), 'src/app/class-practice', 'class-10-mcq', 'page.tsx');
    expect(existsSync(route10)).toBe(true);
  });
});
