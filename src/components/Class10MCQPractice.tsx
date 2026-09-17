'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass10Session, CLASS10_MODES } from '@/lib/class10Practice';

export function Class10MCQPractice() {
  return (
    <MCQPractice
      title="Class 10 MCQ"
      subtitle="Sessions 26–29 plus the strong Piel and Pual"
      reviewTitle="Class 10 Practice"
      description="Read the causative Hiphil in strong and weak verbs (Chapters 26–27) and its passive counterpart the Hophal (Chapters 28–29), then the strong Piel (Chapter 30) and its passive the strong Pual (Chapter 32), and recognize them inside real clauses. The weak Piel and Pual (Chapters 31 and 33) are not covered here."
      completionTitle="Class 10 Complete"
      backHref="/class-practice"
      modes={CLASS10_MODES}
      allModeNote="All mode gives exactly 48 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all six chapters."
      buildSession={buildClass10Session}
    />
  );
}
