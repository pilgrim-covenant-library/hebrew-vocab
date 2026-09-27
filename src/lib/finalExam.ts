import { shuffle } from '@/lib/utils';
import { scoreTranslation } from '@/lib/translation';
import type { NTVerse, TranslationResult } from '@/types';
import {
  class13ExamGrammarQuestions as grammarQuestions,
  class13ExamVocabQuestions as vocabQuestions,
  class13ExamVerseAnalysisQuestions as verseAnalysisQuestions,
  type PracticeMCQ,
  type PracticeVerseAnalysis,
} from '@/data/review/class13FinalExam';
import type { PersistedQuestionRef } from '@/stores/finalExamStore';

export const FINAL_EXAM_ACCESS_CODE = 'shalom';
export const EXAM_TITLE = 'Grammar Review Final Exam';
export const EXAM_DURATION_MS = 2 * 60 * 60 * 1000;

/** True when the typed code opens the final exam (case and spacing ignored). */
export function isFinalExamAccessCode(input: string): boolean {
  return input.trim().toLowerCase() === FINAL_EXAM_ACCESS_CODE;
}

export type ExamQuestion =
  | { type: 'mcq'; sectionId: 1 | 2; data: PracticeMCQ }
  | { type: 'va'; sectionId: 3; data: PracticeVerseAnalysis };

/** A fresh attempt: grammar and vocabulary shuffled within their sections, verses in order. */
export function createQuestionOrder(): PersistedQuestionRef[] {
  return [
    ...shuffle([...grammarQuestions]).map((q) => ({ sectionId: 1 as const, type: 'mcq' as const, questionId: q.id })),
    ...shuffle([...vocabQuestions]).map((q) => ({ sectionId: 2 as const, type: 'mcq' as const, questionId: q.id })),
    ...verseAnalysisQuestions.map((q) => ({ sectionId: 3 as const, type: 'va' as const, questionId: q.id })),
  ];
}

/** The questions of a saved attempt, in its saved order; ids no longer in the exam are dropped. */
export function buildQuestions(order: PersistedQuestionRef[]): ExamQuestion[] {
  const grammarById = new Map(grammarQuestions.map((q) => [q.id, q]));
  const vocabById = new Map(vocabQuestions.map((q) => [q.id, q]));
  const verseById = new Map(verseAnalysisQuestions.map((q) => [q.id, q]));
  return order.flatMap((ref): ExamQuestion[] => {
    if (ref.type === 'va') {
      const q = verseById.get(ref.questionId);
      return q ? [{ type: 'va', sectionId: 3, data: q }] : [];
    }
    const q = (ref.sectionId === 1 ? grammarById : vocabById).get(ref.questionId);
    return q ? [{ type: 'mcq', sectionId: ref.sectionId === 1 ? 1 : 2, data: q }] : [];
  });
}

/** Adapt a verse item to the shape the translation scorer expects. */
export function buildVerse(verse: PracticeVerseAnalysis): NTVerse {
  return {
    id: verse.id,
    book: verse.reference.toLowerCase().split(' ')[0],
    chapter: 1,
    verse: 0,
    reference: verse.reference,
    hebrew: verse.hebrew,
    transliteration: verse.transliteration,
    referenceTranslation: verse.referenceTranslation,
    keyTerms: verse.keyTerms,
    difficulty: 1,
  };
}

export const GRADE_BANDS = [
  { min: 90, label: 'A', color: 'text-emerald-600 dark:text-emerald-400', desc: 'Excellent mastery' },
  { min: 80, label: 'B', color: 'text-blue-600 dark:text-blue-400', desc: 'Strong performance' },
  { min: 70, label: 'C', color: 'text-blue-500 dark:text-blue-400', desc: 'Solid understanding' },
  { min: 60, label: 'D', color: 'text-amber-600 dark:text-amber-400', desc: 'Needs more review' },
  { min: 0, label: 'F', color: 'text-red-600 dark:text-red-400', desc: 'Rework the material' },
];

export function getGrade(pct: number) {
  return GRADE_BANDS.find((grade) => pct >= grade.min) ?? GRADE_BANDS[GRADE_BANDS.length - 1];
}

export function formatScore(score: number) {
  return Number.isInteger(score) ? `${score}` : score.toFixed(1);
}

export interface MCQAnswerDetail {
  questionId: string;
  question: string;
  options: string[];
  correctIndex: number;
  studentAnswer: number;
  isCorrect: boolean;
}

export interface MCQSectionAnswers {
  sectionId: number;
  questions: MCQAnswerDetail[];
}

export interface TranslationAnswer {
  questionId: string;
  reference: string;
  hebrew: string;
  referenceTranslation: string;
  studentTranslation: string;
  matchingPairs?: {
    hebrew: string;
    correctCategory: string;
    studentCategory: string;
  }[];
}

export interface ExamSummary {
  grammarCorrect: number;
  vocabCorrect: number;
  grammarTotal: number;
  vocabTotal: number;
  verseAnalysisScore: number;
  verseAnalysisTotal: number;
  totalScore: number;
  totalPossible: number;
  percentage: number;
  grade: ReturnType<typeof getGrade>;
  mcqAnswers: MCQSectionAnswers[];
  translationAnswers: TranslationAnswer[];
  verseBreakdown: {
    questionId: string;
    reference: string;
    matchingCorrect: number;
    matchingTotal: number;
    matchingPoints: number;
    translationResult: TranslationResult;
    translationPoints: number;
    totalPoints: number;
  }[];
}

export function computeSummary(
  questions: ExamQuestion[],
  mcqAnswers: Record<string, number | undefined>,
  verseMatching: Record<string, Record<string, string>>,
  verseTranslations: Record<string, string>,
): ExamSummary {
  const grammarQuestionsInExam = questions.filter((item) => item.type === 'mcq' && item.sectionId === 1) as Array<{
    type: 'mcq';
    sectionId: 1 | 2;
    data: PracticeMCQ;
  }>;
  const vocabQuestionsInExam = questions.filter((item) => item.type === 'mcq' && item.sectionId === 2) as Array<{
    type: 'mcq';
    sectionId: 1 | 2;
    data: PracticeMCQ;
  }>;
  const verseQuestionsInExam = questions.filter((item) => item.type === 'va') as Array<{
    type: 'va';
    sectionId: 3;
    data: PracticeVerseAnalysis;
  }>;

  const scoreMcq = (q: PracticeMCQ): MCQAnswerDetail => {
    const studentAnswer = mcqAnswers[q.id] ?? -1;
    const isCorrect = studentAnswer === q.correctIndex;
    return {
      questionId: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      studentAnswer,
      isCorrect,
    };
  };

  const grammarAnswerDetails: MCQAnswerDetail[] = grammarQuestionsInExam.map(
    (item) => scoreMcq(item.data),
  );
  const vocabAnswerDetails: MCQAnswerDetail[] = vocabQuestionsInExam.map(
    (item) => scoreMcq(item.data),
  );

  const verseBreakdown = verseQuestionsInExam.map((item) => {
    const q = item.data;
    const matching = verseMatching[q.id] || {};
    let matchingCorrect = 0;
    const matchingPairs = q.matchingPairs.map((pair) => {
      const studentCategory = matching[pair.hebrew] || '';
      if (studentCategory === pair.category) matchingCorrect++;
      return {
        hebrew: pair.hebrew,
        correctCategory: pair.category,
        studentCategory,
      };
    });

    const matchingPoints = (matchingCorrect / q.matchingPairs.length) * 2;
    const translationText = verseTranslations[q.id] || '';
    const translationResult = scoreTranslation(buildVerse(q), translationText);
    const translationPoints = (translationResult.score / 10) * 2;
    const totalPoints = matchingPoints + translationPoints;

    return {
      questionId: q.id,
      reference: q.reference,
      matchingCorrect,
      matchingTotal: q.matchingPairs.length,
      matchingPoints,
      translationResult,
      translationPoints,
      totalPoints,
      matchingPairs,
      studentTranslation: translationText,
    };
  });

  const grammarCorrect = grammarAnswerDetails.filter((q) => q.isCorrect).length;
  const vocabCorrect = vocabAnswerDetails.filter((q) => q.isCorrect).length;
  const verseAnalysisScore = Math.round(
    verseBreakdown.reduce((sum, item) => sum + item.totalPoints, 0) * 10,
  ) / 10;
  const totalScore = Math.round((grammarCorrect + vocabCorrect + verseAnalysisScore) * 10) / 10;
  const totalPossible = 100;
  const percentage = Math.round((totalScore / totalPossible) * 100);
  const grade = getGrade(percentage);

  const mcqAnswersPayload: MCQSectionAnswers[] = [
    {
      sectionId: 1,
      questions: grammarAnswerDetails,
    },
    {
      sectionId: 2,
      questions: vocabAnswerDetails,
    },
  ];

  const translationAnswers: TranslationAnswer[] = verseQuestionsInExam.map((item) => {
    const q = item.data;
    const matching = verseMatching[q.id] || {};
    return {
      questionId: q.id,
      reference: q.reference,
      hebrew: q.hebrew,
      referenceTranslation: q.referenceTranslation,
      studentTranslation: verseTranslations[q.id] || '',
      matchingPairs: q.matchingPairs.map((pair) => ({
        hebrew: pair.hebrew,
        correctCategory: pair.category,
        studentCategory: matching[pair.hebrew] || '',
      })),
    };
  });

  return {
    grammarCorrect,
    vocabCorrect,
    grammarTotal: grammarQuestions.length,
    vocabTotal: vocabQuestions.length,
    verseAnalysisScore,
    verseAnalysisTotal: 20,
    totalScore,
    totalPossible,
    percentage,
    grade,
    mcqAnswers: mcqAnswersPayload,
    translationAnswers,
    verseBreakdown,
  };
}
