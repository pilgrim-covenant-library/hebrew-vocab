import {
  CLASS4_CH10_CONTEXT_GROUPS,
  CLASS4_CH8_CONTEXT_GROUPS,
  CLASS4_CH9_CONTEXT_GROUPS,
  CLASS4_CONSTRUCT_GROUPS,
  CLASS4_CONSTRUCT_MEMORY_GROUPS,
  CLASS4_CONTEXT_GROUPS,
  CLASS4_PRONOUN_GROUPS,
  CLASS4_PRONOUN_MEMORY_GROUPS,
  CLASS4_SUFFIX_GROUPS,
  CLASS4_SUFFIX_MEMORY_GROUPS,
  CLASS4_VERSE_GROUPS,
  CLASS4_WORD_GROUPS,
} from '@/data/class4-mcq';
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

const PRONOUN_CORE_GROUPS = withoutGroups(
  CLASS4_PRONOUN_GROUPS,
  CLASS4_PRONOUN_MEMORY_GROUPS,
);
const SUFFIX_CORE_GROUPS = withoutGroups(
  CLASS4_SUFFIX_GROUPS,
  CLASS4_SUFFIX_MEMORY_GROUPS,
);
const CONSTRUCT_CORE_GROUPS = withoutGroups(
  CLASS4_CONSTRUCT_GROUPS,
  CLASS4_CONSTRUCT_MEMORY_GROUPS,
);

const PRONOUN_SESSION_GROUPS = [
  ...CLASS4_PRONOUN_GROUPS,
  ...CLASS4_CH8_CONTEXT_GROUPS,
];
const SUFFIX_SESSION_GROUPS = [
  ...CLASS4_SUFFIX_GROUPS,
  ...CLASS4_CH9_CONTEXT_GROUPS,
];
const CONSTRUCT_SESSION_GROUPS = [
  ...CLASS4_CONSTRUCT_GROUPS,
  ...CLASS4_CH10_CONTEXT_GROUPS,
];
const RECALL_TRANSLATION_GROUPS = [
  ...CLASS4_PRONOUN_MEMORY_GROUPS,
  ...CLASS4_SUFFIX_MEMORY_GROUPS,
  ...CLASS4_CONSTRUCT_MEMORY_GROUPS,
  ...CLASS4_CONTEXT_GROUPS,
];

export const CLASS4_MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: 40 },
  {
    id: 'recall',
    label: 'Recall + Passages',
    count: countQuestions(RECALL_TRANSLATION_GROUPS),
  },
  { id: 'pronoun', label: 'Pronouns', count: countQuestions(PRONOUN_SESSION_GROUPS) },
  { id: 'suffix', label: 'Suffixes', count: countQuestions(SUFFIX_SESSION_GROUPS) },
  { id: 'construct', label: 'Construct', count: countQuestions(CONSTRUCT_SESSION_GROUPS) },
  { id: 'verse', label: 'Passages', count: countQuestions(CLASS4_VERSE_GROUPS) },
  { id: 'word', label: 'Words', count: countQuestions(CLASS4_WORD_GROUPS) },
];

export function buildClass4Session(mode: string): PracticeQuestion[] {
  if (mode === 'recall') return flattenGroups(shuffle(RECALL_TRANSLATION_GROUPS));
  if (mode === 'pronoun') return flattenGroups(shuffle(PRONOUN_SESSION_GROUPS));
  if (mode === 'suffix') return flattenGroups(shuffle(SUFFIX_SESSION_GROUPS));
  if (mode === 'construct') return flattenGroups(shuffle(CONSTRUCT_SESSION_GROUPS));
  if (mode === 'verse') return flattenGroups(shuffle(CLASS4_VERSE_GROUPS));
  if (mode === 'word') return flattenGroups(shuffle(CLASS4_WORD_GROUPS));

  // Keep "All" at exactly 40 screens. Core and memory questions are sampled
  // separately so every run includes both rule review and direct form recall.
  // Word groups remain intact, keeping transliteration immediately before meaning.
  const selectedGroups = [
    ...shuffle(PRONOUN_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS4_PRONOUN_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(SUFFIX_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS4_SUFFIX_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(CONSTRUCT_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS4_CONSTRUCT_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(CLASS4_CONTEXT_GROUPS).slice(0, 8),
    ...shuffle(CLASS4_WORD_GROUPS).slice(0, 7),
  ];
  return flattenGroups(shuffle(selectedGroups));
}
