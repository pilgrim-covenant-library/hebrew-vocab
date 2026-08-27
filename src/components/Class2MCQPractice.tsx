'use client';

import { MCQPractice } from '@/components/MCQPractice';
import {
  CLASS2_NOUN_GROUPS,
  CLASS2_SYLLABIFICATION_GROUPS,
  CLASS2_WORD_GROUPS,
} from '@/data/class2-mcq';
import type {
  PracticeQuestion,
  PracticeQuestionGroup,
  PracticeSessionMode,
} from '@/types/class-practice';
import { shuffle } from '@/lib/utils';

const MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: 36 },
  { id: 'syllable', label: 'Syllables', count: 20 },
  { id: 'noun', label: 'Nouns', count: 20 },
  { id: 'word', label: 'Words', count: 16 },
];

function flattenGroups(groups: PracticeQuestionGroup[]): PracticeQuestion[] {
  return groups.flatMap((group) => group.questions);
}

function buildSession(mode: string): PracticeQuestion[] {
  if (mode === 'syllable') return flattenGroups(shuffle(CLASS2_SYLLABIFICATION_GROUPS));
  if (mode === 'noun') return flattenGroups(shuffle(CLASS2_NOUN_GROUPS));
  if (mode === 'word') return flattenGroups(shuffle(CLASS2_WORD_GROUPS));

  const selectedGroups = [
    ...shuffle(CLASS2_SYLLABIFICATION_GROUPS).slice(0, 14),
    ...shuffle(CLASS2_NOUN_GROUPS).slice(0, 14),
    ...shuffle(CLASS2_WORD_GROUPS).slice(0, 4),
  ];
  return flattenGroups(shuffle(selectedGroups));
}

export function Class2MCQPractice() {
  return (
    <MCQPractice
      title="Class 2 MCQ"
      subtitle="Sessions 3–4: Syllabification and Hebrew nouns"
      reviewTitle="Class 2 Practice"
      description="Divide pointed Hebrew words into syllables, identify noun forms, then read each noun before choosing its meaning."
      completionTitle="Class 2 Complete"
      backHref="/class-practice"
      modes={MODES}
      allModeNote="All mode gives a balanced 36-question session. Each word’s transliteration question stays immediately before its meaning question."
      buildSession={buildSession}
    />
  );
}
