import {
  CLASS11_CH30_CONTEXT_GROUPS,
  CLASS11_CH31_CONTEXT_GROUPS,
  CLASS11_CH31_GROUPS,
  CLASS11_CH31_MEMORY_GROUPS,
  CLASS11_CH32_CONTEXT_GROUPS,
  CLASS11_CH32_WEAK_ROOT_CONTEXT_IDS,
  CLASS11_CH33_CONTEXT_GROUPS,
  CLASS11_CH33_GROUPS,
  CLASS11_CH33_MEMORY_GROUPS,
  CLASS11_VERSE_GROUPS,
  CLASS11_WORD_GROUPS,
} from '@/data/class11-mcq';
import {
  CLASS12_CH34_CONTEXT_GROUPS,
  CLASS12_CH34_GROUPS,
  CLASS12_CH34_MEMORY_GROUPS,
  CLASS12_CH35_CONTEXT_GROUPS,
  CLASS12_CH35_GROUPS,
  CLASS12_CH35_MEMORY_GROUPS,
  CLASS12_VERSE_GROUPS,
  CLASS12_WORD_GROUPS,
} from '@/data/class12-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

// Week 11 is the last lesson week: everything after Class 10. Class 10 already
// drilled the STRONG Piel (Ch 30) and STRONG Pual (Ch 32), so this class takes
// the weak Piel and Pual (Ch 31, 33) and the Hithpael (Ch 34-35), which ends the
// CourseGuide. Nothing a Class 10 student has already answered appears here.

const WEAK_ROOT_PUAL_PASSAGES = CLASS11_CH32_CONTEXT_GROUPS.filter((group) =>
  CLASS11_CH32_WEAK_ROOT_CONTEXT_IDS.has(group.id),
);

/** Ch 30 and strong Ch 32 passages — Class 10's, so not repeated here. */
const TAUGHT_IN_CLASS_10 = new Set(
  [...CLASS11_CH30_CONTEXT_GROUPS, ...CLASS11_CH32_CONTEXT_GROUPS]
    .map((group) => group.id)
    .filter((id) => !CLASS11_CH32_WEAK_ROOT_CONTEXT_IDS.has(id)),
);

const CH33_CONTEXT_GROUPS = [...CLASS11_CH33_CONTEXT_GROUPS, ...WEAK_ROOT_PUAL_PASSAGES];

export const CLASS11_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch31', label: 'Ch 31 · Piel (Weak)', groups: CLASS11_CH31_GROUPS, memoryGroups: CLASS11_CH31_MEMORY_GROUPS, contextGroups: CLASS11_CH31_CONTEXT_GROUPS },
    { id: 'ch33', label: 'Ch 33 · Pual (Weak)', groups: CLASS11_CH33_GROUPS, memoryGroups: CLASS11_CH33_MEMORY_GROUPS, contextGroups: CH33_CONTEXT_GROUPS },
    { id: 'ch34', label: 'Ch 34 · Hithpael (Strong)', groups: CLASS12_CH34_GROUPS, memoryGroups: CLASS12_CH34_MEMORY_GROUPS, contextGroups: CLASS12_CH34_CONTEXT_GROUPS },
    { id: 'ch35', label: 'Ch 35 · Hithpael (Weak)', groups: CLASS12_CH35_GROUPS, memoryGroups: CLASS12_CH35_MEMORY_GROUPS, contextGroups: CLASS12_CH35_CONTEXT_GROUPS },
  ],
  contextGroups: [
    ...CLASS11_CH31_CONTEXT_GROUPS,
    ...CH33_CONTEXT_GROUPS,
    ...CLASS12_CH34_CONTEXT_GROUPS,
    ...CLASS12_CH35_CONTEXT_GROUPS,
  ],
  verseGroups: [
    ...CLASS11_VERSE_GROUPS.filter((group) => !TAUGHT_IN_CLASS_10.has(group.id)),
    ...CLASS12_VERSE_GROUPS,
  ],
  wordGroups: [...CLASS11_WORD_GROUPS, ...CLASS12_WORD_GROUPS],
  chapterSample: 2,
  contextSample: 8,
  wordSample: 8,
};

export const CLASS11_MODES = buildClassModes(CLASS11_CONFIG);
export const buildClass11Session = makeClassSessionBuilder(CLASS11_CONFIG);
