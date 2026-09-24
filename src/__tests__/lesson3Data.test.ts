import {
  CLASS3_ARTICLE_WAW_GROUPS,
  CLASS3_PREPOSITION_GROUPS,
  CLASS3_ADJECTIVE_GROUPS,
  CLASS3_VERSE_GROUPS,
  CLASS3_WORD_GROUPS,
  CLASS3_REVIEW_GROUPS,
} from '@/data/class3-mcq';
import { hw3Meta, hw3Sections } from '@/data/homework/hw3-questions';
import { EXTENDED_HOMEWORK_ORDER, EXTENDED_HOMEWORKS, getHomework } from '@/data/homework/extended-registry';
import { LEGACY_EXTENDED_HOMEWORKS } from '@/data/homework/legacy/extended-registry';
import type { HomeworkQuestion } from '@/types/homework';
import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function validateOptions(options: string[], correctIndex: number) {
  expect(options).toHaveLength(4);
  expect(new Set(options).size).toBe(4);
  expect(correctIndex).toBeGreaterThanOrEqual(0);
  expect(correctIndex).toBeLessThan(4);
}

const allGroups: PracticeQuestionGroup[] = [
  ...CLASS3_ARTICLE_WAW_GROUPS,
  ...CLASS3_PREPOSITION_GROUPS,
  ...CLASS3_ADJECTIVE_GROUPS,
  ...CLASS3_VERSE_GROUPS,
  ...CLASS3_WORD_GROUPS,
  ...CLASS3_REVIEW_GROUPS,
];
const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

// Chapter 1-4 vocabulary that no earlier exercise covered; must appear in both
// the Class 3 review bank and HW3 section 5.
const REVIEW_VOCAB = [
  'אַבְרָהָם', 'אַהֲרֹן', 'דָּוִד', 'יְהוּדָה', 'יַעֲקֹב', 'יִצְחָק', 'יְרוּשָׁלַםִ',
  'אָדוֹן', 'אָדָם', 'אֲדָמָה', 'אָח', 'אָחוֹת', 'אֵל', 'אֵם',
  'גּוֹי', 'הַר',
];

describe('Class 3 practice data', () => {
  it('has the planned bank sizes', () => {
    expect(CLASS3_ARTICLE_WAW_GROUPS).toHaveLength(4);
    expect(CLASS3_PREPOSITION_GROUPS).toHaveLength(10);
    expect(CLASS3_ADJECTIVE_GROUPS).toHaveLength(11);
    expect(CLASS3_VERSE_GROUPS).toHaveLength(6);
    expect(CLASS3_WORD_GROUPS).toHaveLength(20);
    expect(CLASS3_REVIEW_GROUPS).toHaveLength(16);
  });

  it('keeps vocabulary stages paired (transliteration before meaning)', () => {
    for (const group of CLASS3_WORD_GROUPS) {
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
    const hasHebrew = (s: string) => /[֐-׿]/.test(s);
    const verses = CLASS3_VERSE_GROUPS.flatMap((group) => group.questions);
    expect(verses).toHaveLength(6);
    for (const question of verses) {
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('has no MCQ whose four Hebrew options differ only by vowel/dagesh marks', () => {
    // Strip Hebrew points/accents (niqqud + te'amim, U+0591–U+05C7), leaving the
    // bare consonant skeleton. Four options with the same skeleton are the
    // hard-to-read "spot the diacritic" format we deliberately removed.
    const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');
    const hasHebrew = (s: string) => /[֐-׿]/.test(s);
    const offenders = allPractice
      .filter((q) => q.options.every(hasHebrew) && new Set(q.options.map(skeleton)).size <= 1)
      .map((q) => q.id);
    expect(offenders).toEqual([]);
  });

  it('covers every previously omitted chapter 1-4 vocabulary item in the review bank', () => {
    const reviewHebrew = CLASS3_REVIEW_GROUPS.flatMap((group) =>
      group.questions.map((question) => question.hebrew),
    ).join(' ');
    for (const word of REVIEW_VOCAB) {
      expect(reviewHebrew).toContain(word);
    }
  });
});

describe('Homework 3 data', () => {
  const allQuestions: HomeworkQuestion[] = Object.values(hw3Sections).flat();

  it('has six sections whose counts match the meta', () => {
    expect(hw3Meta.id).toBe('hw3');
    expect(hw3Meta.sections).toHaveLength(6);
    for (const section of hw3Meta.sections) {
      expect(hw3Meta.sectionQuestions[section.id]).toHaveLength(section.questionCount);
    }
    expect(hw3Meta.totalQuestions).toBe(allQuestions.length);
  });

  it('has a verse-translation section showing Hebrew with English-only options', () => {
    const verses = hw3Sections[6];
    expect(verses.length).toBeGreaterThanOrEqual(6);
    const hasHebrew = (s: string) => /[֐-׿]/.test(s);
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
    const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');
    const hasHebrew = (s: string) => /[֐-׿]/.test(s);
    const offenders = allQuestions
      .filter((q): q is typeof q & { type: 'mcq' } => q.type === 'mcq')
      .filter((q) => q.options.every(hasHebrew) && new Set(q.options.map(skeleton)).size <= 1)
      .map((q) => q.id);
    expect(offenders).toEqual([]);
  });

  it('covers every previously omitted chapter 1-4 vocabulary item in section 5', () => {
    const sectionFive = hw3Sections[5]
      .map((question) => ('hebrew' in question ? question.hebrew : ''))
      .join(' ');
    for (const word of REVIEW_VOCAB) {
      expect(sectionFive).toContain(word);
    }
  });
});

describe('Registry wiring', () => {
  it('exposes HW2 and HW3 in the active registry and keeps legacy banks reachable', () => {
    expect(EXTENDED_HOMEWORK_ORDER).toEqual(['hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'hw8', 'hw9', 'hw10']);
    expect(Object.keys(EXTENDED_HOMEWORKS)).toEqual(['hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'hw8', 'hw9', 'hw10']);
    expect(getHomework('hw3')).toBe(hw3Meta);
    expect(getHomework('nope')).toBeUndefined();
    expect(LEGACY_EXTENDED_HOMEWORKS.hw3).toBeDefined();
    expect(LEGACY_EXTENDED_HOMEWORKS.hw3.title).toMatch(/pronoun/i);
  });
});
