import vocabularyData from '@/data/vocabulary.json';
import { isCourseworkWord } from '@/lib/coursework';
import { familyKey } from '@/lib/hebrewStem';
import type { VocabularyWord } from '@/types';

/**
 * Number of words in the Vocab Challenge.
 *
 * The challenge tests what homework and the practice paper leave out: the 300
 * most frequent OT words whose root family no other bank drills, and no names.
 * That puts first the common words nothing else covers — so none goes untaught —
 * and fills the rest from below the practice paper's rarest word, which makes
 * the bulk of it harder than either bank. vocabChallenge.test.ts holds it to that.
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
  1:  { title: 'Level 1 (1–30)',     description: 'City, gate and camp; water, stone and blood; mouth, lip and wine; go down, turn aside and set out' },
  2:  { title: 'Level 2 (31–60)',    description: 'Statute, assembly and abomination; chariot, river and bull; atonement, redeem and forget; weep, run and capture' },
  3:  { title: 'Level 3 (61–90)',    description: 'Door, wall and vineyard; offering, shekel and lot; iron, horn and bow; rule, sell and reject' },
  4:  { title: 'Level 4 (91–120)',   description: 'Heal, flee and stumble; dream, drink offering and shield; hill, valley and cedar; fool, burden and reproach' },
  5:  { title: 'Level 5 (121–150)',  description: 'Vow, ransom and praise; vine, honey and harvest; feast, psalm and widow; rope, rock and camel' },
  6:  { title: 'Level 6 (151–180)',  description: 'Passover, ephod and signet ring; beauty, pride and discipline; dread, shadow and tomorrow; wander, strike and overtake' },
  7:  { title: 'Level 7 (181–210)',  description: 'Guilt, forgive and compassion; sheep, garden and scarlet; tablet, chamber and dwelling place; bind, gird and despise' },
  8:  { title: 'Level 8 (211–240)',  description: 'Lyre, lampstand and purple; fig, olive and grain; neck, rib and cave; mourn, tremble and refuse' },
  9:  { title: 'Level 9 (241–270)',  description: 'Rain, well and new wine; star, world and abyss; vision, wonder and shout; kneel, take refuge and oppress' },
  10: { title: 'Level 10 (271–300)', description: 'Dove, dog and calf; grass, root and hope; citadel, window and porch; avenge, refine and conceal' },
};
// Module-level cache to avoid re-sorting on every call
let cachedCommonVocab: VocabularyWord[] | null = null;

/**
 * Strong's entries kept out of a *Hebrew* list: Biblical Aramaic words — the
 * data carries no language field, so these are listed by hand as the list
 * reaches them (מֶלֶךְ H4430, דִּי H1768, פְּשַׁר H6591, חֲזָא H2370, and the Aramaic
 * spelling נְבוּכַדְנֶצַּר H5020) — and ילך H3212, the same verb as הלך H1980,
 * counted under H1980 so it is drilled once.
 */
export const EXCLUDED_IDS: ReadonlySet<string> = new Set(['H4430', 'H1768', 'H6591', 'H2370', 'H5020', 'H3212']);

/** Sheol, which Strong's defines by the capitalised "Hades", is not a name. */
const ORDINARY_WORDS_DEFINED_BY_A_NAME: ReadonlySet<string> = new Set(['H7585']);

/**
 * People, places, peoples and deities, which the challenge does not test. Strong's
 * starts a name's definition with the capitalised name ("Ester, the Jewish
 * heroine") or people ("a Kenaanite or inhabitant of Kenaan"), and an ordinary
 * word's in lower case ("iron (as cutting)") — except the pronoun "I".
 */
export function isProperName(word: VocabularyWord): boolean {
  if (ORDINARY_WORDS_DEFINED_BY_A_NAME.has(word.id)) return false;
  const definition = (word.definition ?? '').replace(/^\{/, '').trim();
  if (/^I\b/.test(definition)) return false;
  return /^[A-Z]/.test(definition) || /^an? [A-Z]/.test(definition);
}

/**
 * The Vocab Challenge: the 300 most frequent OT words, no names, whose root
 * family the coursework does not already drill, sorted by frequency (highest
 * first) — the common words nothing else covers, then harder and harder ones.
 */
export function getCommonOTVocab(): VocabularyWord[] {
  if (!cachedCommonVocab) {
    const words = vocabularyData.words as VocabularyWord[];
    const seenFamilies = new Set<string>();
    cachedCommonVocab = [...words]
      .filter((w) => !EXCLUDED_IDS.has(w.id))
      .filter((w) => typeof w.frequency === 'number' && w.frequency > 0)
      .filter((w) => !isProperName(w))
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
