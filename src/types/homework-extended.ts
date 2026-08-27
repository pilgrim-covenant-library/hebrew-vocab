// Extended homework types for HW2-HW8 + final exam.
// Uses a generic per-HW progress shape so adding a new HW = data only.

import type { HomeworkQuestion, QuestionAnswer } from './homework';

export type ExtendedHomeworkId =
  | 'hw2' | 'hw3' | 'hw4' | 'hw5' | 'hw6' | 'hw7' | 'hw8'
  | 'hw9' | 'hw10' | 'hw11' | 'hw12'
  | 'final-exam';

export type ExtendedSectionId = number;

export interface ExtendedSectionProgress {
  sectionId: ExtendedSectionId;
  status: 'not_started' | 'in_progress' | 'completed';
  currentIndex: number;
  answers: QuestionAnswer[];
  score: number;
  totalQuestions: number;
  startedAt?: number;
  completedAt?: number;
}

export interface ExtendedHomeworkProgress {
  id: ExtendedHomeworkId;
  status: 'not_started' | 'in_progress' | 'completed';
  sections: Record<ExtendedSectionId, ExtendedSectionProgress>;
  currentSection: ExtendedSectionId;
  startedAt?: number;
  completedAt?: number;
  totalScore: number;
  totalPossible: number;
  attemptSeed: number;
}

export interface ExtendedSectionMeta {
  id: ExtendedSectionId;
  title: string;
  description: string;
  questionCount: number;
}

export interface ExtendedHomeworkMeta {
  id: ExtendedHomeworkId;
  title: string;
  shortTitle: string;
  description: string;
  topics: string[];
  totalQuestions: number;
  sections: ExtendedSectionMeta[];
  sectionQuestions: Record<ExtendedSectionId, HomeworkQuestion[]>;
  passwordGated?: boolean;
}

export const createInitialExtendedSectionProgress = (
  sectionId: ExtendedSectionId,
  totalQuestions: number,
): ExtendedSectionProgress => ({
  sectionId,
  status: 'not_started',
  currentIndex: 0,
  answers: [],
  score: 0,
  totalQuestions,
});

export const createInitialExtendedHomeworkProgress = (
  meta: ExtendedHomeworkMeta,
): ExtendedHomeworkProgress => {
  const sections: Record<ExtendedSectionId, ExtendedSectionProgress> = {};
  let totalPossible = 0;
  for (const section of meta.sections) {
    sections[section.id] = createInitialExtendedSectionProgress(section.id, section.questionCount);
    totalPossible += section.questionCount;
  }
  return {
    id: meta.id,
    status: 'not_started',
    sections,
    currentSection: meta.sections[0]?.id ?? 1,
    totalScore: 0,
    totalPossible,
    attemptSeed: Math.floor(Math.random() * 0x7fffffff) || 1,
  };
};
