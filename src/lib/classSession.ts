import type {
  PracticeQuestion,
  PracticeQuestionGroup,
  PracticeSessionMode,
} from '@/types/class-practice';
import { shuffle } from '@/lib/utils';

/** One chapter of a class: its full bank, the recall subset, and its passages. */
export interface ClassChapter {
  id: string;
  label: string;
  groups: PracticeQuestionGroup[];
  memoryGroups: PracticeQuestionGroup[];
  contextGroups: PracticeQuestionGroup[];
}

/** Everything a class needs to advertise its modes and build a session. */
export interface ClassSessionConfig {
  chapters: ClassChapter[];
  contextGroups: PracticeQuestionGroup[];
  verseGroups: PracticeQuestionGroup[];
  wordGroups: PracticeQuestionGroup[];
  /** Core AND memory groups sampled per chapter in "All" mode. */
  chapterSample: number;
  /** Context groups sampled in "All" mode. */
  contextSample: number;
  /** Word groups (two screens each) sampled in "All" mode. */
  wordSample: number;
}

function flatten(groups: PracticeQuestionGroup[]): PracticeQuestion[] {
  return groups.flatMap((group) => group.questions);
}

function count(groups: PracticeQuestionGroup[]): number {
  return flatten(groups).length;
}

function without(
  groups: PracticeQuestionGroup[],
  excluded: PracticeQuestionGroup[],
): PracticeQuestionGroup[] {
  const excludedIds = new Set(excluded.map((group) => group.id));
  return groups.filter((group) => !excludedIds.has(group.id));
}

function chapterSession(chapter: ClassChapter): PracticeQuestionGroup[] {
  return [...chapter.groups, ...chapter.contextGroups];
}

function recallGroups(config: ClassSessionConfig): PracticeQuestionGroup[] {
  return [
    ...config.chapters.flatMap((chapter) => chapter.memoryGroups),
    ...config.contextGroups,
  ];
}

/** Total screens an "All" session produces, derived from the sampling plan. */
export function allModeCount(config: ClassSessionConfig): number {
  return (
    config.chapters.length * config.chapterSample * 2 +
    config.contextSample +
    config.wordSample * 2
  );
}

/** Mode list for the practice picker, with the exact screen count of each. */
export function buildClassModes(config: ClassSessionConfig): PracticeSessionMode[] {
  return [
    { id: 'all', label: 'All', count: allModeCount(config) },
    { id: 'recall', label: 'Recall + Passages', count: count(recallGroups(config)) },
    ...config.chapters.map((chapter) => ({
      id: chapter.id,
      label: chapter.label,
      count: count(chapterSession(chapter)),
    })),
    { id: 'verse', label: 'Passages', count: count(config.verseGroups) },
    { id: 'word', label: 'Words', count: count(config.wordGroups) },
  ];
}

/**
 * Session builder for a class. "All" samples core and memory questions
 * separately so every run mixes rule review with direct form recall, and word
 * groups stay intact so transliteration always precedes meaning.
 */
export function makeClassSessionBuilder(
  config: ClassSessionConfig,
): (mode: string) => PracticeQuestion[] {
  return (mode: string) => {
    if (mode === 'recall') return flatten(shuffle(recallGroups(config)));
    if (mode === 'verse') return flatten(shuffle(config.verseGroups));
    if (mode === 'word') return flatten(shuffle(config.wordGroups));

    const chapter = config.chapters.find((candidate) => candidate.id === mode);
    if (chapter) return flatten(shuffle(chapterSession(chapter)));

    const selected = [
      ...config.chapters.flatMap((current) => [
        ...shuffle(without(current.groups, current.memoryGroups)).slice(0, config.chapterSample),
        ...shuffle(current.memoryGroups).slice(0, config.chapterSample),
      ]),
      ...shuffle(config.contextGroups).slice(0, config.contextSample),
      ...shuffle(config.wordGroups).slice(0, config.wordSample),
    ];
    return flatten(shuffle(selected));
  };
}
