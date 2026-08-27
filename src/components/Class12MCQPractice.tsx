'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass12Session, CLASS12_MODES } from '@/lib/class12Practice';

export function Class12MCQPractice() {
  return (
    <MCQPractice
      title="Class 12 MCQ"
      subtitle="Sessions 34–35: the Hithpael stem, and the end of the course"
      reviewTitle="Class 12 Practice"
      description="Read the reflexive Hithpael in strong verbs (Chapter 34) and weak verbs (Chapter 35), including the metathesis and assimilation its ת prefix undergoes, then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 12 Complete"
      backHref="/class-practice"
      modes={CLASS12_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across both chapters."
      buildSession={buildClass12Session}
    />
  );
}
