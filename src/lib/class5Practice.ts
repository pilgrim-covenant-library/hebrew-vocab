import {
  CLASS5_CH11_CONTEXT_GROUPS,
  CLASS5_CH12_CONTEXT_GROUPS,
  CLASS5_CH13_CONTEXT_GROUPS,
  CLASS5_CONTEXT_GROUPS,
  CLASS5_NUMBER_GROUPS,
  CLASS5_NUMBER_MEMORY_GROUPS,
  CLASS5_QAL_GROUPS,
  CLASS5_QAL_MEMORY_GROUPS,
  CLASS5_VERB_GROUPS,
  CLASS5_VERB_MEMORY_GROUPS,
  CLASS5_VERSE_GROUPS,
  CLASS5_WORD_GROUPS,
} from '@/data/class5-mcq';
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

const NUMBER_CORE_GROUPS = withoutGroups(
  CLASS5_NUMBER_GROUPS,
  CLASS5_NUMBER_MEMORY_GROUPS,
);
const VERB_CORE_GROUPS = withoutGroups(
  CLASS5_VERB_GROUPS,
  CLASS5_VERB_MEMORY_GROUPS,
);
const QAL_CORE_GROUPS = withoutGroups(
  CLASS5_QAL_GROUPS,
  CLASS5_QAL_MEMORY_GROUPS,
);

const NUMBER_SESSION_GROUPS = [
  ...CLASS5_NUMBER_GROUPS,
  ...CLASS5_CH11_CONTEXT_GROUPS,
];
const VERB_SESSION_GROUPS = [
  ...CLASS5_VERB_GROUPS,
  ...CLASS5_CH12_CONTEXT_GROUPS,
];
const QAL_SESSION_GROUPS = [
  ...CLASS5_QAL_GROUPS,
  ...CLASS5_CH13_CONTEXT_GROUPS,
];
const RECALL_TRANSLATION_GROUPS = [
  ...CLASS5_NUMBER_MEMORY_GROUPS,
  ...CLASS5_VERB_MEMORY_GROUPS,
  ...CLASS5_QAL_MEMORY_GROUPS,
  ...CLASS5_CONTEXT_GROUPS,
];

export const CLASS5_MODES: PracticeSessionMode[] = [
  { id: 'all', label: 'All', count: 40 },
  {
    id: 'recall',
    label: 'Recall + Passages',
    count: countQuestions(RECALL_TRANSLATION_GROUPS),
  },
  { id: 'number', label: 'Numbers', count: countQuestions(NUMBER_SESSION_GROUPS) },
  { id: 'verb', label: 'Verbs', count: countQuestions(VERB_SESSION_GROUPS) },
  { id: 'qal', label: 'Qal Perfect', count: countQuestions(QAL_SESSION_GROUPS) },
  { id: 'verse', label: 'Passages', count: countQuestions(CLASS5_VERSE_GROUPS) },
  { id: 'word', label: 'Words', count: countQuestions(CLASS5_WORD_GROUPS) },
];

export function buildClass5Session(mode: string): PracticeQuestion[] {
  if (mode === 'recall') return flattenGroups(shuffle(RECALL_TRANSLATION_GROUPS));
  if (mode === 'number') return flattenGroups(shuffle(NUMBER_SESSION_GROUPS));
  if (mode === 'verb') return flattenGroups(shuffle(VERB_SESSION_GROUPS));
  if (mode === 'qal') return flattenGroups(shuffle(QAL_SESSION_GROUPS));
  if (mode === 'verse') return flattenGroups(shuffle(CLASS5_VERSE_GROUPS));
  if (mode === 'word') return flattenGroups(shuffle(CLASS5_WORD_GROUPS));

  // Keep "All" at exactly 40 screens. Core and memory questions are sampled
  // separately so every run includes both rule review and direct form recall.
  // Word groups remain intact, keeping transliteration immediately before meaning.
  const selectedGroups = [
    ...shuffle(NUMBER_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS5_NUMBER_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(VERB_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS5_VERB_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(QAL_CORE_GROUPS).slice(0, 3),
    ...shuffle(CLASS5_QAL_MEMORY_GROUPS).slice(0, 3),
    ...shuffle(CLASS5_CONTEXT_GROUPS).slice(0, 8),
    ...shuffle(CLASS5_WORD_GROUPS).slice(0, 7),
  ];
  return flattenGroups(shuffle(selectedGroups));
}
