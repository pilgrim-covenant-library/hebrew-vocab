'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass7Session, CLASS7_MODES } from '@/lib/class7Practice';

export function Class7MCQPractice() {
  return (
    <MCQPractice
      title="Class 7 MCQ"
      subtitle="Sessions 17–19: the Waw Consecutive, Imperative, and verb suffixes"
      reviewTitle="Class 7 Practice"
      description="Read the Chapter 17 Waw Consecutive that drives Hebrew narrative, the Chapter 18 Qal Imperative, and the Chapter 19 pronominal suffixes that carry a verb's object, then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 7 Complete"
      backHref="/class-practice"
      modes={CLASS7_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass7Session}
    />
  );
}
