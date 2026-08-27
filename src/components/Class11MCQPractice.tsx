'use client';

import { MCQPractice } from '@/components/MCQPractice';
import { buildClass11Session, CLASS11_MODES } from '@/lib/class11Practice';

export function Class11MCQPractice() {
  return (
    <MCQPractice
      title="Class 11 MCQ"
      subtitle="Sessions 30–33: the Piel and Pual stems"
      reviewTitle="Class 11 Practice"
      description="Read the intensive Piel in strong and weak verbs (Chapters 30–31) and its passive counterpart the Pual (Chapters 32–33), then recognize them inside real clauses. Each chapter mode also includes four contextual translations."
      completionTitle="Class 11 Complete"
      backHref="/class-practice"
      modes={CLASS11_MODES}
      allModeNote="All mode gives exactly 40 questions: concepts, direct form recall, contextual passages, and paired vocabulary. Use Recall + Passages for the complete memory-and-translation drill across all four chapters."
      buildSession={buildClass11Session}
    />
  );
}
