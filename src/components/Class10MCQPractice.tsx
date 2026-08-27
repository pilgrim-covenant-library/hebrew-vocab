'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass10Session, CLASS10_MODES } from '@/lib/class10Practice';

export function Class10MCQPractice() {
  return (
    <MCQPractice
      title="Class 10 MCQ"
      subtitle="Sessions 26–29: the Hiphil and Hophal stems"
      reviewTitle="Class 10 Practice"
      description="Read the causative Hiphil in strong and weak verbs (Chapters 26–27) and its passive counterpart the Hophal (Chapters 28–29), then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 10 Complete"
      backHref="/class-practice"
      modes={CLASS10_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all four chapters."
      buildSession={buildClass10Session}
    />
  );
}
