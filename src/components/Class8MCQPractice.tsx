'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass8Session, CLASS8_MODES } from '@/lib/class8Practice';

export function Class8MCQPractice() {
  return (
    <MCQPractice
      title="Class 8 MCQ"
      subtitle="Sessions 20–22: the two infinitives and the Qal Participle"
      reviewTitle="Class 8 Practice"
      description="Read the Chapter 20 Infinitive Construct that follows prepositions, the Chapter 21 Infinitive Absolute that intensifies a verb, and the Chapter 22 Qal Participle, then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 8 Complete"
      backHref="/class-practice"
      modes={CLASS8_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass8Session}
    />
  );
}
