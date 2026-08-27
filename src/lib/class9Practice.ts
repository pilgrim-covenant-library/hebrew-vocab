import {
  CLASS9_CH23_CONTEXT_GROUPS,
  CLASS9_CH23_GROUPS,
  CLASS9_CH23_MEMORY_GROUPS,
  CLASS9_CH24_CONTEXT_GROUPS,
  CLASS9_CH24_GROUPS,
  CLASS9_CH24_MEMORY_GROUPS,
  CLASS9_CH25_CONTEXT_GROUPS,
  CLASS9_CH25_GROUPS,
  CLASS9_CH25_MEMORY_GROUPS,
  CLASS9_CONTEXT_GROUPS,
  CLASS9_VERSE_GROUPS,
  CLASS9_WORD_GROUPS,
} from '@/data/class9-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS9_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch23', label: 'Ch 23 · Sentence Syntax', groups: CLASS9_CH23_GROUPS, memoryGroups: CLASS9_CH23_MEMORY_GROUPS, contextGroups: CLASS9_CH23_CONTEXT_GROUPS },
    { id: 'ch24', label: 'Ch 24 · Niphal (Strong)', groups: CLASS9_CH24_GROUPS, memoryGroups: CLASS9_CH24_MEMORY_GROUPS, contextGroups: CLASS9_CH24_CONTEXT_GROUPS },
    { id: 'ch25', label: 'Ch 25 · Niphal (Weak)', groups: CLASS9_CH25_GROUPS, memoryGroups: CLASS9_CH25_MEMORY_GROUPS, contextGroups: CLASS9_CH25_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS9_CONTEXT_GROUPS,
  verseGroups: CLASS9_VERSE_GROUPS,
  wordGroups: CLASS9_WORD_GROUPS,
  chapterSample: 3,
  contextSample: 8,
  wordSample: 7,
};

export const CLASS9_MODES = buildClassModes(CLASS9_CONFIG);
export const buildClass9Session = makeClassSessionBuilder(CLASS9_CONFIG);
