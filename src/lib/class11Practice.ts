import { CLASS11_WORD_GROUPS } from '@/data/class11-mcq';
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

// Week 11 is the last lesson week: the Hithpael (Ch 34-35), which ends the
// CourseGuide. Class 10 already drilled the strong Piel (Ch 30) and strong Pual
// (Ch 32); the weak Piel and Pual (Ch 31, 33) are not taught. The Chapter 30-33
// vocabulary stays — a chapter's word list is not its weak verbs.
export const CLASS11_CONFIG: ClassSessionConfig = {
  chapters: [
    { id: 'ch34', label: 'Ch 34 · Hithpael (Strong)', groups: CLASS12_CH34_GROUPS, memoryGroups: CLASS12_CH34_MEMORY_GROUPS, contextGroups: CLASS12_CH34_CONTEXT_GROUPS },
    { id: 'ch35', label: 'Ch 35 · Hithpael (Weak)', groups: CLASS12_CH35_GROUPS, memoryGroups: CLASS12_CH35_MEMORY_GROUPS, contextGroups: CLASS12_CH35_CONTEXT_GROUPS },
  ],
  contextGroups: CLASS12_CONTEXT_GROUPS,
  verseGroups: CLASS12_VERSE_GROUPS,
  wordGroups: [...CLASS11_WORD_GROUPS, ...CLASS12_WORD_GROUPS],
  chapterSample: 4,
  contextSample: 8,
  wordSample: 8,
};

export const CLASS11_MODES = buildClassModes(CLASS11_CONFIG);
export const buildClass11Session = makeClassSessionBuilder(CLASS11_CONFIG);
