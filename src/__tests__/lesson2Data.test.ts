import {
  CLASS2_NOUN_GROUPS,
  CLASS2_SYLLABIFICATION_GROUPS,
  CLASS2_WORD_GROUPS,
} from '@/data/class2-mcq';
import {
  hw2Meta,
  hw2NounQuestions,
  hw2SyllabificationQuestions,
  hw2WordQuestions,
} from '@/data/homework/hw2-questions';
import { EXTENDED_HOMEWORK_ORDER, EXTENDED_HOMEWORKS } from '@/data/homework/extended-registry';
import { LEGACY_EXTENDED_HOMEWORKS } from '@/data/homework/legacy/extended-registry';
import { prepareHomeworkQuestions } from '@/lib/homeworkShuffle';
import type { HomeworkQuestion, MCQQuestion, PairedMCQQuestion } from '@/types/homework';
import type { PracticeQuestion } from '@/types/class-practice';

function validateOptions(options: string[], correctIndex: number) {
  expect(options).toHaveLength(4);
  expect(new Set(options).size).toBe(4);
  expect(correctIndex).toBeGreaterThanOrEqual(0);
  expect(correctIndex).toBeLessThan(4);
}

function tallyHomeworkPositions(questions: HomeworkQuestion[]) {
  const tally = [0, 0, 0, 0];
  for (const question of questions) {
    if (question.type === 'mcq') tally[question.correctIndex] += 1;
    if (question.type === 'paired_mcq') {
      tally[question.transliterationCorrectIndex] += 1;
      tally[question.meaningCorrectIndex] += 1;
    }
  }
  return tally;
}

function allPracticeQuestions(): PracticeQuestion[] {
  return [
    ...CLASS2_SYLLABIFICATION_GROUPS,
    ...CLASS2_NOUN_GROUPS,
    ...CLASS2_WORD_GROUPS,
  ].flatMap((group) => group.questions);
}

describe('Class 2 practice data', () => {
  it('has the planned mode counts and keeps vocabulary stages paired', () => {
    expect(CLASS2_SYLLABIFICATION_GROUPS).toHaveLength(20);
    expect(CLASS2_NOUN_GROUPS).toHaveLength(20);
    expect(CLASS2_WORD_GROUPS).toHaveLength(8);

    for (const group of CLASS2_WORD_GROUPS) {
      expect(group.questions).toHaveLength(2);
      expect(group.questions[0].category).toBe('noun-transliteration');
      expect(group.questions[1].category).toBe('noun-meaning');
    }
  });

  it('uses valid four-option MCQs with unique IDs', () => {
    const questions = allPracticeQuestions();
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    for (const question of questions) {
      validateOptions(question.options, question.correctIndex);
    }
  });

  it('does not explicitly assess Session 2 vowel names, classes, or sounds', () => {
    const prompts = allPracticeQuestions().map((question) => question.prompt).join(' ');
    expect(prompts).not.toMatch(/qamets|patach|tsere|segol|hireq|holem|qibbuts|shureq|vowel class|vowel name/i);
  });
});

describe('Homework 2 data', () => {
  const allQuestions: HomeworkQuestion[] = [
    ...hw2SyllabificationQuestions,
    ...hw2NounQuestions,
    ...hw2WordQuestions,
  ];

  it('contains 40 graded items and 48 visible MCQ stages', () => {
    expect(hw2SyllabificationQuestions).toHaveLength(16);
    expect(hw2NounQuestions).toHaveLength(16);
    expect(hw2WordQuestions).toHaveLength(8);
    expect(hw2Meta.totalQuestions).toBe(40);
    const visibleStages = hw2SyllabificationQuestions.length
      + hw2NounQuestions.length
      + hw2WordQuestions.length * 2;
    expect(visibleStages).toBe(48);
  });

  it('uses unique IDs, valid options, and perfectly balanced authored answer positions', () => {
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(allQuestions.length);
    for (const question of allQuestions) {
      if (question.type === 'mcq') validateOptions(question.options, question.correctIndex);
      if (question.type === 'paired_mcq') {
        validateOptions(question.transliterationOptions, question.transliterationCorrectIndex);
        validateOptions(question.meaningOptions, question.meaningCorrectIndex);
      }
    }
    expect(tallyHomeworkPositions(allQuestions)).toEqual([12, 12, 12, 12]);
  });

  it('contains only Sessions 3–4 topics and exposes only HW2 in the active registry', () => {
    const prompts = allQuestions
      .map((question) => 'question' in question ? question.question : '')
      .join(' ');
    expect(prompts).not.toMatch(/qamets|patach|tsere|segol|hireq|holem|qibbuts|shureq|vowel class|vowel name/i);
    expect(EXTENDED_HOMEWORK_ORDER).toEqual(['hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'hw8']);
    expect(Object.keys(EXTENDED_HOMEWORKS)).toEqual(['hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'hw8']);
    expect(LEGACY_EXTENDED_HOMEWORKS.hw3).toBeDefined();
  });

  it('deterministically randomizes order and options without losing the correct answer', () => {
    const source: HomeworkQuestion[] = [
      hw2SyllabificationQuestions[0],
      hw2NounQuestions[0],
      hw2WordQuestions[0],
    ];
    const first = prepareHomeworkQuestions(source, 12345, 1);
    const second = prepareHomeworkQuestions(source, 12345, 1);
    expect(first).toEqual(second);

    const originalMCQ = source.find((question): question is MCQQuestion => question.type === 'mcq')!;
    const preparedMCQ = first.find((question): question is MCQQuestion => question.id === originalMCQ.id)!;
    expect(preparedMCQ.options[preparedMCQ.correctIndex]).toBe(
      originalMCQ.options[originalMCQ.correctIndex],
    );

    const originalPair = source.find((question): question is PairedMCQQuestion => question.type === 'paired_mcq')!;
    const preparedPair = first.find((question): question is PairedMCQQuestion => question.id === originalPair.id)!;
    expect(preparedPair.transliterationOptions[preparedPair.transliterationCorrectIndex]).toBe(
      originalPair.transliterationOptions[originalPair.transliterationCorrectIndex],
    );
    expect(preparedPair.meaningOptions[preparedPair.meaningCorrectIndex]).toBe(
      originalPair.meaningOptions[originalPair.meaningCorrectIndex],
    );
  });
});
