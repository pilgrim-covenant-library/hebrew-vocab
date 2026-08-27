'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass6Session, CLASS6_MODES } from '@/lib/class6Practice';

export function Class6MCQPractice() {
  return (
    <MCQPractice
      title="Class 6 MCQ"
      subtitle="Sessions 14–16: weak Perfects and the Qal Imperfect"
      reviewTitle="Class 6 Practice"
      description="Read the Chapter 14 Qal Perfect of weak verbs, the Chapter 15 Qal Imperfect of strong verbs, and the Chapter 16 Qal Imperfect of weak verbs, then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 6 Complete"
      backHref="/class-practice"
      modes={CLASS6_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass6Session}
    />
  );
}
