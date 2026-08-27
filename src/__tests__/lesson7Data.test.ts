import {
  CLASS7_CH17_CONTEXT_GROUPS,
  CLASS7_CH17_GROUPS,
  CLASS7_CH17_MEMORY_GROUPS,
  CLASS7_CH18_CONTEXT_GROUPS,
  CLASS7_CH18_GROUPS,
  CLASS7_CH18_MEMORY_GROUPS,
  CLASS7_CH19_CONTEXT_GROUPS,
  CLASS7_CH19_GROUPS,
  CLASS7_CH19_MEMORY_GROUPS,
  CLASS7_CONTEXT_GROUPS,
  CLASS7_VERSE_GROUPS,
  CLASS7_WORD_GROUPS,
} from '@/data/class7-mcq';
import {
  buildClass7Session,
  CLASS7_MODES,
} from '@/lib/class7Practice';
import { hw7Meta, hw7Sections } from '@/data/homework/hw7-questions';
import {
  EXTENDED_HOMEWORKS,
  EXTENDED_HOMEWORK_ORDER,
  getHomework,
} from '@/data/homework/extended-registry';
import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function validateOptions(options: string[], correctIndex: number) {
  expect(options).toHaveLength(4);
  expect(new Set(options).size).toBe(4);
  expect(correctIndex).toBeGreaterThanOrEqual(0);
  expect(correctIndex).toBeLessThan(4);
}

const hasHebrew = (s: string) => /[֐-׿]/.test(s);
const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');

const allGroups: PracticeQuestionGroup[] = [
  ...CLASS7_CH17_GROUPS,
  ...CLASS7_CH18_GROUPS,
  ...CLASS7_CH19_GROUPS,
  ...CLASS7_VERSE_GROUPS,
  ...CLASS7_WORD_GROUPS,
];
const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

describe('Class 7 practice data', () => {
  it('has the planned bank sizes', () => {
    expect(CLASS7_CH17_GROUPS).toHaveLength(14);
    expect(CLASS7_CH18_GROUPS).toHaveLength(14);
    expect(CLASS7_CH19_GROUPS).toHaveLength(14);
    expect(CLASS7_VERSE_GROUPS).toHaveLength(18);
    expect(CLASS7_WORD_GROUPS).toHaveLength(18);
    expect(CLASS7_CH17_MEMORY_GROUPS).toHaveLength(6);
    expect(CLASS7_CH18_MEMORY_GROUPS).toHaveLength(6);
    expect(CLASS7_CH19_MEMORY_GROUPS).toHaveLength(6);
    expect(CLASS7_CONTEXT_GROUPS).toHaveLength(12);
  });

  it('drills Waw Consecutive forms and recall', () => {
    const forms = CLASS7_CH17_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'וַיִּכְתֹּב',
      'וְכָתַב',
      'וַתֹּאמֶר',
      'וַיֵּרֶד',
      'וַיִּשְׁמְעוּ',
    ]));
  });

  it('drills Qal Imperative forms across second person', () => {
    const forms = CLASS7_CH18_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'קְטֹל',
      'קִטְלִי',
      'קִטְלוּ',
      'קְטֹלְנָה',
    ]));
  });

  it('drills verb pronominal suffixes', () => {
    const forms = CLASS7_CH19_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'קְטָלוּנִי',
      'קְטָלוּהָ',
      'שְׁמָעֵנִי',
    ]));
  });

  it('builds the exact advertised number of unique screens for every mode', () => {
    for (const mode of CLASS7_MODES) {
      const session = buildClass7Session(mode.id);
      expect(session).toHaveLength(mode.count);
      expect(new Set(session.map((question) => question.id)).size).toBe(session.length);
    }

    for (let run = 0; run < 10; run += 1) {
      expect(buildClass7Session('all')).toHaveLength(40);
    }
  });

  it('uses valid four-option MCQs with unique IDs', () => {
    expect(new Set(allPractice.map((question) => question.id)).size).toBe(allPractice.length);
    for (const question of allPractice) {
      validateOptions(question.options, question.correctIndex);
    }
  });

  it('shows a Hebrew verse and English-only answer options for each verse question', () => {
    const verses = CLASS7_VERSE_GROUPS.flatMap((group) => group.questions);
    expect(verses).toHaveLength(18);
    for (const question of verses) {
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });
});

describe('HW7 release integration', () => {
  it('wires HW7 into the active homework registry with 5 sections', () => {
    expect(getHomework('hw7')).toBe(hw7Meta);
    expect(EXTENDED_HOMEWORK_ORDER).toContain('hw7');
    expect(Object.keys(EXTENDED_HOMEWORKS)).toContain('hw7');
    expect(hw7Meta.sections).toHaveLength(5);
    expect(hw7Meta.totalQuestions).toBe(50);
  });
});
