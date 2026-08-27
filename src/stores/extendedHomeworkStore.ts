// Generic extended-homework store: handles HW2-HW8 + final exam in a single
// Record keyed by homework ID. Adding a new homework requires no store changes.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionAnswer } from '@/types/homework';
import type {
  ExtendedHomeworkId,
  ExtendedHomeworkProgress,
  ExtendedSectionId,
  ExtendedSectionProgress,
} from '@/types/homework-extended';
import { createInitialExtendedHomeworkProgress } from '@/types/homework-extended';
import { getHomework } from '@/data/homework/extended-registry';

function createHomeworkProgress(id: ExtendedHomeworkId): ExtendedHomeworkProgress {
  const meta = getHomework(id);
  if (!meta) throw new Error(`Homework ${id} is not active.`);
  return createInitialExtendedHomeworkProgress(meta);
}

interface ExtendedHomeworkState {
  homeworks: Partial<Record<ExtendedHomeworkId, ExtendedHomeworkProgress>>;

  // Actions
  ensureHomework: (id: ExtendedHomeworkId) => ExtendedHomeworkProgress;
  startHomework: (id: ExtendedHomeworkId) => void;
  startSection: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => void;
  submitAnswer: (
    id: ExtendedHomeworkId,
    sectionId: ExtendedSectionId,
    questionId: string,
    userAnswer: QuestionAnswer['userAnswer'],
    isCorrect: boolean,
  ) => void;
  nextQuestion: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => boolean;
  previousQuestion: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => boolean;
  completeSection: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => void;
  completeHomework: (id: ExtendedHomeworkId) => void;
  resetHomework: (id: ExtendedHomeworkId) => void;
  resetSection: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => void;

  // Getters
  getHomework: (id: ExtendedHomeworkId) => ExtendedHomeworkProgress | undefined;
  getSection: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId) => ExtendedSectionProgress | undefined;
  getOverallProgress: (id: ExtendedHomeworkId) => {
    answered: number;
    score: number;
    total: number;
    percentage: number;
    scorePercentage: number;
  };
  isHomeworkComplete: (id: ExtendedHomeworkId) => boolean;
  getAnswer: (id: ExtendedHomeworkId, sectionId: ExtendedSectionId, questionId: string) => QuestionAnswer | undefined;
}

const updateHomework = (
  state: ExtendedHomeworkState,
  id: ExtendedHomeworkId,
  updater: (hw: ExtendedHomeworkProgress) => ExtendedHomeworkProgress,
): Partial<ExtendedHomeworkState> => {
  const current = state.homeworks[id] ?? createHomeworkProgress(id);
  return {
    homeworks: {
      ...state.homeworks,
      [id]: updater(current),
    },
  };
};

export const useExtendedHomeworkStore = create<ExtendedHomeworkState>()(
  persist(
    (set, get) => ({
      homeworks: {},

      ensureHomework: (id) => {
        const existing = get().homeworks[id];
        if (existing) return existing;
        const fresh = createHomeworkProgress(id);
        set((state) => ({ homeworks: { ...state.homeworks, [id]: fresh } }));
        return fresh;
      },

      startHomework: (id) => {
        set((state) =>
          updateHomework(state, id, (hw) =>
            hw.status === 'not_started'
              ? { ...hw, status: 'in_progress', startedAt: Date.now() }
              : hw,
          ),
        );
      },

      startSection: (id, sectionId) => {
        set((state) =>
          updateHomework(state, id, (hw) => {
            const section = hw.sections[sectionId];
            if (!section) return hw;
            const updatedSection: ExtendedSectionProgress =
              section.status === 'not_started'
                ? { ...section, status: 'in_progress', startedAt: Date.now() }
                : section;
            return {
              ...hw,
              currentSection: sectionId,
              sections: { ...hw.sections, [sectionId]: updatedSection },
            };
          }),
        );
      },

      submitAnswer: (id, sectionId, questionId, userAnswer, isCorrect) => {
        set((state) =>
          updateHomework(state, id, (hw) => {
            const section = hw.sections[sectionId];
            if (!section) return hw;

            const existingIdx = section.answers.findIndex((a) => a.questionId === questionId);
            const answer: QuestionAnswer = { questionId, userAnswer, isCorrect, timestamp: Date.now() };

            let newAnswers: QuestionAnswer[];
            let scoreDiff = 0;
            if (existingIdx >= 0) {
              const old = section.answers[existingIdx];
              if (old.isCorrect && !isCorrect) scoreDiff = -1;
              else if (!old.isCorrect && isCorrect) scoreDiff = 1;
              newAnswers = [...section.answers];
              newAnswers[existingIdx] = answer;
            } else {
              newAnswers = [...section.answers, answer];
              if (isCorrect) scoreDiff = 1;
            }

            return {
              ...hw,
              totalScore: hw.totalScore + scoreDiff,
              sections: {
                ...hw.sections,
                [sectionId]: {
                  ...section,
                  answers: newAnswers,
                  score: section.score + scoreDiff,
                },
              },
            };
          }),
        );
      },

      nextQuestion: (id, sectionId) => {
        const hw = get().homeworks[id];
        if (!hw) return false;
        const section = hw.sections[sectionId];
        if (!section) return false;
        if (section.currentIndex + 1 >= section.totalQuestions) return false;
        set((state) =>
          updateHomework(state, id, (h) => ({
            ...h,
            sections: {
              ...h.sections,
              [sectionId]: { ...section, currentIndex: section.currentIndex + 1 },
            },
          })),
        );
        return true;
      },

      previousQuestion: (id, sectionId) => {
        const hw = get().homeworks[id];
        if (!hw) return false;
        const section = hw.sections[sectionId];
        if (!section || section.currentIndex <= 0) return false;
        set((state) =>
          updateHomework(state, id, (h) => ({
            ...h,
            sections: {
              ...h.sections,
              [sectionId]: { ...section, currentIndex: section.currentIndex - 1 },
            },
          })),
        );
        return true;
      },

      completeSection: (id, sectionId) => {
        set((state) =>
          updateHomework(state, id, (hw) => {
            const section = hw.sections[sectionId];
            if (!section) return hw;
            return {
              ...hw,
              sections: {
                ...hw.sections,
                [sectionId]: { ...section, status: 'completed', completedAt: Date.now() },
              },
            };
          }),
        );
      },

      completeHomework: (id) => {
        set((state) =>
          updateHomework(state, id, (hw) => ({
            ...hw,
            status: 'completed',
            completedAt: Date.now(),
          })),
        );
      },

      resetHomework: (id) => {
        set((state) => ({
          homeworks: { ...state.homeworks, [id]: createHomeworkProgress(id) },
        }));
      },

      resetSection: (id, sectionId) => {
        set((state) =>
          updateHomework(state, id, (hw) => {
            const section = hw.sections[sectionId];
            if (!section) return hw;
            const reset: ExtendedSectionProgress = {
              sectionId,
              status: 'not_started',
              currentIndex: 0,
              answers: [],
              score: 0,
              totalQuestions: section.totalQuestions,
            };
            const scoreDiff = -section.score;
            return {
              ...hw,
              totalScore: hw.totalScore + scoreDiff,
              sections: { ...hw.sections, [sectionId]: reset },
            };
          }),
        );
      },

      getHomework: (id) => get().homeworks[id],
      getSection: (id, sectionId) => get().homeworks[id]?.sections[sectionId],
      getOverallProgress: (id) => {
        const hw = get().homeworks[id];
        if (!hw) {
          return { answered: 0, score: 0, total: 0, percentage: 0, scorePercentage: 0 };
        }
        const answered = Object.values(hw.sections).reduce(
          (total, section) => total + section.answers.length,
          0,
        );
        const total = hw.totalPossible;
        return {
          answered,
          score: hw.totalScore,
          total,
          percentage: total === 0 ? 0 : Math.round((answered / total) * 100),
          scorePercentage: total === 0 ? 0 : Math.round((hw.totalScore / total) * 100),
        };
      },
      isHomeworkComplete: (id) => {
        const hw = get().homeworks[id];
        if (!hw) return false;
        return Object.values(hw.sections).every((s) => s.status === 'completed');
      },
      getAnswer: (id, sectionId, questionId) => {
        const section = get().homeworks[id]?.sections[sectionId];
        return section?.answers.find((a) => a.questionId === questionId);
      },
    }),
    {
      name: 'hebrew-extended-homework-storage',
      version: 2,
      migrate: (persistedState, version) => {
        const state = persistedState as ExtendedHomeworkState;
        if (version >= 2) return state;

        const homeworks = { ...(state?.homeworks ?? {}) };
        // HW2 previously represented unrelated article/preposition material.
        // Reset only that assignment while retaining any legacy local results.
        delete homeworks.hw2;

        for (const [id, homework] of Object.entries(homeworks)) {
          if (!homework) continue;
          homeworks[id as ExtendedHomeworkId] = {
            ...homework,
            attemptSeed:
              homework.attemptSeed ?? (Math.floor(Math.random() * 0x7fffffff) || 1),
          };
        }

        return { ...state, homeworks };
      },
      partialize: (state) => ({ homeworks: state.homeworks }),
    },
  ),
);
