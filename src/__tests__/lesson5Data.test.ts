import {
  CLASS5_CARDINAL_MEMORY_GROUPS,
  CLASS5_CH11_CONTEXT_GROUPS,
  CLASS5_CH12_CONTEXT_GROUPS,
  CLASS5_CH13_CONTEXT_GROUPS,
  CLASS5_CONTEXT_GROUPS,
  CLASS5_NUMBER_GROUPS,
  CLASS5_NUMBER_MEMORY_GROUPS,
  CLASS5_ORDINAL_MEMORY_GROUPS,
  CLASS5_QAL_GROUPS,
  CLASS5_QAL_MEMORY_GROUPS,
  CLASS5_VERB_GROUPS,
  CLASS5_VERB_MEMORY_GROUPS,
  CLASS5_VERSE_GROUPS,
  CLASS5_WORD_GROUPS,
} from '@/data/class5-mcq';
import {
  buildClass5Session,
  CLASS5_MODES,
} from '@/lib/class5Practice';
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
  ...CLASS5_NUMBER_GROUPS,
  ...CLASS5_VERB_GROUPS,
  ...CLASS5_QAL_GROUPS,
  ...CLASS5_VERSE_GROUPS,
  ...CLASS5_WORD_GROUPS,
];
const allPractice: PracticeQuestion[] = allGroups.flatMap((group) => group.questions);

describe('Class 5 practice data', () => {
  it('has the planned bank sizes', () => {
    expect(CLASS5_NUMBER_GROUPS).toHaveLength(33);
    expect(CLASS5_VERB_GROUPS).toHaveLength(20);
    expect(CLASS5_QAL_GROUPS).toHaveLength(21);
    expect(CLASS5_VERSE_GROUPS).toHaveLength(18);
    expect(CLASS5_WORD_GROUPS).toHaveLength(20);
    expect(CLASS5_CARDINAL_MEMORY_GROUPS).toHaveLength(13);
    expect(CLASS5_ORDINAL_MEMORY_GROUPS).toHaveLength(10);
    expect(CLASS5_NUMBER_MEMORY_GROUPS).toHaveLength(23);
    expect(CLASS5_VERB_MEMORY_GROUPS).toHaveLength(10);
    expect(CLASS5_QAL_MEMORY_GROUPS).toHaveLength(11);
    expect(CLASS5_CONTEXT_GROUPS).toHaveLength(12);
  });

  it('directly drills the masculine absolute cardinals one through ten', () => {
    const forms = CLASS5_CARDINAL_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'אֶחָד',
      'שְׁנַיִם',
      'שְׁלֹשָׁה',
      'אַרְבָּעָה',
      'חֲמִשָּׁה',
      'שִׁשָּׁה',
      'שִׁבְעָה',
      'שְׁמֹנָה',
      'תִּשְׁעָה',
      'עֲשָׂרָה',
    ]));
  });

  it('drills the large cardinals one hundred, one thousand, and ten thousand', () => {
    const forms = CLASS5_CARDINAL_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining(['מֵאָה', 'אֶלֶף', 'רְבָבָה']));
  });

  it('drills the masculine ordinals first through tenth', () => {
    const forms = CLASS5_ORDINAL_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'רִאשׁוֹן',
      'שֵׁנִי',
      'שְׁלִישִׁי',
      'רְבִיעִי',
      'חֲמִישִׁי',
      'שִׁשִּׁי',
      'שְׁבִיעִי',
      'שְׁמִינִי',
      'תְּשִׁיעִי',
      'עֲשִׂירִי',
    ]));
  });

  it('drills the Qal Perfect strong paradigm across every person, gender, and number', () => {
    const forms = CLASS5_QAL_MEMORY_GROUPS
      .flatMap((group) => group.questions)
      .map((question) => question.hebrew);

    expect(forms).toEqual(expect.arrayContaining([
      'קָטַל',
      'קָטְלָה',
      'קָטַלְתָּ',
      'קָטַלְתְּ',
      'קָטַלְתִּי',
      'קָטְלוּ',
      'קְטַלְתֶּם',
      'קְטַלְתֶּן',
      'קָטַלְנוּ',
    ]));
  });

  it('interweaves four contextual translations into each Chapter 11-13 mode', () => {
    expect(CLASS5_CH11_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS5_CH12_CONTEXT_GROUPS).toHaveLength(4);
    expect(CLASS5_CH13_CONTEXT_GROUPS).toHaveLength(4);

    for (const group of CLASS5_CONTEXT_GROUPS) {
      expect(group.questions).toHaveLength(1);
      const question = group.questions[0];
      expect(question.hebrew && hasHebrew(question.hebrew)).toBeTruthy();
      expect(question.options.some(hasHebrew)).toBe(false);
    }
  });

  it('builds the exact advertised number of unique screens for every mode', () => {
    for (const mode of CLASS5_MODES) {
      const session = buildClass5Session(mode.id);
      expect(session).toHaveLength(mode.count);
      expect(new Set(session.map((question) => question.id)).size).toBe(session.length);
    }

    for (let run = 0; run < 10; run += 1) {
      expect(buildClass5Session('all')).toHaveLength(40);
    }
  });

  it('keeps vocabulary stages paired (transliteration before meaning)', () => {
    for (const group of CLASS5_WORD_GROUPS) {
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
    const verses = CLASS5_VERSE_GROUPS.flatMap((group) => group.questions);
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
