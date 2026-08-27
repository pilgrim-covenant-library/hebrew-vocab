import {
  CLASS6_CH14_CONTEXT_GROUPS,
  CLASS6_CH15_CONTEXT_GROUPS,
  CLASS6_CH16_CONTEXT_GROUPS,
  CLASS6_CONTEXT_GROUPS,
  CLASS6_IMPERFECT_STRONG_GROUPS,
  CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS,
  CLASS6_IMPERFECT_WEAK_GROUPS,
  CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS,
  CLASS6_PERFECT_WEAK_GROUPS,
  CLASS6_PERFECT_WEAK_MEMORY_GROUPS,
  CLASS6_VERSE_GROUPS,
  CLASS6_WORD_GROUPS,
} from '@/data/class6-mcq';
import {
  buildClass6Session,
  CLASS6_MODES,
} from '@/lib/class6Practice';
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
  ...CLASS6_PERFECT_WEAK_GROUPS,
  ...CLASS6_IMPERFECT_STRONG_GROUPS,
  ...CLASS6_IMPERFECT_WEAK_GROUPS,
  ...CLASS6_VERSE_GROUPS,
  ...CLASS6_WORD_GROUPS,
];
const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

describe('Class 6 practice data', () => {
  it('has the planned bank sizes', () => {
    expect(CLASS6_PERFECT_WEAK_GROUPS).toHaveLength(20);
    expect(CLASS6_IMPERFECT_STRONG_GROUPS).toHaveLength(21);
    expect(CLASS6_IMPERFECT_WEAK_GROUPS).toHaveLength(20);
    expect(CLASS6_VERSE_GROUPS).toHaveLength(18);
    expect(CLASS6_WORD_GROUPS).toHaveLength(20);
    expect(CLASS6_PERFECT_WEAK_MEMORY_GROUPS).toHaveLength(10);
    expect(CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS).toHaveLength(11);
    expect(CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS).toHaveLength(10);
    expect(CLASS6_CONTEXT_GROUPS).toHaveLength(12);
  });

  it('drills the whole Qal Imperfect strong paradigm of קטל', () => {
    const forms = CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'יִקְטֹל',
      'תִּקְטֹל',
      'תִּקְטְלִי',
      'אֶקְטֹל',
      'יִקְטְלוּ',
      'תִּקְטְלוּ',
      'תִּקְטֹלְנָה',
      'נִקְטֹל',
    ]));
  });

  it('drills a weak Perfect form from every Chapter 14 class', () => {
    const forms = CLASS6_PERFECT_WEAK_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'בָּנִיתִי', // III-ה
      'מָצָאתִי', // III-א
      'קָם', // Biconsonantal, third person
      'קַמְתָּ', // Biconsonantal, second person
      'סַבּוֹתָ', // Geminate
      'הָיִיתָ', // III-ה
    ]));
  });

  it('drills the Chapter 16 weak Imperfect diagnostics', () => {
    const forms = CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'יִפֹּל', // I-נ assimilation
      'יִקַּח', // לקח assimilates like I-נ
      'יֵשֵׁב', // I-י, Tsere preformative
      'יִבְנֶה', // III-ה, Seghol-He
      'יָקוּם', // Biconsonantal
      'אֶהְיֶה', // doubly weak
    ]));
  });

  it('interweaves four contextual translations into each Chapter 14-16 mode', () => {
    expect(CLASS6_CH14_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS6_CH15_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS6_CH16_CONTEXT_GROUPS).toHaveLength(4);

    for (const group of CLASS6_CONTEXT_GROUPS) {
      expect(group.questions).toHaveLength(1);
      const question = group.questions[0];
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('builds the exact advertised number of unique screens for every mode', () => {
    for (const mode of CLASS6_MODES) {
      const session = buildClass6Session(mode.id);
      expect(session).toHaveLength(mode.count);
      expect(new Set(session.map((question) => question.id)).size).toBe(session.length);
    }

    for (let run = 0; run < 10; run += 1) {
      expect(buildClass6Session('all')).toHaveLength(40);
    }
  });

  it('keeps vocabulary stages paired (transliteration before meaning)', () => {
    for (const group of CLASS6_WORD_GROUPS) {
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
    const verses = CLASS6_VERSE_GROUPS.flatMap((group) => group.questions);
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

  it('keeps every answer position well below a skewed share', () => {
    const tally = [0, 0, 0, 0];
    for (const question of allPractice) {
      tally[question.correctIndex] += 1;
    }
    const positions = tally.reduce((sum, count) => sum + count, 0);
    for (const count of tally) {
      expect(count / positions).toBeLessThan(0.4);
    }
  });
});
