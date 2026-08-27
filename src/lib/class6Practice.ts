import {
  CLASS6_CH14_CONTEXT_GROUPS,
  CLASS6_CH15_CONTEXT_GROUPS,
  CLASS6_CH16_CONTEXT_GROUPS,
  CLASS6_CONTEXT_GROUPS,
  CLASS6_IMPERFECT_STRONG_GROUPS,
  CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS,
  CLASS6_IMPERFECT_WEAK_GROUPS,
  CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS,
  CLASS6_PERFECT_WEAK_GROUPS,
  CLASS6_PERFECT_WEAK_MEMORY_GROUPS,
  CLASS6_VERSE_GROUPS,
  CLASS6_WORD_GROUPS,
} from '@/data/class6-mcq';
import type {
  PracticeQuestion,
  PracticeQuestionGroup,
  PracticeSessionMode,
} from '@/types/class-practice';
import { shuffle } from '@/lib/utils';

function flattenGroups(groups: PracticeQuestionGroup[]): PracticeQuestion[] {
  return groups.flatMap((group) => group.questions);
}

function countQuestions(groups: PracticeQuestionGroup[]): number {
  return flattenGroups(groups).length;
}

function withoutGroups(
  groups: PracticeQuestionGroup[],
  excludedGroups: PracticeQuestionGroup[],
): PracticeQuestionGroup[] {
  const excludedIds = new Set(excludedGroups.map((group) => group.id));
  return groups.filter((group) => !excludedIds.has(group.id));
}

const PERFECT_CORE_GROUPS = withoutGroups(
  CLASS6_PERFECT_WEAK_GROUPS,
  CLASS6_PERFECT_WEAK_MEMORY_GROUPS,
);
const IMPERFECT_CORE_GROUPS = withoutGroups(
  CLASS6_IMPERFECT_STRONG_GROUPS,
  CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS,
);
const WEAK_CORE_GROUPS = withoutGroups(
  CLASS6_IMPERFECT_WEAK_GROUPS,
  CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS,
);

const PERFECT_SESSION_GROUPS = [
  ...CLASS6_PERFECT_WEAK_GROUPS,
  ...CLASS6_CH14_CONTEXT_GROUPS,
];
const IMPERFECT_SESSION_GROUPS = [
  ...CLASS6_IMPERFECT_STRONG_GROUPS,
  ...CLASS6_CH15_CONTEXT_GROUPS,
];
const WEAK_SESSION_GROUPS = [
  ...CLASS6_IMPERFECT_WEAK_GROUPS,
  ...CLASS6_CH16_CONTEXT_GROUPS,
];
const RECALL_TRANSLATION_GROUPS = [
  ...CLASS6_PERFECT_WEAK_MEMORY_GROUPS,
  ...CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS,
  ...CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS,
  ...CLASS6_CONTEXT_GROUPS,
];

export const CLASS6_MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: 40 },
  {
    id: 'recall',
    label: 'Recall + Passages',
    count: countQuestions(RECALL_TRANSLATION_GROUPS),
  },
  { id: 'perfect', label: 'Perfect (Weak)', count: countQuestions(PERFECT_SESSION_GROUPS) },
  { id: 'imperfect', label: 'Imperfect (Strong)', count: countQuestions(IMPERFECT_SESSION_GROUPS) },
  { id: 'weak', label: 'Imperfect (Weak)', count: countQuestions(WEAK_SESSION_GROUPS) },
  { id: 'verse', label: 'Passages', count: countQuestions(CLASS6_VERSE_GROUPS) },
  { id: 'word', label: 'Words', count: countQuestions(CLASS6_WORD_GROUPS) },
];

export function buildClass6Session(mode: string): PracticeQuestion[] {
  if (mode === 'recall') return flattenGroups(shuffle(RECALL_TRANSLATION_GROUPS));
  if (mode === 'perfect') return flattenGroups(shuffle(PERFECT_SESSION_GROUPS));
  if (mode === 'imperfect') return flattenGroups(shuffle(IMPERFECT_SESSION_GROUPS));
  if (mode === 'weak') return flattenGroups(shuffle(WEAK_SESSION_GROUPS));
  if (mode === 'verse') return flattenGroups(shuffle(CLASS6_VERSE_GROUPS));
  if (mode === 'word') return flattenGroups(shuffle(CLASS6_WORD_GROUPS));

  // Keep "All" at exactly 40 screens. Core and memory questions are sampled
  // separately so every run includes both rule review and direct form recall.
  // Word groups remain intact, keeping transliteration immediately before meaning.
  const selectedGroups = [
    ...shuffle(PERFECT_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS6_PERFECT_WEAK_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(IMPERFECT_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(WEAK_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(CLASS6_CONTEXT_GROUPS).slice(0, 8),
    ...shuffle(CLASS6_WORD_GROUPS).slice(0, 7),
  ];
  return flattenGroups(shuffle(selectedGroups));
}
