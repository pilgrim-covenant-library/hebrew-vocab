import {
  CLASS11_CH30_CONTEXT_GROUPS,
  CLASS11_CH30_GROUPS,
  CLASS11_CH30_MEMORY_GROUPS,
  CLASS11_CH31_CONTEXT_GROUPS,
  CLASS11_CH31_GROUPS,
  CLASS11_CH31_MEMORY_GROUPS,
  CLASS11_CH32_CONTEXT_GROUPS,
  CLASS11_CH32_GROUPS,
  CLASS11_CH32_MEMORY_GROUPS,
  CLASS11_CH33_CONTEXT_GROUPS,
  CLASS11_CH33_GROUPS,
  CLASS11_CH33_MEMORY_GROUPS,
  CLASS11_CONTEXT_GROUPS,
  CLASS11_VERSE_GROUPS,
  CLASS11_WORD_GROUPS,
} from '@/data/class11-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS11_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch30', label: 'Ch 30 · Piel (Strong)', groups: CLASS11_CH30_GROUPS, memoryGroups: CLASS11_CH30_MEMORY_GROUPS, contextGroups: CLASS11_CH30_CONTEXT_GROUPS },
    { id: 'ch31', label: 'Ch 31 · Piel (Weak)', groups: CLASS11_CH31_GROUPS, memoryGroups: CLASS11_CH31_MEMORY_GROUPS, contextGroups: CLASS11_CH31_CONTEXT_GROUPS },
    { id: 'ch32', label: 'Ch 32 · Pual (Strong)', groups: CLASS11_CH32_GROUPS, memoryGroups: CLASS11_CH32_MEMORY_GROUPS, contextGroups: CLASS11_CH32_CONTEXT_GROUPS },
    { id: 'ch33', label: 'Ch 33 · Pual (Weak)', groups: CLASS11_CH33_GROUPS, memoryGroups: CLASS11_CH33_MEMORY_GROUPS, contextGroups: CLASS11_CH33_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS11_CONTEXT_GROUPS,
  verseGroups: CLASS11_VERSE_GROUPS,
  wordGroups: CLASS11_WORD_GROUPS,
  chapterSample: 2,
  contextSample: 8,
  wordSample: 8,
};

export const CLASS11_MODES = buildClassModes(CLASS11_CONFIG);
export const buildClass11Session = makeClassSessionBuilder(CLASS11_CONFIG);
