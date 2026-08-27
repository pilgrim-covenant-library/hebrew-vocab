'use client';

import { MCQPractice } from '@/components/MCQPractice';
import {
  CLASS3_ADJECTIVE_GROUPS,
  CLASS3_ARTICLE_WAW_GROUPS,
  CLASS3_PREPOSITION_GROUPS,
  CLASS3_REVIEW_GROUPS,
  CLASS3_VERSE_GROUPS,
  CLASS3_WORD_GROUPS,
} from '@/data/class3-mcq';
import type {
  PracticeQuestion,
  PracticeQuestionGroup,
  PracticeSessionMode,
} from '@/types/class-practice';
import { shuffle } from '@/lib/utils';

const MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: 40 },
  { id: 'article', label: 'Article & Waw', count: 4 },
  { id: 'preposition', label: 'Prepositions', count: 10 },
  { id: 'adjective', label: 'Adjectives', count: 11 },
  { id: 'verse', label: 'Verses', count: 6 },
  { id: 'word', label: 'Words', count: 40 },
  { id: 'review', label: 'Ch 1–4 Review', count: 25 },
];

function flattenGroups(groups: PracticeQuestionGroup[]): PracticeQuestion[] {
  return groups.flatMap((group) => group.questions);
}

function buildSession(mode: string): PracticeQuestion[] {
  if (mode === 'article') return flattenGroups(shuffle(CLASS3_ARTICLE_WAW_GROUPS));
  if (mode === 'preposition') return flattenGroups(shuffle(CLASS3_PREPOSITION_GROUPS));
  if (mode === 'adjective') return flattenGroups(shuffle(CLASS3_ADJECTIVE_GROUPS));
  if (mode === 'verse') return flattenGroups(shuffle(CLASS3_VERSE_GROUPS));
  if (mode === 'word') return flattenGroups(shuffle(CLASS3_WORD_GROUPS));
  if (mode === 'review') return flattenGroups(shuffle(CLASS3_REVIEW_GROUPS));

  const selectedGroups = [
    ...shuffle(CLASS3_ARTICLE_WAW_GROUPS).slice(0, 10),
    ...shuffle(CLASS3_PREPOSITION_GROUPS).slice(0, 10),
    ...shuffle(CLASS3_ADJECTIVE_GROUPS).slice(0, 10),
    ...shuffle(CLASS3_VERSE_GROUPS).slice(0, 6),
    ...shuffle(CLASS3_WORD_GROUPS).slice(0, 5),
  ];
  return flattenGroups(shuffle(selectedGroups));
}

export function Class3MCQPractice() {
  return (
    <MCQPractice
      title="Class 3 MCQ"
      subtitle="Sessions 5–7: Article, prepositions, and adjectives"
      reviewTitle="Class 3 Practice"
      description="Practice the definite article and conjunction waw, prefix prepositions to nouns, translate adjective phrases, and read the Chapter 5–7 vocabulary. The review mode drills Chapter 1–4 vocabulary missed by earlier exercises."
      completionTitle="Class 3 Complete"
      backHref="/class-practice"
      modes={MODES}
      allModeNote="All mode gives a balanced 40-question session across the article, prepositions, adjectives, and vocabulary. Each word’s transliteration question stays immediately before its meaning question."
      buildSession={buildSession}
    />
  );
}
