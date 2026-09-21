import vocabularyData from '@/data/vocabulary.json';
import { isCourseworkWord } from '@/lib/coursework';
import type { VocabularyWord } from '@/types';

/**
 * Number of words to include in the "Common OT Vocab" challenge.
 *
 * These are the 300 most frequently occurring words in the Hebrew Old Testament
 * that the coursework does not already drill. Homework is the baseline and the
 * practice paper comes next, so this list starts below both: every word here is
 * new to a student who has worked through them.
 */
export const COMMON_VOCAB_COUNT = 300;

/** Number of words per section */
export const WORDS_PER_SECTION = 30;

/** Total number of sections */
export const SECTION_COUNT = COMMON_VOCAB_COUNT / WORDS_PER_SECTION; // 10

/** Valid section IDs (1-10) */
export type CommonVocabSectionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface CommonVocabSection {
  id: CommonVocabSectionId;
  title: string;
  description: string;
  wordCount: number;
  startRank: number;
  endRank: number;
}

/** Section metadata for the overview page */
export const COMMON_VOCAB_SECTION_META: Record<CommonVocabSectionId, { title: string; description: string }> = {
  1:  { title: 'Most Common (1–30)',          description: 'Year, name and water; the adverbs of place and time; the first numbers; Moses, Aaron and Jerusalem' },
  2:  { title: 'Very Common (31–60)',         description: 'Peoples and their kings — Philistine, Levite, Pharaoh, Babylon — with measures, boundaries and inheritance' },
  3:  { title: 'Very Common (61–90)',         description: 'Offering, ark and oil; the body in ear, lip and palm; gathering, asking and bowing down; Joseph and Benjamin' },
  4:  { title: 'Common (91–120)',             description: 'Righteousness and sacrifice, and the vocabulary of marching — flee, encamp, set out, pursue; Zion and Assyria' },
  5:  { title: 'Common (121–150)',            description: 'Tabernacle, throne and statute; sun, river and wadi; the siege words wall, chariot and capture; Samuel and Hezekiah' },
  6:  { title: 'Frequent (151–180)',          description: 'Worship and its abuse — incense, high place, abomination, falsehood — with prophesying, weeping and thanksgiving' },
  7:  { title: 'Frequent (181–210)',          description: 'Atonement, cleanness and unfaithfulness; length, width and quantity; the sojourner, the cherub and the vineyard' },
  8:  { title: 'Moderately Common (211–240)', description: 'Song, counsel and offering; door, cloud and shekel; Amorite, Chaldean and Jew; ruling, hiding and selling' },
  9:  { title: 'Moderately Common (241–270)', description: 'Sign, lot and guard duty; livestock, horn and bow; iron, cedar and spoil; reproach, sickness and withering' },
  10: { title: 'Building Breadth (271–300)',  description: 'Healing, favour and folly; hill, valley and cistern; Eleazar and Elijah, and the tribes of Gad, Reuben and Dan' },
};
// Module-level cache to avoid re-sorting on every call
let cachedCommonVocab: VocabularyWord[] | null = null;

/**
 * Strong's entries kept out of a top-300 *Hebrew* list: two Biblical Aramaic
 * words (מֶלֶךְ H4430, דִּי H1768), and ילך H3212, which is the same verb as
 * הלך H1980 — their counts are combined under H1980 so it is drilled once.
 */
const EXCLUDED_IDS = new Set(['H4430', 'H1768', 'H3212']);

/**
 * Get the 300 most frequently occurring Old Testament words that the coursework
 * does not already drill, sorted by frequency (highest first).
 *
 * Skipping the coursework words costs frequency: the list reaches further down
 * the frequency table than a raw top-300 would, and the words it picks up there
 * are exactly the ones a student never meets in the homeworks or the papers.
 */
export function getCommonOTVocab(): VocabularyWord[] {
  if (!cachedCommonVocab) {
    const words = vocabularyData.words as VocabularyWord[];
    const spellings = new Set<string>();
    cachedCommonVocab = [...words]
      .filter((w) => !EXCLUDED_IDS.has(w.id))
      .filter((w) => typeof w.frequency === 'number' && w.frequency > 0)
      .filter((w) => !isCourseworkWord(w.hebrew))
      .sort((a, b) => b.frequency - a.frequency)
      // One entry per pointed spelling: the drill shows a spelling and asks for
      // its meaning, so two entries spelled alike — שִׁיר the noun "song" and
      // שִׁיר the verb "to sing" — would be two questions a student cannot tell
      // apart. The more frequent sense wins.
      .filter((w) => {
        if (spellings.has(w.hebrew)) return false;
        spellings.add(w.hebrew);
        return true;
      })
      .slice(0, COMMON_VOCAB_COUNT);
  }
  return cachedCommonVocab;
}

/**
 * Get a Set of word IDs for the top 300 common OT vocabulary words.
 * Useful for efficient lookup when calculating progress.
 */
export function getCommonOTVocabIds(): Set<string> {
  return new Set(getCommonOTVocab().map((w) => w.id));
}

// Aliases for convenience & backwards compatibility
export const getCommonVocab = getCommonOTVocab;
export const getCommonVocabIds = getCommonOTVocabIds;
export const getCommonNTVocab = getCommonOTVocab;
export const getCommonNTVocabIds = getCommonOTVocabIds;

/**
 * Get the 30 words for a given section (1-10).
 * Section 1 = words ranked 1-30 (most frequent), Section 10 = words ranked 271-300.
 */
export function getCommonVocabSection(sectionId: CommonVocabSectionId | number): VocabularyWord[] {
  const allWords = getCommonOTVocab();
  const validId = Math.max(1, Math.min(SECTION_COUNT, typeof sectionId === 'number' ? sectionId : 1));
  const start = (validId - 1) * WORDS_PER_SECTION;
  return allWords.slice(start, start + WORDS_PER_SECTION);
}

/**
 * Get the total number of sections.
 */
export function getCommonVocabSectionCount(): number {
  return SECTION_COUNT;
}

/** Legacy array exports for backwards compatibility */
export const COMMON_VOCAB_WORDS = getCommonOTVocab();

export const COMMON_VOCAB_SECTIONS: CommonVocabSection[] = Array.from(
  { length: SECTION_COUNT },
  (_, i) => {
    const sectionId = (i + 1) as CommonVocabSectionId;
    const meta = COMMON_VOCAB_SECTION_META[sectionId];
    const startRank = i * WORDS_PER_SECTION + 1;
    const endRank = (i + 1) * WORDS_PER_SECTION;
    return {
      id: sectionId,
      title: meta.title,
      description: meta.description,
      wordCount: WORDS_PER_SECTION,
      startRank,
      endRank,
    };
  }
);

export function getSectionWords(sectionId: number): VocabularyWord[] {
  return getCommonVocabSection(sectionId);
}
