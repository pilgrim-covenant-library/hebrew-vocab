import vocabularyData from '@/data/vocabulary.json';
import type { VocabularyWord } from '@/types';

/**
 * Number of words to include in the "Common OT Vocab" challenge.
 * These are the 300 most frequently occurring words in the Hebrew Old Testament.
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
  1:  { title: 'Most Common (1–30)',          description: 'The object marker, the divine name, and the core particles, prepositions and verbs of being, saying and doing' },
  2:  { title: 'Very Common (31–60)',         description: 'Verbs of perception and motion — hear, speak, sit, go out, return — with the independent pronouns' },
  3:  { title: 'Very Common (61–90)',         description: 'Body and kinship words, the interrogatives, and the first place names: Jerusalem, Egypt' },
  4:  { title: 'Common (91–120)',             description: 'Adjectives of size and worth, the numbers, and vocabulary of court, army and judgment' },
  5:  { title: 'Common (121–150)',            description: 'Sanctuary and sacrifice: altar, fire, tent, silver and gold, with the verbs of building and blessing' },
  6:  { title: 'Frequent (151–180)',          description: 'Covenant, prophet, priesthood and sin — the theological core, plus Israel’s neighbours' },
  7:  { title: 'Frequent (181–210)',          description: 'Wilderness, flesh and heart; ḥesed, peace and iniquity; the verbs remember, write and seek' },
  8:  { title: 'Moderately Common (211–240)', description: 'Law, inheritance and glory, with the verbs of rescue, judgment and gathering' },
  9:  { title: 'Moderately Common (241–270)', description: 'Household and scroll, kinship and oath, and the verbs of worship: swear, bow down, be holy' },
  10: { title: 'Building Breadth (271–300)',  description: 'Righteousness, wisdom and death; the last verbs of praise, flight and pursuit to round out the 300' },
};
// Module-level cache to avoid re-sorting on every call
let cachedCommonVocab: VocabularyWord[] | null = null;

/**
 * Get the top 300 most frequently occurring words in the Old Testament,
 * sorted by frequency (highest first).
 */
/**
 * Strong's entries kept out of a top-300 *Hebrew* list: two Biblical Aramaic
 * words (מֶלֶךְ H4430, דִּי H1768), and ילך H3212, which is the same verb as
 * הלך H1980 — their counts are combined under H1980 so it is drilled once.
 */
const EXCLUDED_IDS = new Set(['H4430', 'H1768', 'H3212']);

export function getCommonOTVocab(): VocabularyWord[] {
  if (!cachedCommonVocab) {
    const words = vocabularyData.words as VocabularyWord[];
    cachedCommonVocab = [...words]
      .filter((w) => !EXCLUDED_IDS.has(w.id))
      .filter((w) => typeof w.frequency === 'number' && w.frequency > 0)
      .sort((a, b) => b.frequency - a.frequency)
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
