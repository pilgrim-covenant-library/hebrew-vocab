import { shuffle } from '@/lib/utils';
import type { QuizQuestion, VocabularyWord } from '@/types';

/** A gloss's first sense, for telling whether two options say the same thing. */
export function leadingSense(gloss: string): string {
  return gloss.toLowerCase().split(/[,;]/)[0].trim();
}

/** A four-option meaning question for one word, distractors drawn from its tier. */
export function generateQuizQuestion(
  word: VocabularyWord,
  allWords: VocabularyWord[]
): QuizQuestion {
  if (!word || !word.gloss || !Array.isArray(allWords) || allWords.length === 0) {
    return {
      word: word || ({ id: '', hebrew: '', transliteration: '', gloss: 'Unknown', definition: '', partOfSpeech: 'noun', frequency: 0, tier: 1, strongs: '' } as VocabularyWord),
      options: [word?.gloss || 'Unknown', 'Option A', 'Option B', 'Option C'],
      correctIndex: 0,
    };
  }

  const allGlosses = new Set(allWords.map((w) => w.gloss));
  allGlosses.delete(word.gloss);

  const answerSense = leadingSense(word.gloss);
  // Never offer a homograph's gloss (אֵת is both the object marker and "with"),
  // nor a synonym's (שָׁלַךְ and יָרָה both open "To throw"): either would make a
  // second option defensible for the word on screen.
  const isFairDistractor = (w: VocabularyWord) =>
    w.id !== word.id &&
    w.gloss !== word.gloss &&
    w.hebrew !== word.hebrew &&
    leadingSense(w.gloss) !== answerSense;

  const sameOrAdjacentTier = allWords.filter(
    (w) => Math.abs(w.tier - word.tier) <= 1 && isFairDistractor(w)
  );

  const usedGlosses = new Set<string>();
  const distractors: string[] = [];

  const shuffledSameTier = shuffle([...sameOrAdjacentTier]);
  for (const w of shuffledSameTier) {
    if (!usedGlosses.has(w.gloss) && distractors.length < 3) {
      usedGlosses.add(w.gloss);
      distractors.push(w.gloss);
    }
  }

  if (distractors.length < 3) {
    const otherWords = allWords.filter((w) => isFairDistractor(w) && !usedGlosses.has(w.gloss));
    const shuffledOther = shuffle([...otherWords]);
    for (const w of shuffledOther) {
      if (!usedGlosses.has(w.gloss) && distractors.length < 3) {
        usedGlosses.add(w.gloss);
        distractors.push(w.gloss);
      }
    }
  }

  const fallbackOptions = ['(unknown)', '(not listed)', '(other meaning)'];
  let fallbackIndex = 0;
  while (distractors.length < 3 && fallbackIndex < fallbackOptions.length) {
    const fallback = fallbackOptions[fallbackIndex];
    if (!usedGlosses.has(fallback)) {
      distractors.push(fallback);
    }
    fallbackIndex++;
  }

  const options = shuffle([word.gloss, ...distractors]);
  const correctIndex = options.indexOf(word.gloss);

  return {
    word,
    options,
    correctIndex,
  };
}
