import { normalizeHebrew } from './hebrew';
import { COURSEWORK_WORDS } from '@/data/courseworkWords';

/**
 * Which Hebrew words the course has already put in front of the student.
 *
 * The three banks are meant to be disjoint: homework is the baseline, the
 * practice-paper vocabulary section may not reuse a homework word, and the
 * top-300 drill may not reuse a word from either. Membership is compared on the
 * consonantal skeleton, so pointing and maqqef do not hide a repeat — but an
 * inflected form (יִשְׁמֹר) does not match its lemma (שָׁמַר), because resolving one
 * to the other needs morphology this file deliberately does not do.
 */

/** A word's comparison key: consonants only, no pointing, no maqqef. */
export function courseworkWordKey(hebrew: string): string {
  return normalizeHebrew(hebrew ?? '')
    .replace(/[־-]/g, ' ')
    .replace(/[^א-ת ]/g, ' ')
    .trim();
}

/** Every Hebrew word in a string, as comparison keys. Single letters are ignored. */
export function hebrewWordKeys(text: unknown): string[] {
  if (typeof text !== 'string') return [];
  return courseworkWordKey(text)
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

/**
 * Fields a student actually reads before answering. Explanations are excluded:
 * they are shown after the answer and quote half the lexicon.
 */
const READ_BEFORE_ANSWERING = [
  'question',
  'hebrew',
  'options',
  'meaningOptions',
  'transliterationOptions',
  'keyTerms',
  'matchingPairs',
] as const;

/**
 * Walk anything a question module exports and collect the Hebrew a student sees
 * before answering. Shape-agnostic on purpose — the homework, class-practice and
 * review-paper banks all model their questions differently.
 */
export function collectCourseworkWords(root: unknown, into = new Set<string>()): Set<string> {
  const seen = new Set<unknown>();

  const walk = (node: unknown, harvest: boolean) => {
    if (node === null || typeof node === 'function') return;
    if (typeof node === 'string') {
      if (harvest) for (const key of hebrewWordKeys(node)) into.add(key);
      return;
    }
    if (typeof node !== 'object') return;
    if (seen.has(node)) return;
    seen.add(node);

    if (Array.isArray(node)) {
      for (const item of node) walk(item, harvest);
      return;
    }
    for (const [field, value] of Object.entries(node)) {
      walk(value, harvest || (READ_BEFORE_ANSWERING as readonly string[]).includes(field));
    }
  };

  walk(root, false);
  return into;
}

/** Lookup set for the generated list. */
export const COURSEWORK_WORD_KEYS: ReadonlySet<string> = new Set(COURSEWORK_WORDS);

/** True when this Hebrew word is already drilled somewhere in the course. */
export function isCourseworkWord(hebrew: string): boolean {
  return COURSEWORK_WORD_KEYS.has(courseworkWordKey(hebrew));
}
