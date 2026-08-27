import {
  CLASS8_CH20_CONTEXT_GROUPS,
  CLASS8_CH20_GROUPS,
  CLASS8_CH20_MEMORY_GROUPS,
  CLASS8_CH21_CONTEXT_GROUPS,
  CLASS8_CH21_GROUPS,
  CLASS8_CH21_MEMORY_GROUPS,
  CLASS8_CH22_CONTEXT_GROUPS,
  CLASS8_CH22_GROUPS,
  CLASS8_CH22_MEMORY_GROUPS,
  CLASS8_CONTEXT_GROUPS,
  CLASS8_VERSE_GROUPS,
  CLASS8_WORD_GROUPS,
} from '@/data/class8-mcq';
import {
  buildClassModes,
  makeClassSessionBuilder,
  type ClassSessionConfig,
} from '@/lib/classSession';

export const CLASS8_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch20', label: 'Ch 20 · Infinitive Construct', groups: CLASS8_CH20_GROUPS, memoryGroups: CLASS8_CH20_MEMORY_GROUPS, contextGroups: CLASS8_CH20_CONTEXT_GROUPS },
    { id: 'ch21', label: 'Ch 21 · Infinitive Absolute', groups: CLASS8_CH21_GROUPS, memoryGroups: CLASS8_CH21_MEMORY_GROUPS, contextGroups: CLASS8_CH21_CONTEXT_GROUPS },
    { id: 'ch22', label: 'Ch 22 · Participle', groups: CLASS8_CH22_GROUPS, memoryGroups: CLASS8_CH22_MEMORY_GROUPS, contextGroups: CLASS8_CH22_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS8_CONTEXT_GROUPS,
  verseGroups: CLASS8_VERSE_GROUPS,
  wordGroups: CLASS8_WORD_GROUPS,
  chapterSample: 3,
  contextSample: 8,
  wordSample: 7,
};

export const CLASS8_MODES = buildClassModes(CLASS8_CONFIG);
export const buildClass8Session = makeClassSessionBuilder(CLASS8_CONFIG);
