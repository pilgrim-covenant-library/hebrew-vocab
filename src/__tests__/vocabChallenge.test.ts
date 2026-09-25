// The Vocab Challenge tests what the other two banks leave out. First, every
// common word family (as frequent as anything the practice paper asks) that
// neither homework nor the paper covers — so no common word goes untaught. Then,
// to fill 300, only words rarer than every word the practice paper asks. It tests
// no names: people, places and peoples are too easy to guess.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import vocabularyData from '@/data/vocabulary.json';
import { class13VocabQuestions } from '@/data/review/class13PracticePaper';
import { COMMON_VOCAB_SECTION_META, EXCLUDED_IDS, getCommonOTVocab, isProperName } from '@/lib/commonVocab';
import { isCourseworkWord } from '@/lib/coursework';
import { consonants, familyKey } from '@/lib/hebrewStem';
import type { VocabularyWord } from '@/types';

const words = vocabularyData.words as VocabularyWord[];
const CANTILLATION = /[֑-ֽ֯׀׃]/g;
const byPointed = new Map<string, number>();
const byConsonants = new Map<string, number>();
for (const w of words) {
  if (!(w.frequency > 0)) continue;
  const pointed = w.hebrew.replace(CANTILLATION, '');
  byPointed.set(pointed, Math.max(byPointed.get(pointed) ?? 0, w.frequency));
  byConsonants.set(consonants(w.hebrew), Math.max(byConsonants.get(consonants(w.hebrew)) ?? 0, w.frequency));
}
const frequencyOf = (hebrew: string) =>
  byPointed.get(hebrew.replace(CANTILLATION, '')) ?? byConsonants.get(consonants(hebrew)) ?? 0;

const challenge = getCommonOTVocab();
const paperWords = class13VocabQuestions.flatMap((q) => (q.hebrew ?? '').split(' vs. ')).filter(Boolean);
const paperFrequencies = paperWords.map(frequencyOf).filter((f) => f > 0);
const rarestPaperWord = Math.min(...paperFrequencies);

/** Word families as common as the paper's rarest word that no other bank covers. */
const uncoveredCommonFamilies = new Set(
  words
    .filter((w) => w.frequency >= rarestPaperWord && !EXCLUDED_IDS.has(w.id) && !isProperName(w) && !isCourseworkWord(w.hebrew))
    .map((w) => familyKey(w.hebrew)),
);

describe('Vocab Challenge composition', () => {
  it('should find a frequency for every practice-paper vocabulary word', () => {
    expect(paperFrequencies).toHaveLength(paperWords.length);
  });

  it('should include every common word family that neither homework nor the paper covers', () => {
    const inChallenge = new Set(challenge.map((w) => familyKey(w.hebrew)));
    const missing = [...uncoveredCommonFamilies].filter((f) => !inChallenge.has(f));
    expect(missing).toEqual([]);
  });

  it('should fill the rest only with words rarer than every practice-paper word', () => {
    const common = challenge.filter((w) => w.frequency >= rarestPaperWord);
    expect(common).toHaveLength(uncoveredCommonFamilies.size);
    expect(challenge.length - common.length).toBeGreaterThan(150);
  });

  it('should test no names', () => {
    expect(challenge.filter(isProperName).map((w) => `${w.id} ${w.gloss}`)).toEqual([]);
  });

  it('should still hold 300 words', () => {
    expect(challenge).toHaveLength(300);
  });
});

describe('isProperName', () => {
  const byId = new Map(words.map((w) => [w.id, w]));
  // Esther, Gibeon, Canaanite, Jebusite, Gad, Nebuchadnezzar
  it.each(['H635', 'H1391', 'H3669', 'H2983', 'H1410', 'H5019'])('should treat %s as a name', (id) => {
    expect(isProperName(byId.get(id) as VocabularyWord)).toBe(true);
  });
  // iron, "I", Sheol, rain, Selah
  it.each(['H1270', 'H589', 'H7585', 'H4306', 'H5542'])('should treat %s as an ordinary word', (id) => {
    expect(isProperName(byId.get(id) as VocabularyWord)).toBe(false);
  });
});

describe('Vocab Challenge naming', () => {
  it('should not call itself common or most frequent anywhere a student reads', () => {
    const pages = ['src/app/page.tsx', 'src/app/learn/page.tsx', 'src/app/learn/common-vocab/page.tsx'];
    for (const page of pages) {
      const source = readFileSync(join(process.cwd(), page), 'utf8');
      expect(`${page}: ${source.match(/Common OT Vocab\w*|most (frequent|common)[^"<]*/)?.[0] ?? ''}`).toBe(`${page}: `);
      expect(source).toContain('Vocab Challenge');
    }
    for (const { title } of Object.values(COMMON_VOCAB_SECTION_META)) {
      expect(title).not.toMatch(/common|frequent/i);
    }
  });
});
