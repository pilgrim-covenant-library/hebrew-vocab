import vocabularyData from '@/data/vocabulary.json';
import { isCourseworkWord } from '@/lib/coursework';
import { familyKey } from '@/lib/hebrewStem';
import type { VocabularyWord } from '@/types';

/**
 * Number of words to include in the "Common OT Vocab" challenge.
 *
 * These are the 300 most frequently occurring words in the Hebrew Old Testament
 * whose root family the coursework does not already drill. Homework is the
 * baseline and the practice paper comes next, so this list starts below both: no
 * word here, and no cognate of one, appears anywhere a student has already been.
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
// Each description names only words its section holds — commonVocabQuality.test
// checks every term against the section's glosses, because the membership moves
// whenever the coursework does and hand-written captions silently went stale.
export const COMMON_VOCAB_SECTION_META: Record<CommonVocabSectionId, { title: string; description: string }> = {
  1:  { title: 'Most Common (1–30)',          description: 'City, water and blood; heart and mouth; Moses, Joshua and Joseph; Jerusalem, Babylon and the Jordan' },
  2:  { title: 'Very Common (31–60)',         description: 'Throne, statute and assembly; chariot, river and bull; set out, pursue and capture; Samuel, Zion and Gilead' },
  3:  { title: 'Very Common (61–90)',         description: 'Atonement, redeem and comfort; weep, forget and falsehood; small, width and length; Absalom, Jeroboam and Ahab' },
  4:  { title: 'Common (91–120)',             description: 'Door, wall and vineyard; cherub, offering and slaughter; iron, horn and bow; rule, sell and reject' },
  5:  { title: 'Common (121–150)',            description: 'Heal, flee and stumble; hill, valley and bird; burden, portion and fool; Hebron, Beersheba, Gad and Reuben' },
  6:  { title: 'Frequent (151–180)',          description: 'Dream, feast and drink offering; shield, rope and rock; vow, ransom and praise; Balaam, Elisha and Nebuchadnezzar' },
  7:  { title: 'Frequent (181–210)',          description: 'Vine, honey and harvest; camel and measure; toil, anger and emptiness; Laban, Daniel and Naphtali' },
  8:  { title: 'Moderately Common (211–240)', description: 'Passover, guilt and the ephod; signet ring, chamber and shadow; sheep, dread and pride; Rachel, Ishmael and Rehoboam' },
  9:  { title: 'Moderately Common (241–270)', description: 'Garden, lyre and tablet; jealousy, understanding and scarlet; bind, gird and despise; Jonathan, Damascus and Issachar' },
  10: { title: 'Building Breadth (271–300)',  description: 'Lampstand, fig and purple; cave, grain and flock; mourn, tremble and refuse; Gideon, Sodom and Amalek' },
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
    const seenFamilies = new Set<string>();
    cachedCommonVocab = [...words]
      .filter((w) => !EXCLUDED_IDS.has(w.id))
      .filter((w) => typeof w.frequency === 'number' && w.frequency > 0)
      .filter((w) => !isCourseworkWord(w.hebrew))
      .sort((a, b) => b.frequency - a.frequency)
      // One entry per root family, which also means one per spelling: the drill
      // shows a word and asks for its meaning, so neither two entries spelled
      // alike (שִׁיר the noun and שִׁיר the verb) nor two cognates (חֹק and חֻקָּה)
      // may both appear — in a section or across the list. Most frequent wins.
      .filter((w) => {
        const family = familyKey(w.hebrew);
        if (seenFamilies.has(family)) return false;
        seenFamilies.add(family);
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
