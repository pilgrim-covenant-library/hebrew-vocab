import {
  CLASS4_CH10_CONTEXT_GROUPS,
  CLASS4_CH8_CONTEXT_GROUPS,
  CLASS4_CH9_CONTEXT_GROUPS,
  CLASS4_CONSTRUCT_MEMORY_GROUPS,
  CLASS4_CONTEXT_GROUPS,
  CLASS4_PRONOUN_GROUPS,
  CLASS4_PRONOUN_MEMORY_GROUPS,
  CLASS4_SUFFIX_GROUPS,
  CLASS4_SUFFIX_MEMORY_GROUPS,
  CLASS4_CONSTRUCT_GROUPS,
  CLASS4_VERSE_GROUPS,
  CLASS4_WORD_GROUPS,
} from '@/data/class4-mcq';
import {
  buildClass4Session,
  CLASS4_MODES,
} from '@/lib/class4Practice';
import { hw4Meta, hw4Sections } from '@/data/homework/hw4-questions';
import { EXTENDED_HOMEWORKS, getHomework } from '@/data/homework/extended-registry';
import type { HomeworkQuestion } from '@/types/homework';
import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function validateOptions(options: string[], correctIndex: number) {
  expect(options).toHaveLength(4);
  expect(new Set(options).size).toBe(4);
  expect(correctIndex).toBeGreaterThanOrEqual(0);
  expect(correctIndex).toBeLessThan(4);
}

const hasHebrew = (s: string) => /[֐-׿]/.test(s);
// Strip Hebrew points/accents (niqqud + te'amim + Maqqef, U+0591–U+05C7),
// leaving the bare consonant skeleton.
const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');

const allGroups: PracticeQuestionGroup[] = [
  ...CLASS4_PRONOUN_GROUPS,
  ...CLASS4_SUFFIX_GROUPS,
  ...CLASS4_CONSTRUCT_GROUPS,
  ...CLASS4_VERSE_GROUPS,
  ...CLASS4_WORD_GROUPS,
];
const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

describe('Class 4 practice data', () => {
  it('has the planned bank sizes', () => {
    expect(CLASS4_PRONOUN_GROUPS).toHaveLength(21);
    expect(CLASS4_SUFFIX_GROUPS).toHaveLength(21);
    expect(CLASS4_CONSTRUCT_GROUPS).toHaveLength(16);
    expect(CLASS4_VERSE_GROUPS).toHaveLength(18);
    expect(CLASS4_WORD_GROUPS).toHaveLength(21);
    expect(CLASS4_PRONOUN_MEMORY_GROUPS).toHaveLength(11);
    expect(CLASS4_SUFFIX_MEMORY_GROUPS).toHaveLength(11);
    expect(CLASS4_CONSTRUCT_MEMORY_GROUPS).toHaveLength(6);
    expect(CLASS4_CONTEXT_GROUPS).toHaveLength(12);
  });

  it('directly drills the missing Chapter 8 pronoun and question forms', () => {
    const forms = CLASS4_PRONOUN_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'אַתָּה',
      'אַתְּ',
      'אַתֶּם',
      'אַתֶּן',
      'הִיא',
      'הֵם',
      'הֵן',
      'זֶה',
      'זֹאת',
      'מָה',
      'הֲ',
    ]));
  });

  it('covers the missing Type 1 suffix values and representative Type 2 forms', () => {
    const forms = CLASS4_SUFFIX_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'סוּסֵךְ',
      'סוּסָהּ',
      'סוּסֵנוּ',
      'סוּסְכֶם',
      'סוּסְכֶן',
      'סוּסָם',
      'סוּסָן',
      'סוּסַי',
      'סוּסָיו',
    ]));
  });

  it('interweaves four contextual translations into each Chapter 8-10 mode', () => {
    expect(CLASS4_CH8_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS4_CH9_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS4_CH10_CONTEXT_GROUPS).toHaveLength(4);

    for (const group of CLASS4_CONTEXT_GROUPS) {
      expect(group.questions).toHaveLength(1);
      const question = group.questions[0];
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('builds the exact advertised number of unique screens for every mode', () => {
    for (const mode of CLASS4_MODES) {
      const session = buildClass4Session(mode.id);
      expect(session).toHaveLength(mode.count);
      expect(new Set(session.map((question) => question.id)).size).toBe(session.length);
    }

    // The previous builder advertised 40 but expanded paired word groups to 46.
    for (let run = 0; run < 10; run += 1) {
      expect(buildClass4Session('all')).toHaveLength(40);
    }
  });

  it('keeps vocabulary stages paired (transliteration before meaning)', () => {
    for (const group of CLASS4_WORD_GROUPS) {
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

  it('shows a Hebrew verse and English-only answer options for each verse question', () => {
    const verses = CLASS4_VERSE_GROUPS.flatMap((group) => group.questions);
    expect(verses).toHaveLength(18);
    for (const question of verses) {
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
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
});

describe('Homework 4 data', () => {
  const allQuestions: HomeworkQuestion[] = Object.values(hw4Sections).flat();

  it('has five sections whose counts match the meta', () => {
    expect(hw4Meta.id).toBe('hw4');
    expect(hw4Meta.sections).toHaveLength(5);
    for (const section of hw4Meta.sections) {
      expect(hw4Meta.sectionQuestions[section.id]).toHaveLength(section.questionCount);
    }
    expect(hw4Meta.totalQuestions).toBe(allQuestions.length);
  });

  it('covers Chapters 8-10, not the archived noun numbering', () => {
    expect(hw4Meta.title).toMatch(/pronoun|construct/i);
    expect(hw4Meta.title).not.toMatch(/gender|plural/i);
  });

  it('has a verse-translation section showing Hebrew with English-only options', () => {
    const verses = hw4Sections[5];
    expect(verses.length).toBeGreaterThanOrEqual(6);
    for (const question of verses) {
      expect(question.type).toBe('mcq');
      if (question.type !== 'mcq') continue;
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('uses unique IDs and valid options without any heavily skewed answer position', () => {
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(allQuestions.length);
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

  it('is wired into the active homework registry', () => {
    expect(getHomework('hw4')).toBe(hw4Meta);
    expect(EXTENDED_HOMEWORKS.hw4).toBe(hw4Meta);
  });
});
