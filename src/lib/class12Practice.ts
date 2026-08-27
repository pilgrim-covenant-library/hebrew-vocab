import {
  CLASS12_CH34_CONTEXT_GROUPS,
  CLASS12_CH34_GROUPS,
  CLASS12_CH34_MEMORY_GROUPS,
  CLASS12_CH35_CONTEXT_GROUPS,
  CLASS12_CH35_GROUPS,
  CLASS12_CH35_MEMORY_GROUPS,
  CLASS12_CONTEXT_GROUPS,
  CLASS12_VERSE_GROUPS,
  CLASS12_WORD_GROUPS,
} from '@/data/class12-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS12_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch34', label: 'Ch 34 · Hithpael (Strong)', groups: CLASS12_CH34_GROUPS, memoryGroups: CLASS12_CH34_MEMORY_GROUPS, contextGroups: CLASS12_CH34_CONTEXT_GROUPS },
    { id: 'ch35', label: 'Ch 35 · Hithpael (Weak)', groups: CLASS12_CH35_GROUPS, memoryGroups: CLASS12_CH35_MEMORY_GROUPS, contextGroups: CLASS12_CH35_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS12_CONTEXT_GROUPS,
  verseGroups: CLASS12_VERSE_GROUPS,
  wordGroups: CLASS12_WORD_GROUPS,
  chapterSample: 4,
  contextSample: 8,
  wordSample: 8,
};

export const CLASS12_MODES = buildClassModes(CLASS12_CONFIG);
export const buildClass12Session = makeClassSessionBuilder(CLASS12_CONFIG);
