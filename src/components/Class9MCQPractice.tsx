'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass9Session, CLASS9_MODES } from '@/lib/class9Practice';

export function Class9MCQPractice() {
  return (
    <MCQPractice
      title="Class 9 MCQ"
      subtitle="Sessions 23–25: sentence syntax and the Niphal stem"
      reviewTitle="Class 9 Practice"
      description="Read Hebrew word order and verbless clauses from Chapter 23, then the Niphal stem in strong verbs (Chapter 24) and weak verbs (Chapter 25), and recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 9 Complete"
      backHref="/class-practice"
      modes={CLASS9_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass9Session}
    />
  );
}
