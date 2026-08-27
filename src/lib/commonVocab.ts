// Common-vocabulary progression: top 300 most-frequent OT Hebrew words,
// organized into 10 sections of 30 for incremental mastery.

import vocabularyData from '@/data/vocabulary.json';

export interface CommonVocabWord {
  id: string;
  hebrew: string;
  transliteration: string;
  gloss: string;
  frequency: number;
  partOfSpeech?: string;
}

export interface CommonVocabSection {
  id: number;
  title: string;
  description: string;
  wordCount: number;
  startRank: number;
  endRank: number;
}

const TOTAL_WORDS = 300;
const WORDS_PER_SECTION = 30;
const TOTAL_SECTIONS = TOTAL_WORDS / WORDS_PER_SECTION;

interface RawWord {
  id: string;
  hebrew: string;
  transliteration: string;
  gloss: string;
  frequency?: number;
  partOfSpeech?: string;
}

const allWords = (vocabularyData as { words: RawWord[] }).words;

// Sort by frequency descending; take the top TOTAL_WORDS.
const topWords: CommonVocabWord[] = [...allWords]
  .filter((w) => typeof w.frequency === 'number' && w.frequency > 0)
  .sort((a, b) => (b.frequency ?? 0) - (a.frequency ?? 0))
  .slice(0, TOTAL_WORDS)
  .map((w) => ({
    id: w.id,
    hebrew: w.hebrew,
    transliteration: w.transliteration,
    gloss: w.gloss,
    frequency: w.frequency ?? 0,
    partOfSpeech: w.partOfSpeech,
  }));

export const COMMON_VOCAB_WORDS = topWords;

export const COMMON_VOCAB_SECTIONS: CommonVocabSection[] = Array.from(
  { length: TOTAL_SECTIONS },
  (_, i) => {
    const startRank = i * WORDS_PER_SECTION + 1;
    const endRank = (i + 1) * WORDS_PER_SECTION;
    const sectionWords = topWords.slice(i * WORDS_PER_SECTION, (i + 1) * WORDS_PER_SECTION);
    const minFreq = sectionWords[sectionWords.length - 1]?.frequency ?? 0;
    const maxFreq = sectionWords[0]?.frequency ?? 0;
    return {
      id: i + 1,
      title: `Top ${endRank} — Words ${startRank}–${endRank}`,
      description: `Frequency range: ${minFreq}–${maxFreq} occurrences in the OT`,
      wordCount: sectionWords.length,
      startRank,
      endRank,
    };
  },
);

export function getSectionWords(sectionId: number): CommonVocabWord[] {
  if (sectionId < 1 || sectionId > TOTAL_SECTIONS) return [];
  const start = (sectionId - 1) * WORDS_PER_SECTION;
  return topWords.slice(start, start + WORDS_PER_SECTION);
}

export function getCumulativeFrequencyCoverage(throughSection: number): number {
  // Approximate share of OT word occurrences covered by the top N most-frequent words.
  const includedWords = topWords.slice(0, throughSection * WORDS_PER_SECTION);
  const sumIncluded = includedWords.reduce((s, w) => s + w.frequency, 0);
  const sumAll = allWords.reduce((s, w) => s + (w.frequency ?? 0), 0);
  if (sumAll === 0) return 0;
  return Math.round((sumIncluded / sumAll) * 100);
}
