'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass5Session, CLASS5_MODES } from '@/lib/class5Practice';

export function Class5MCQPractice() {
  return (
    <MCQPractice
      title="Class 5 MCQ"
      subtitle="Sessions 11–13: Hebrew numbers, the verb system, and the Qal Perfect"
      reviewTitle="Class 5 Practice"
      description="Master the Chapter 11 numbers, the Chapter 12 map of the Hebrew verb (roots, stems, and conjugations), and the Chapter 13 Qal Perfect of strong verbs, then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 5 Complete"
      backHref="/class-practice"
      modes={CLASS5_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all three chapters."
      buildSession={buildClass5Session}
    />
  );
}
