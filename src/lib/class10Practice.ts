import {
  CLASS10_CH26_CONTEXT_GROUPS,
  CLASS10_CH26_GROUPS,
  CLASS10_CH26_MEMORY_GROUPS,
  CLASS10_CH27_CONTEXT_GROUPS,
  CLASS10_CH27_GROUPS,
  CLASS10_CH27_MEMORY_GROUPS,
  CLASS10_CH28_CONTEXT_GROUPS,
  CLASS10_CH28_GROUPS,
  CLASS10_CH28_MEMORY_GROUPS,
  CLASS10_CH29_CONTEXT_GROUPS,
  CLASS10_CH29_GROUPS,
  CLASS10_CH29_MEMORY_GROUPS,
  CLASS10_CONTEXT_GROUPS,
  CLASS10_VERSE_GROUPS,
  CLASS10_WORD_GROUPS,
} from '@/data/class10-mcq';
import {
  CLASS11_CH30_CONTEXT_GROUPS,
  CLASS11_CH30_GROUPS,
  CLASS11_CH30_MEMORY_GROUPS,
  CLASS11_CH32_CONTEXT_GROUPS,
  CLASS11_CH32_GROUPS,
  CLASS11_CH32_MEMORY_GROUPS,
} from '@/data/class11-mcq';
import type { PracticeQuestionGroup } from '@/types/class-practice';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

// Class 10 also drills the STRONG Piel (Ch 30) and STRONG Pual (Ch 32). The
// weak chapters (31, 33) stay out, and so do the two Pual passages that turn on
// a weak root: כָּלָה is III-ה and זָרָה is hollow, both Ch 33 material.
const WEAK_ROOT_PASSAGE_IDS = new Set([
  'class11-context-ch32-gen2-1',
  'class11-context-ch32-isa1-6',
]);

const CH32_STRONG_CONTEXT_GROUPS = CLASS11_CH32_CONTEXT_GROUPS.filter(
  (group) => !WEAK_ROOT_PASSAGE_IDS.has(group.id),
);

// Trimmed for length: each chapter keeps five core questions. The dropped ones
// restate a point another item already makes, or are already drilled by that
// chapter's recall (memory) groups — e.g. ch28's Perfect/Imperfect/Participle
// questions duplicate class10-memory-ch28-*.
const DROPPED_CORE_IDS = new Set([
  'class10-ch26-2', 'class10-ch26-4', 'class10-ch26-7',
  'class10-ch27-3', 'class10-ch27-5', 'class10-ch27-7',
  'class10-ch28-5', 'class10-ch28-6', 'class10-ch28-8',
  'class10-ch29-3', 'class10-ch29-7', 'class10-ch29-8',
  'class11-ch30-2', 'class11-ch30-4', 'class11-ch30-5',
  'class11-ch32-3', 'class11-ch32-4', 'class11-ch32-5',
]);

/** Drop the trimmed core questions, keeping every recall group intact. */
function trim(groups: PracticeQuestionGroup[]): PracticeQuestionGroup[] {
  return groups.filter((group) => !DROPPED_CORE_IDS.has(group.id));
}

const PIEL_PUAL_CONTEXT_GROUPS = [
  ...CLASS11_CH30_CONTEXT_GROUPS,
  ...CH32_STRONG_CONTEXT_GROUPS,
];

export const CLASS10_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch26', label: 'Ch 26 · Hiphil (Strong)', groups: trim(CLASS10_CH26_GROUPS), memoryGroups: CLASS10_CH26_MEMORY_GROUPS, contextGroups: CLASS10_CH26_CONTEXT_GROUPS },
    { id: 'ch27', label: 'Ch 27 · Hiphil (Weak)', groups: trim(CLASS10_CH27_GROUPS), memoryGroups: CLASS10_CH27_MEMORY_GROUPS, contextGroups: CLASS10_CH27_CONTEXT_GROUPS },
    { id: 'ch28', label: 'Ch 28 · Hophal (Strong)', groups: trim(CLASS10_CH28_GROUPS), memoryGroups: CLASS10_CH28_MEMORY_GROUPS, contextGroups: CLASS10_CH28_CONTEXT_GROUPS },
    { id: 'ch29', label: 'Ch 29 · Hophal (Weak)', groups: trim(CLASS10_CH29_GROUPS), memoryGroups: CLASS10_CH29_MEMORY_GROUPS, contextGroups: CLASS10_CH29_CONTEXT_GROUPS },
    { id: 'ch30', label: 'Ch 30 · Piel (Strong)', groups: trim(CLASS11_CH30_GROUPS), memoryGroups: CLASS11_CH30_MEMORY_GROUPS, contextGroups: CLASS11_CH30_CONTEXT_GROUPS },
    { id: 'ch32', label: 'Ch 32 · Pual (Strong)', groups: trim(CLASS11_CH32_GROUPS), memoryGroups: CLASS11_CH32_MEMORY_GROUPS, contextGroups: CH32_STRONG_CONTEXT_GROUPS },
  ],
  contextGroups: [...CLASS10_CONTEXT_GROUPS, ...PIEL_PUAL_CONTEXT_GROUPS],
  verseGroups: [...CLASS10_VERSE_GROUPS, ...PIEL_PUAL_CONTEXT_GROUPS],
  wordGroups: CLASS10_WORD_GROUPS,
  chapterSample: 2,
  contextSample: 6,
  wordSample: 5,
};

export const CLASS10_MODES = buildClassModes(CLASS10_CONFIG);
export const buildClass10Session = makeClassSessionBuilder(CLASS10_CONFIG);
