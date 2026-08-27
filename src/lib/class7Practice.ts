import {
  CLASS7_CH17_CONTEXT_GROUPS,
  CLASS7_CH17_GROUPS,
  CLASS7_CH17_MEMORY_GROUPS,
  CLASS7_CH18_CONTEXT_GROUPS,
  CLASS7_CH18_GROUPS,
  CLASS7_CH18_MEMORY_GROUPS,
  CLASS7_CH19_CONTEXT_GROUPS,
  CLASS7_CH19_GROUPS,
  CLASS7_CH19_MEMORY_GROUPS,
  CLASS7_CONTEXT_GROUPS,
  CLASS7_VERSE_GROUPS,
  CLASS7_WORD_GROUPS,
} from '@/data/class7-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS7_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch17', label: 'Ch 17 · Waw Consecutive', groups: CLASS7_CH17_GROUPS, memoryGroups: CLASS7_CH17_MEMORY_GROUPS, contextGroups: CLASS7_CH17_CONTEXT_GROUPS },
    { id: 'ch18', label: 'Ch 18 · Imperative', groups: CLASS7_CH18_GROUPS, memoryGroups: CLASS7_CH18_MEMORY_GROUPS, contextGroups: CLASS7_CH18_CONTEXT_GROUPS },
    { id: 'ch19', label: 'Ch 19 · Verb Suffixes', groups: CLASS7_CH19_GROUPS, memoryGroups: CLASS7_CH19_MEMORY_GROUPS, contextGroups: CLASS7_CH19_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS7_CONTEXT_GROUPS,
  verseGroups: CLASS7_VERSE_GROUPS,
  wordGroups: CLASS7_WORD_GROUPS,
  chapterSample: 3,
  contextSample: 8,
  wordSample: 7,
};

export const CLASS7_MODES = buildClassModes(CLASS7_CONFIG);
export const buildClass7Session = makeClassSessionBuilder(CLASS7_CONFIG);
