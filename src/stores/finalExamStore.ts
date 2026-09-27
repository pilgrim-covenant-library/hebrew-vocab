/**
 * Saved state for the Class 13 final exam (/grammar/review/final-exam).
 *
 * Every answer goes to localStorage as it is given, so a student can refresh,
 * crash or close the tab and resume the same questions in the same order; after
 * submitting they can reopen the results and review their answers. `emailedAt`
 * stays null until the instructor email is confirmed, so an unsent submission is
 * retried on the next visit.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const FINAL_EXAM_STORAGE_KEY = 'hebrew-class13-final-exam';

export type FinalExamSectionId = 1 | 2 | 3;

export interface PersistedQuestionRef {
  sectionId: FinalExamSectionId;
  type: 'mcq' | 'va';
  questionId: string;
}

interface FinalExamState {
  studentName: string;
  startedAt: number | null;
  submittedAt: number | null;
  emailedAt: number | null;
  timedOut: boolean;
  currentIndex: number;
  questionOrder: PersistedQuestionRef[];
  /** questionId → chosen option (-1 = "I don't know") */
  mcqAnswers: Record<string, number>;
  /** verseId → Hebrew word → chosen category */
  verseMatching: Record<string, Record<string, string>>;
  verseTranslations: Record<string, string>;

  setStudentName: (name: string) => void;
  startExam: (questionOrder: PersistedQuestionRef[]) => void;
  saveMcq: (questionId: string, optionIndex: number) => void;
  saveMatching: (verseId: string, hebrewWord: string, category: string) => void;
  saveTranslation: (verseId: string, text: string) => void;
  setCurrentIndex: (questionIndex: number) => void;
  submitExam: (timedOut: boolean) => void;
  markEmailed: () => void;
  reset: () => void;
}

const NO_ATTEMPT = {
  startedAt: null,
  submittedAt: null,
  emailedAt: null,
  timedOut: false,
  currentIndex: 0,
  questionOrder: [] as PersistedQuestionRef[],
  mcqAnswers: {} as Record<string, number>,
  verseMatching: {} as Record<string, Record<string, string>>,
  verseTranslations: {} as Record<string, string>,
};

export const useFinalExamStore = create<FinalExamState>()(
  persist(
    (set) => ({
      studentName: '',
      ...NO_ATTEMPT,

      setStudentName: (name) => set({ studentName: name }),
      startExam: (questionOrder) => set({ ...NO_ATTEMPT, questionOrder, startedAt: Date.now() }),
      saveMcq: (questionId, optionIndex) =>
        set((state) => ({ mcqAnswers: { ...state.mcqAnswers, [questionId]: optionIndex } })),
      saveMatching: (verseId, hebrewWord, category) =>
        set((state) => ({
          verseMatching: {
            ...state.verseMatching,
            [verseId]: { ...(state.verseMatching[verseId] || {}), [hebrewWord]: category },
          },
        })),
      saveTranslation: (verseId, text) =>
        set((state) => ({ verseTranslations: { ...state.verseTranslations, [verseId]: text } })),
      setCurrentIndex: (questionIndex) => set({ currentIndex: questionIndex }),
      submitExam: (timedOut) => set({ submittedAt: Date.now(), timedOut, emailedAt: null }),
      markEmailed: () => set({ emailedAt: Date.now() }),
      reset: () => set({ studentName: '', ...NO_ATTEMPT }),
    }),
    { name: FINAL_EXAM_STORAGE_KEY, version: 1 },
  ),
);
