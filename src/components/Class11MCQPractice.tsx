'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass11Session, CLASS11_MODES } from '@/lib/class11Practice';

export function Class11MCQPractice() {
  return (
    <MCQPractice
      title="Class 11 MCQ"
      subtitle="Sessions 34–35: the Hithpael stem"
      reviewTitle="Class 11 Practice"
      description="The last lesson week: the reflexive Hithpael in strong and weak verbs (Chapters 34–35), including the metathesis and assimilation of its ת prefix, recognized inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 11 Complete"
      backHref="/class-practice"
      modes={CLASS11_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all four chapters."
      buildSession={buildClass11Session}
    />
  );
}
