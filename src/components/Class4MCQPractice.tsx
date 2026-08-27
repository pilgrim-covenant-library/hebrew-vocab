'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass4Session, CLASS4_MODES } from '@/lib/class4Practice';

export function Class4MCQPractice() {
  return (
    <MCQPractice
      title="Class 4 MCQ"
      subtitle="Sessions 8–10: Pronouns, pronominal suffixes, and the construct chain"
      reviewTitle="Class 4 Practice"
      description="Memorize and translate the Chapter 8 pronouns, Chapter 9 suffix paradigms, and Chapter 10 construct chains, then recognize them inside real clauses and longer passage excerpts. Each chapter mode now includes four contextual translations."
      completionTitle="Class 4 Complete"
      backHref="/class-practice"
      modes={CLASS4_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass4Session}
    />
  );
}
