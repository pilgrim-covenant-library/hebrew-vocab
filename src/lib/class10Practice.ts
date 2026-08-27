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
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS10_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch26', label: 'Ch 26 · Hiphil (Strong)', groups: CLASS10_CH26_GROUPS, memoryGroups: CLASS10_CH26_MEMORY_GROUPS, contextGroups: CLASS10_CH26_CONTEXT_GROUPS },
    { id: 'ch27', label: 'Ch 27 · Hiphil (Weak)', groups: CLASS10_CH27_GROUPS, memoryGroups: CLASS10_CH27_MEMORY_GROUPS, contextGroups: CLASS10_CH27_CONTEXT_GROUPS },
    { id: 'ch28', label: 'Ch 28 · Hophal (Strong)', groups: CLASS10_CH28_GROUPS, memoryGroups: CLASS10_CH28_MEMORY_GROUPS, contextGroups: CLASS10_CH28_CONTEXT_GROUPS },
    { id: 'ch29', label: 'Ch 29 · Hophal (Weak)', groups: CLASS10_CH29_GROUPS, memoryGroups: CLASS10_CH29_MEMORY_GROUPS, contextGroups: CLASS10_CH29_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS10_CONTEXT_GROUPS,
  verseGroups: CLASS10_VERSE_GROUPS,
  wordGroups: CLASS10_WORD_GROUPS,
  chapterSample: 2,
  contextSample: 8,
  wordSample: 8,
};

export const CLASS10_MODES = buildClassModes(CLASS10_CONFIG);
export const buildClass10Session = makeClassSessionBuilder(CLASS10_CONFIG);
