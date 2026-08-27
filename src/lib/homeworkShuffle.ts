import type { HomeworkQuestion, MCQQuestion, PairedMCQQuestion } from '@/types/homework';

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const result = [...items];
  const random = createRandom(seed);
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function shuffleOptions(
  options: readonly string[],
  correctIndex: number,
  seed: number,
): { options: string[]; correctIndex: number } {
  const entries = options.map((option, index) => ({ option, isCorrect: index === correctIndex }));
  const shuffled = seededShuffle(entries, seed);
  return {
    options: shuffled.map((entry) => entry.option),
    correctIndex: shuffled.findIndex((entry) => entry.isCorrect),
  };
}

function prepareMCQ(question: MCQQuestion, attemptSeed: number): MCQQuestion {
  const prepared = shuffleOptions(
    question.options,
    question.correctIndex,
    attemptSeed ^ hashString(`${question.id}:options`),
  );
  return { ...question, ...prepared };
}

function preparePairedMCQ(
  question: PairedMCQQuestion,
  attemptSeed: number,
): PairedMCQQuestion {
  const transliteration = shuffleOptions(
    question.transliterationOptions,
    question.transliterationCorrectIndex,
    attemptSeed ^ hashString(`${question.id}:transliteration`),
  );
  const meaning = shuffleOptions(
    question.meaningOptions,
    question.meaningCorrectIndex,
    attemptSeed ^ hashString(`${question.id}:meaning`),
  );
  return {
    ...question,
    transliterationOptions: transliteration.options,
    transliterationCorrectIndex: transliteration.correctIndex,
    meaningOptions: meaning.options,
    meaningCorrectIndex: meaning.correctIndex,
  };
}

export function prepareHomeworkQuestions(
  questions: readonly HomeworkQuestion[],
  attemptSeed: number,
  sectionId: number,
): HomeworkQuestion[] {
  const ordered = seededShuffle(
    questions,
    attemptSeed ^ hashString(`section:${sectionId}`),
  );
  return ordered.map((question) => {
    if (question.type === 'mcq') return prepareMCQ(question, attemptSeed);
    if (question.type === 'paired_mcq') return preparePairedMCQ(question, attemptSeed);
    return question;
  });
}
