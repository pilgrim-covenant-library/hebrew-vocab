'use client';

import { MCQPractice } from '@/components/MCQPractice';
import {
  CLASS1_LETTER_QUESTIONS,
  CLASS1_COMMON_OT_WORD_QUESTIONS,
  CLASS1_MCQ_QUESTIONS,
  type Class1MCQQuestion,
} from '@/data/class1-mcq';
import type { PracticeQuestion, PracticeSessionMode } from '@/types/class-practice';
import { shuffle } from '@/lib/utils';

const MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: CLASS1_MCQ_QUESTIONS.length },
  { id: 'letter', label: 'Letters', count: CLASS1_LETTER_QUESTIONS.length },
  { id: 'word', label: 'Words', count: CLASS1_COMMON_OT_WORD_QUESTIONS.length },
];

function toPracticeQuestion(question: Class1MCQQuestion): PracticeQuestion {
  return {
    id: question.id,
    prompt: question.prompt,
    hebrew: question.hebrew,
    transliteration: question.transliteration,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    category: question.category,
  };
}

function buildSession(mode: string): PracticeQuestion[] {
  if (mode === 'letter') return shuffle(CLASS1_LETTER_QUESTIONS).map(toPracticeQuestion);
  if (mode === 'word') return shuffle(CLASS1_COMMON_OT_WORD_QUESTIONS).map(toPracticeQuestion);
  return [
    ...shuffle(CLASS1_LETTER_QUESTIONS).map(toPracticeQuestion),
    ...shuffle(CLASS1_COMMON_OT_WORD_QUESTIONS).map(toPracticeQuestion),
  ];
}

export function Class1MCQPractice() {
  return (
    <MCQPractice
      title="Class 1 MCQ"
      subtitle="Letters and common OT words"
      reviewTitle="Class 1 Review"
      description="Identify Hebrew letters and read common Old Testament words."
      completionTitle="Class 1 Complete"
      backHref="/class-practice"
      modes={MODES}
      allModeNote="All mode gives randomized letter questions first, then randomized word questions."
      buildSession={buildSession}
    />
  );
}
